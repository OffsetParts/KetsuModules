import * as core from "../Template/core"
import { ImageService } from "../Template/shared"

let request = await core.dynamicFetch({loadInSite: true, removeScripts: true});

let chapterData = JSON.parse(request.querySelector('[id=__NEXT_DATA__]')!.textContent!)['props']['pageProps']['chapter'];

let images = chapterData['md_images'].map((entry: any) => {
    return ImageService(entry['b2key']);
})

core.chapters(images) 