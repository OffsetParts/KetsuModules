/**
 * Cleans and formats a URL for AsuraScans
 */
export function cleanUrl(url: string): string {
    return 'https://asuracomic.net' + url.trim();
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
