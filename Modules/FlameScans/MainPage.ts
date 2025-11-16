import * as core from "../Template/core"
import { cleanUrl, cleanText, cleanImage } from './shared';

// Fetch main page
let res = await core.fetch('https://flamecomics.xyz/', {loadInSite: true, removeScripts: false});

// Carousel - Top featured manga (GOAT section)
const carouselElm = res.querySelectorAll('div[class*=mantine-Carousel-slide]');
let Carousel = Array.from(carouselElm).map(entry => {
    const link = cleanUrl(entry.querySelector('a')?.getAttribute('href') || '');
    const banner = entry.querySelector('img')?.getAttribute('src') || '';
    const title = cleanText(entry.querySelector('h3')?.textContent || '');

    return core.view({
        link: core.request(link),
        image: core.request(cleanImage(banner)),
        title: title
    });
});

// Popular Today
const popularElm = res.querySelectorAll('div[id="popular"] > div > div');
let Popular = Array.from(popularElm).map(entry => {
    const title = cleanText(entry.querySelector('p')?.textContent || '');
    const link = cleanUrl(entry.querySelector('a')?.getAttribute('href') || '');
    const image = entry.querySelector('img')?.getAttribute('src') || '';

    return core.view({
        link: core.request(link),
        image: core.request(cleanImage(image)),
        title: title
    });
});

// Staff Picked
const staffPickedElm = res.querySelectorAll('div[id="staff-picks"] > div > div');
let StaffPicked = Array.from(staffPickedElm).map(entry => {
    const title = cleanText(entry.querySelector('p')?.textContent || '');
    const link = cleanUrl(entry.querySelector('a')?.getAttribute('href') || '');
    const image = entry.querySelector('img')?.getAttribute('src') || '';

    return core.view({
        link: core.request(link),
        image: core.request(cleanImage(image)),
        title: title
    });
});

// Latest Chapters
const latestElm = res.querySelectorAll('div[id="latest"] > div > div');
let Latests = Array.from(latestElm).map(entry => {
    const title = cleanText(entry.querySelector('a[class*=mantine-Text-root]')?.textContent || '');
    const link = cleanUrl(entry.querySelector('a')?.getAttribute('href') || '');
    const image = entry.querySelector('img')?.getAttribute('src') || '';
    const chapter = cleanText(entry.querySelector('p')?.textContent || '');

    return core.view({
        link: core.request(link),
        image: core.request(cleanImage(image)),
        title: title,
        description: chapter
    });
});

// Build the main page layout
core.main([
    core.viewsHolder({
        orientation: "horizontal",
        distribution: 'longDoubletsFull',
        design: "normal1",
        title: "",
        views: Carousel
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
        design: "normal4",
        distribution: "longTriplets",
        title: "Staff Picked",
        views: StaffPicked
    }),
    core.viewsHolder({
        orientation: "horizontal",
        design: "wide9",
        distribution: "wideStrechedList",
        title: "Latest Chapters",
        views: Latests
    })
]);
