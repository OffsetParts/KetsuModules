/**
 * Cleans and formats a URL for AsuraScans
 */
export function cleanUrl(url: string): string {
    return normalizeAssetUrl(url, 'https://asurascans.com');
}

/**
 * Normalizes protocol-relative and relative URLs
 */
export function normalizeAssetUrl(url: string, baseUrl: string = 'https://asurascans.com'): string {
    const trimmed = (url ?? '').trim();
    if (!trimmed) return '';

    if (/^https?:\/\//iu.test(trimmed)) {
        return trimmed;
    }

    if (trimmed.startsWith('//')) {
        return `https:${trimmed}`;
    }

    if (trimmed.startsWith('/')) {
        return `${baseUrl}${trimmed}`;
    }

    return `${baseUrl}/${trimmed.replace(/^\.?\//u, '')}`;
}

/**
 * Gets the first URL candidate from a srcset value
 */
export function pickSrcFromSrcset(srcset: string): string {
    const candidates = srcset
        .split(',')
        .map((part) => part.trim().split(/\s+/u)[0] ?? '')
        .filter((part) => part.length > 0);

    return candidates[0] ?? '';
}

/**
 * Cleans text by removing newlines and tabs
 */
export function cleanText(str: string): string {
    return str?.replace(/[\n\t]/g, '').trim() ?? '';
}

/**
 * Checks if a value is an object
 */
function isObject(value: any): boolean {
    return typeof value === 'object' && value !== null;
}

/**
 * Deep auto-parse JSON strings recursively
 */
function deepAutoParse(obj: any): any {
    if (typeof obj === "string") {
        try {
            const parsed = JSON.parse(obj);
            return deepAutoParse(parsed);
        } catch {
            return obj;
        }
    } else if (Array.isArray(obj)) {
        return obj.map(deepAutoParse);
    } else if (typeof obj === "object" && obj !== null) {
        return Object.fromEntries(
            Object.entries(obj).map(([k, v]) => [k, deepAutoParse(v)])
        );
    }
    return obj;
}

/**
 * Filters and extracts data from Next.js hydrated script tags
 */
export function scriptFilter(doc: HTMLElement, innerRegex: string): any {
    let refinedData: any = '';
    let outerFunctionRegex = /self\.__next_f\.push\(\[(\d+),\s*"(.*?)"\]\)/u;
    
    doc.querySelectorAll('script').forEach((element) => {
        let content = element.innerHTML;
        if (content.includes(innerRegex)) {
            let match = content.match(outerFunctionRegex);
            if (match) {
                refinedData = deepAutoParse(match[2]
                    .replace(/[a-zA-Z0-9]+:/g, '')
                    .replace(/\\n$/, '')
                    .replace(/\\"/g, '"')
                );
            }
        }
    });
    return refinedData;
}

/**
 * Checks if an object matches all criteria
 */
function matchesCriteria(obj: any, criteria: any): boolean {
    return Object.entries(criteria).every(([key, config]: [string, any]) => {
        const { type, value } = config;
        if (!(key in obj)) return false;
        if (typeof obj[key] !== type) return false;

        if (value !== undefined) {
            const val = obj[key];
            if (type === 'string' && value instanceof RegExp) return value.test(val);
            if (type === 'number' && typeof value === 'function') return value(val);
            return val === value;
        }
        return true;
    });
}

/**
 * Dynamic Criteria Search - recursively searches for objects matching criteria
 */
export function dynamicCriteriaSearch(obj: any, criteria: any): any[] {
    const results: any[] = [];

    function search(node: any): void {
        if (Array.isArray(node)) {
            node.forEach(search);
        } else if (isObject(node)) {
            if (matchesCriteria(node, criteria)) results.push(node);
            Object.values(node).forEach(search);
        }
    }

    search(obj);
    return results;
}

/**
 * Finds objects that contain all specified keys
 */
export function findProperties(obj: any, keysToFind: string[]): any[] {
    let results: any[] = [];

    function recursiveSearch(node: any): void {
        if (typeof node === 'object' && node !== null) {
            // Check if all keysToFind exist in the current object
            let foundKeys = keysToFind.every(key => key in node);
            if (foundKeys) {
                results.push(node);
            }

            // Continue searching nested objects
            for (let key in node) {
                recursiveSearch(node[key]);
            }
        }
    }

    recursiveSearch(obj);
    return results;
}

/**
 * Checks if an object has all specified keys
 */
export function hasKeys(obj: any, keys: string[]): boolean {
    return keys.every(k => k in obj);
}

/**
 * Finds objects matching a predicate function
 */
export function findWhere(obj: any, predicate: (node: any) => boolean): any[] {
    const results: any[] = [];

    function search(node: any): void {
        if (isObject(node)) {
            if (predicate(node)) results.push(node);
            Object.values(node).forEach(search);
        }
    }

    search(obj);
    return results;
}

/**
 * KETSU In-site Load Resilience Utilities
 * These functions help mitigate DOM loading conflicts in in-site mode
 */

/**
 * Waits for a DOM element to be present and stable before returning
 * Useful for lazy-loaded content that appears after JS execution
 */
export async function waitForElement(
    window: Window,
    selector: string,
    maxWaitMs: number = 5000,
    stabilityCheckMs: number = 500
): Promise<Element | null> {
    const startTime = Date.now();
    let lastFound: Element | null = null;
    let stableCount = 0;

    while (Date.now() - startTime < maxWaitMs) {
        const element = window.document.querySelector(selector);
        
        if (element) {
            if (element === lastFound) {
                stableCount++;
                if (stableCount >= 2) return element;
            } else {
                stableCount = 1;
                lastFound = element;
            }
        } else {
            stableCount = 0;
            lastFound = null;
        }

        await new Promise(resolve => setTimeout(resolve, stabilityCheckMs));
    }

    return lastFound;
}

/**
 * Waits for multiple selectors in parallel (first one that appears wins)
 * Returns { selector: string, element: Element } or null if timeout
 */
export async function waitForAnyElement(
    window: Window,
    selectors: string[],
    maxWaitMs: number = 5000
): Promise<{ selector: string; element: Element } | null> {
    const startTime = Date.now();

    while (Date.now() - startTime < maxWaitMs) {
        for (const selector of selectors) {
            const element = window.document.querySelector(selector);
            if (element) return { selector, element };
        }
        await new Promise(resolve => setTimeout(resolve, 200));
    }

    return null;
}

/**
 * Waits for the document to reach a stable state (no pending layout changes)
 * Helps ensure all JS has executed and DOM is fully rendered
 */
export async function waitForDomStability(
    window: Window,
    maxWaitMs: number = 8000,
    checkIntervalMs: number = 300
): Promise<void> {
    const startTime = Date.now();
    let stableChecks = 0;
    const requiredStableChecks = 3;

    while (Date.now() - startTime < maxWaitMs) {
        // Check if document is in a stable state:
        // - readyState should be "complete" or "interactive"
        // - no pending mutations
        const isStable =
            window.document.readyState === 'complete' ||
            (window.document.readyState === 'interactive' &&
             (window.document as any).hidden === false);

        if (isStable) {
            stableChecks++;
            if (stableChecks >= requiredStableChecks) break;
        } else {
            stableChecks = 0;
        }

        await new Promise(resolve => setTimeout(resolve, checkIntervalMs));
    }
}

/**
 * Extracts data by trying multiple strategies in sequence
 * Falls back to next strategy if current returns empty/null
 * Useful for overcoming partial DOM rendering issues
 */
export async function multiStrategyExtract<T>(
    window: Window,
    strategies: Array<() => T | Promise<T>>,
    validator: (result: T) => boolean = (r) => r !== null && r !== undefined
): Promise<T | null> {
    for (const strategy of strategies) {
        try {
            const result = await Promise.resolve(strategy());
            if (result && validator(result)) {
                return result;
            }
        } catch (error) {
            // Log but continue to next strategy
            console.warn('Strategy failed, trying next:', error);
        }
    }
    return null;
}
