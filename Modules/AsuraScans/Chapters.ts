import * as core from "../Template/core"
import { normalizeAssetUrl, pickSrcFromSrcset, waitForDomStability } from "./shared"

// Fetch the page HTML and extract image data from Next.js script tags
let images = await core.dynamicFetch(
    { loadInSite: false, removeScripts: false},
    async (window) => {
        const imgs = Array.from(window.document.querySelectorAll('img[alt*="Page "]'));

        return imgs
            .map(img => img.getAttribute('src') ?? img.getAttribute('data-src') ?? '')
            .filter((src): src is string => src.length > 0)
            .map(src => core.request(src));
    }
); core.log(images);

// Output the chapter images
core.chapters(images);