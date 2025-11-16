import * as core from "../Template/core"
import { scriptFilter, findProperties } from "./shared"

// Fetch the page HTML and extract image data from Next.js script tags
let html = await core.dynamicFetch({loadInSite: true, removeScripts: false});

// Extract chapter pages data from the Next.js hydrated script
// Looking for script containing "pages" data with url and order properties
let scriptData = scriptFilter(html, '"pages\\"');

// Find all objects that have both 'url' and 'order' properties
// These represent the chapter page images
let pageData = findProperties(scriptData, ['url', 'order']);

// Sort by order to ensure pages are in correct sequence
pageData.sort((a, b) => a.order - b.order);

// Create image requests with proper referer header for each page
let images = pageData.map((page) => 
    core.request('https:' + page.url, {
        headers: { 
            'Referer': 'https://asuracomic.net/'
        }
    })
);

// Output the chapter images
core.chapters(images);