import * as core from "../Template/core"

let imageUrls = await core.dynamicFetch({loadInSite: true, removeScripts: false}, (w) => {
    function getImages(): string[] {
        return Array.from(w.document.querySelectorAll('[alt*="chapter page"]'))
            .map((img: any) => img.src?.trim())
            .filter((src: string) => src && src.length > 0);
    }
    
    // Function to trigger lazy loading by scrolling
    function triggerLazyLoad() {
        // Scroll to bottom to trigger lazy-loaded images
        w.window.scrollTo(0, w.document.body.scrollHeight);
        
        // Then scroll back to top
        w.setTimeout(() => {
            w.window.scrollTo(0, 0);
        }, 100);
    }
    
    // Use MutationObserver to watch for images being added to DOM
    return new Promise<string[]>((resolve) => {
        // Immediately trigger lazy loading
        triggerLazyLoad();
        
        // Continue triggering lazy load periodically
        const scrollInterval = w.setInterval(() => {
            triggerLazyLoad();
        }, 1000);
        
        // Check if images are already loaded
        const initialImages = getImages();
        if (initialImages.length > 0) {
            w.clearInterval(scrollInterval);
            resolve(initialImages);
            return;
        }
        
        // Set up MutationObserver to watch for DOM changes
        const observer = new (w as any).MutationObserver((_mutations: any) => {
            const imgs = getImages();
            if (imgs.length > 0) {
                observer.disconnect();
                w.clearInterval(scrollInterval);
                resolve(imgs);
            }
        });
        
        // Observe the entire document for additions
        observer.observe(w.document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['src']
        });
        
        // Fallback timeout after 10 seconds
        w.setTimeout(() => {
            observer.disconnect();
            w.clearInterval(scrollInterval);
            resolve(getImages());
        }, 10000);
    });
});

let images = imageUrls.map((url: string) => core.request(url, {headers: { 
       'Referer' : 'https://asuracomic.net/'
}}));

core.chapters(images);