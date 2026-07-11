import * as core from "../Template/core"
import { cleanUrl, cleanText } from "./shared"

// Get search metadata (search query and page number)
let SM = core.searchMetadata();

// Fetch search results page
let res = await core.fetch(
    `https://asurascans.com/browse?q=${SM.searched}&page=${SM.page}`,
    { loadInSite: true, removeScripts: true, headers: {
        'Referer' : 'https://asurascans.com/'
    } }
);

// Extract search results
const searchResults = res.querySelectorAll('div[class^="series-card"]');
const results = Array.from(searchResults).map(list => {
    const titleElem = list.querySelector('div > a > h3');
    const title = titleElem?.textContent || '';
    
    const link = list.querySelector('a')!.getAttribute('href') || '';
    const imageElem = list.querySelector('img');
    const image = imageElem?.getAttribute('src') || '';
    
    const chapterElem = list.querySelector('div > div > span');
    const lastChapter = chapterElem ? cleanText(chapterElem.textContent || '') : '';

    const ratingElem = list.querySelector('a > div > span');
    const rating = ratingElem ? cleanText(ratingElem.textContent || '') : '';
    
    return core.view({
        link: core.request(cleanUrl(link)),
        image: core.request(image),
        title: cleanText(title),
        description: lastChapter,
        field1: rating,
    });
});

// Return search results
core.search([
    core.viewsHolder({
        title: 'Search Results',
        design: 'wide6',
        distribution: 'longDoubletsDouble',
        orientation: 'vertical',
        views: results
    })
]);