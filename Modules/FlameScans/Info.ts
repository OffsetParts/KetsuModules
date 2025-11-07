/**
 * FlameScans Info Module
 * Fetches manga details and chapter list
 */

import * as core from "../Template/core"
import { cleanUrl, cleanText, cleanImage } from './shared';

let res = await core.dynamicFetch({loadInSite: true, removeScripts: false});

// Extract basic info
const title = cleanText(res.querySelector('h1')?.textContent || '');
const image = core.request(cleanImage(res.querySelector('img')?.getAttribute('src') || ''));
const state = cleanText(res.querySelector('div[style*=green] span[class*=Badge]')?.textContent || '');
const synopsis = cleanText(res.querySelector('div [style*=transition] > p.mantine-Text-root')?.textContent || '');

// Extract type
const infoValues = Array.from(res.querySelectorAll('div[class*=Card] p[class*=infoValue]'));
const type = infoValues[3]?.textContent || '';

// Extract genres
const genres = Array.from(res.querySelectorAll('a[href*=genre] span')).map((g: any) => 
    cleanText(g.textContent || '')
);

// Extract chapters from Next.js data
const nextDataScript = res.querySelector('script[id=__NEXT_DATA__]');
let chapters: any[] = [];

if (nextDataScript) {
    try {
        const nextData = JSON.parse(nextDataScript.textContent || '');
        const chaptersData = nextData?.props?.pageProps?.data || [];

        chapters = chaptersData.map((entry: any) => {
            const chapterNum = entry.chapter?.replace('.0', '') || '';
            const link = cleanUrl(`/series/${entry.series_id}/${entry.token}`);
            const name = `Chapter ${chapterNum}`;

            return core.chapterRequest(link, {
                name: name,
                openInWebView: false
            });
        }).reverse();
    } catch (error) {
        console.error('Error parsing chapter data:', error);
    }
}

// Build info page
core.info({
    title: title,
    image: image,
    description: synopsis,
    genres: genres,
    field1: type,
    field2: state,
    field4: `Chapters: ${chapters.length}`,
    chapters: chapters
});
