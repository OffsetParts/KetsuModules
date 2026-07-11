import * as core from "../Template/core"
import { cleanUrl, cleanText, normalizeAssetUrl, waitForDomStability } from "./shared"

let res = await core.dynamicFetch({loadInSite: false, removeScripts: false});


const contentWrapper = res;

const [genreContainer, stateEl, typeEl, synopsisEl, titleEl, imageEl] = [
    contentWrapper.querySelector('[class*="max-w-full gap-2 flex-wrap"]'),
    contentWrapper.querySelector('div > span[class*="font-bold text-[#A"]'),
    contentWrapper.querySelector('div > span[class*="font-bold text-[#9"]'),
    contentWrapper.querySelector('div[id^=description]'),
    contentWrapper.querySelector('h1'),
    contentWrapper.querySelector('div[class^=rounded] > img[src*=covers]')
];

// Extract title
if (!titleEl || !imageEl) {
    throw new Error("Failed to parse manga info");
}

// Extract genres
const genres = genreContainer ? Array.from(genreContainer.querySelectorAll('a'), el => el.textContent?.trim() || ''): [];

const state = cleanText(stateEl?.textContent || '');
const type = cleanText(typeEl?.textContent || '');
const title = cleanText(titleEl.textContent || '');
const image = core.request(imageEl.getAttribute('src') || '');

// Extract synopsis
const synopsis = synopsisEl ? cleanText(synopsisEl.textContent || '') : '';

// Extract chapters
const chapterElms = contentWrapper.querySelectorAll('div > div[class^=divide] > a');
const totalChapters = chapterElms.length;

const chapters = Array.from(chapterElms, (element, index) => {
    const link = element.getAttribute('href') || '';
    return core.chapterRequest(cleanUrl(link), {
        name: `Chapter ${totalChapters - index}`,
        openInWebView: false
    });
}).reverse();

// Build info page
core.info({
    title: title,
    image: image,
    description: synopsis,
    genres: genres,
    field1: state,
    field2: type,
    field4: `Chapters : ${chapters.length}`,
    chapters: chapters
});
