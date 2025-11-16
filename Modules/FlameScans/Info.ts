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

const nextDataScript = JSON.parse(res.querySelector('script[id=__NEXT_DATA__]')?.textContent || '{}').props?.pageProps || {};

const seriesInfo = nextDataScript?.series;
const synopsis = seriesInfo.description || '';
const state = seriesInfo?.status || '';
const type = seriesInfo?.type || '';

const genres = seriesInfo?.tags;


let chapters: any[] = [];

if (nextDataScript) {
    try {
        const chaptersData = nextDataScript.chapters || [];

        chapters = chaptersData.map((entry: any) => {
            const chapterNum = entry.chapter?.replace('.00', '') || '';
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
