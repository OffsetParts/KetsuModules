import * as core from "../Template/core"
import { cleanUrl, cleanText } from "./shared"

// Get search metadata (search query and page number)
let SM = core.searchMetadata();

// Fetch search results page
let res = await core.fetch(
    `https://asuracomic.net/series?page=${SM.page}&name=${encodeURIComponent(SM.searched)}`,
    { loadInSite: true, removeScripts: true }
);

// Extract search results
const searchResults = res.querySelectorAll('[class*="gap-3 p-4"] a');
const results = Array.from(searchResults).map(list => {
    const titleElem = list.querySelector('span[class*="block"]');
    const title = titleElem?.textContent || '';
    
    const link = list.getAttribute('href') || '';
    const imageElem = list.querySelector('img');
    const image = imageElem?.getAttribute('src') || '';
    
    const chapterElem = list.querySelector('[class*="text-[13px]"]');
    const lastChapter = chapterElem ? cleanText(chapterElem.textContent || '') : '';
    
    return core.view({
        link: core.request(cleanUrl(link)),
        image: core.request(image),
        title: cleanText(title),
        description: lastChapter
    });
});

// Return search results
core.search([
    core.viewsHolder({
        title: 'Search Results',
        design: 'wide8',
        distribution: 'longDoubletsDouble',
        orientation: 'vertical',
        views: results
    })
]);
