import * as core from "../Template/core"
import { cleanUrl, cleanText, scriptFilter, dynamicCriteriaSearch, findProperties, normalizeAssetUrl } from "./shared"

// Fetch main page
let res = await core.fetch('https:/asurascans.com/', {loadInSite: true, removeScripts: false});

// Featured Section (static elements)
let FeaturedElm = res.querySelectorAll('[class*="hero__slide"');
let Featured = Array.from(FeaturedElm).map((list) => {
    let title = cleanText(list.querySelector('h3')!.textContent || '');
    let url = core.request(cleanUrl('/' + list.querySelector('a')!.getAttribute('href')));
    let image = core.request(list.querySelector('img')!.getAttribute('src') || '');
    
    return core.view({
        link: url,
        image: image,
        title: title
    });
});

// Popular Today Section
const popularElm = res.querySelectorAll('[class*="trending__slide"');
let Popular = Array.from(popularElm).map((list) => {
    let title = cleanText(list.querySelector('span.block')!.textContent || '');
    let url = core.request(cleanUrl(list.querySelector('a')!.getAttribute('href') || ''));
    let image = core.request(list.querySelector('img')!.getAttribute('src') || '');
    
    return core.view({
        link: url,
        image: image,
        title: title,
        field1: '1'
    });
});

// Latest Chapters Section
const latestElm = res.querySelectorAll('section[class*="h-full"] > div > div[class*=grid]');
let Latests = Array.from(latestElm).map((list) => {
    let title = cleanText(list.querySelector('a[class*=font]')!.textContent || '');
    let url = core.request(cleanUrl(list.querySelector('a')!.getAttribute('href') || ''));
    let image = core.request(list.querySelector('img')!.getAttribute('src') || '');
    let ep = cleanText(list.querySelector('a span')!.textContent || '');
    
    return core.view({
        link: url,
        image: image,
        title: title,
        description: ep
    });
});

// Build the main page layout
core.main([
    core.viewsHolder({
        orientation: "horizontal",
        design: "normal1",
        distribution: "longDoubletsFull",
        title: "Featured",
        views: Featured
    }),
    core.viewsHolder({
        orientation: "horizontal",
        design: "normal4",
        distribution: "longTriplets",
        title: "Popular Today",
        views: Popular
    }),
    core.viewsHolder({
        orientation: "horizontal",
        design: "wide9",
        distribution: "wideStrechedList",
        title: "Latest Chapters",
        views: Latests
    })
]);