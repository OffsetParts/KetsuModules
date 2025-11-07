import * as core from "../Template/core"

let imageUrls = await core.dynamicFetch({loadInSite: true, removeScripts: false}, (w) => {
    function getImages(): string[] {
        return Array.from(w.document.querySelectorAll('[alt*="chapter page"]'))
            .map((img: any) => img.src?.trim());
    }
    
    // Use polling with a promise to wait for images
    return new Promise<string[]>((resolve) => {
        let attempts = 0;
        const maxAttempts = 50; // 5 seconds max (50 * 100ms)
        
        const checkForImages = () => {
            const imgs = getImages();
            
            if (imgs.length > 0) {
                resolve(imgs);
            } else if (attempts >= maxAttempts) {
                resolve([]);
            } else {
                attempts++;
                w.setTimeout(checkForImages, 100);
            }
        };
        
        checkForImages();
    });
});

let images = imageUrls.map((url: string) => core.request(url, {headers: { 
       'Referer' : 'https://asuracomic.net/'
}}));

core.chapters(images);