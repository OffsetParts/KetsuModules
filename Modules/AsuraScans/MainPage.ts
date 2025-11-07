import * as core from "../Template/core"
import { cleanUrl, cleanText, scriptFilter, dynamicCriteriaSearch, findProperties } from "./shared"

// Fetch main page
let res = await core.fetch('https://asuracomic.net/', {loadInSite: true, removeScripts: false});

// GOAT Section (All comics)
let goatCriteria = { 'value': { type: 'string', value: 'all' } };
const goatData = dynamicCriteriaSearch(scriptFilter(res, '{\\\"value\\\":\\\"all\\\"'), goatCriteria);
let GOAT = goatData ? Array.from(goatData[0]['children']).map((list: any) => {
    const info = findProperties(list, ['href', 'children'])[1];
    let title = info.children;
    let url = core.request(cleanUrl(info.href));
    let image = core.request('https:' + findProperties(list, ['src'])[0].src);
    
    return core.view({
        link: url,
        image: image,
        title: title
    });
}) : [];

// Monthly Section
let monthlyCriteria = { 'value': { type: 'string', value: 'monthly' } };
const monthlyData = dynamicCriteriaSearch(scriptFilter(res, '{\\\"value\\\":\\\"monthly\\\"'), monthlyCriteria);
let MonthlyList = monthlyData ? Array.from(monthlyData[0]['children']).map((list: any) => {
    const info = findProperties(list, ['href', 'children'])[1];
    let title = info.children;
    let url = core.request(cleanUrl(info.href));
    let image = core.request('https:' + findProperties(list, ['src'])[0].src);
    
    return core.view({
        link: url,
        image: image,
        title: title
    });
}) : [];

// Featured Section (static elements)
let FeaturedElm = res.querySelectorAll('.slide');
let Featured = Array.from(FeaturedElm).map((list) => {
    let title = cleanText(list.querySelector('a')!.textContent || '');
    let url = core.request(cleanUrl('/' + list.querySelector('a')!.getAttribute('href')));
    let image = core.request(list.querySelector('img')!.getAttribute('src') || '');
    
    return core.view({
        link: url,
        image: image,
        title: title
    });
});

// Weekly Section
const weeklyElm = res.querySelectorAll('[id*="weekly"] > div');
let WeeklyList = Array.from(weeklyElm).map((list) => {
    let title = cleanText(list.querySelector('span a')!.textContent || '');
    let url = core.request(cleanUrl(list.querySelector('span a')!.getAttribute('href') || ''));
    let image = core.request(list.querySelector('img')!.getAttribute('src') || '');
    
    return core.view({
        link: url,
        image: image,
        title: title
    });
});

// Popular Today Section
const popularElm = res.querySelectorAll('div.hidden > [class*="p-1.5"]');
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
const latestElm = res.querySelectorAll('[class*="w-full p-1"]');
let Latests = Array.from(latestElm).map((list) => {
    let title = cleanText(list.querySelector('span')!.textContent || '');
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
        title: "GOAT",
        views: GOAT
    }),
    core.viewsHolder({
        orientation: "horizontal",
        design: "normal4",
        distribution: "longDoubletsFull",
        title: "Monthly",
        views: MonthlyList
    }),
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
        distribution: "longTripletsDouble",
        title: "Weekly",
        views: WeeklyList
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
