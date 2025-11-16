/**
 * FlameScans Chapters Module
 * Fetches chapter images
 */

import * as core from "../Template/core"

let res = await core.dynamicFetch({loadInSite: true, removeScripts: false});

// Extract images from the chapter page
const imageElements = Array.from(res.querySelectorAll('img[decoding=async][my=none]'));

const images = imageElements
    .map((img: any) => img.getAttribute('src') || '')
    .filter((src: string) => src.length > 0)
    .map((src: string) => core.request(src));

core.chapters(images);
