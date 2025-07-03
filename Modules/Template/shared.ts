import * as core from "./core"

export function extractJsonString(text : string) {
    // Match the first {...} or [...] block (non-greedy)
    const match = text.match(/({[\s\S]*}|\[[\s\S]*\])/);
    return match ? JSON.parse(match[0]) : null;
}

/**
 * Given an array of chapter entries, returns only the preferred group for each chap.
 * @param {Array} chapters - Array of chapter objects with 'chap' and 'group_name'.
 * @param {Array} preferredGroups - Array of group names in order of preference.
 * @returns {Array} Filtered array with only preferred group per chap.
 */
export function filterChaptersByPreferredGroup(chapters : Array<Record<string, any>>, preferredGroups : Array<string>) {
    // Group chapters by chap number
    const chapMap = new Map();
    for (const entry of chapters) {
        const chapNum = entry.chap;
        if (!chapMap.has(chapNum)) chapMap.set(chapNum, []);
        chapMap.get(chapNum).push(entry);
    }

    // For each chap, pick the preferred group
    const result: Array<Record<string, any>> = [];
    for (const [chapNum, groupEntries] of chapMap.entries()) {
        // Sort by preferredGroups order
        groupEntries.sort((a: any, b: any) => {
            const aIdx = preferredGroups.indexOf(a.group_name);
            const bIdx = preferredGroups.indexOf(b.group_name);
            return (aIdx === -1 ? Infinity : aIdx) - (bIdx === -1 ? Infinity : bIdx);
        });
        result.push(groupEntries[0]); // Pick the top-ranked group
    }
    return result;
}

export function ImageService(data: string) {
    return core.request('https://meo.comick.pictures/' + data, {headers: {"Referer": "https://comick.io/"}});
}

export function InfoService(data: string) {
    return core.request(`https://comick.io/comic/${data}?lang=en`);
}