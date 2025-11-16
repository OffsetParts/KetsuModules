import * as core from "../Template/core"
import { cleanUrl, cleanText } from "./shared"

let res = await core.dynamicFetch({loadInSite: true, removeScripts: false});

// ⚡ EFFICIENCY GAIN #1: Reduce DOM queries by querying parent once
const contentWrapper = res;

// ⚡ EFFICIENCY GAIN #2: Batch similar queries
const [genreContainer, stateEl, typeEl, synopsisEl, titleEl, imageEl] = [
    contentWrapper.querySelector('[class*="flex flex-row flex-wrap gap-3"]'),
    contentWrapper.querySelector('h3[class*="capitalize"]'),
    contentWrapper.querySelector('h3[class*="text-white hover:text-themecolor"]'),
    contentWrapper.querySelector('span[class*="A2A2A2"]'),
    contentWrapper.querySelector('[class*="text-xl"]'),
    contentWrapper.querySelector('[alt="poster"]')
];

// Extract title
if (!titleEl || !imageEl) {
    throw new Error("Failed to parse manga info");
}

// Extract genres
const genres = genreContainer 
    ? Array.from(genreContainer.querySelectorAll('button'), el => el.textContent?.trim() || '')
    : [];

const state = cleanText(stateEl?.textContent || '');
const type = cleanText(typeEl?.textContent || '');
const title = cleanText(titleEl.textContent || '');
const image = core.request(imageEl.getAttribute('src') || '');

// Extract synopsis
const synopsis = synopsisEl ? cleanText(synopsisEl.textContent || '') : '';

// Extract chapters
const chapterElms = contentWrapper.querySelectorAll('div[class*="border-[#A2A2A2]/20"]');
const totalChapters = chapterElms.length;

const chapters = Array.from(chapterElms, (element, index) => {
    const link = '/' + element.querySelector('a')?.getAttribute('href') || '';
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