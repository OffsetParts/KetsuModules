import * as core from "../Template/core"
import * as shared from "../Template/shared"

// TODO CREATE SEARCH METADATA FUNCTION

let SM = core.searchMetadata({searched: 'regress', page:0})

let searchAPI = await core.fetch(`https://api.comick.io/v1.0/search?q=${SM.searched}&limit=100`, {headers: {"Referer": "https://comick.io/"}});
let API_Data = shared.extractJsonString(searchAPI.querySelector('script')!.textContent!); core.log(API_Data.length);

let filtered_data = API_Data.map((entry : any) => {
    let title = entry['title']; let image = shared.ImageService(entry['md_covers'][0]['b2key']);
    let rating = Math.round(entry['rating']); let link = shared.InfoService(entry['slug']);
    return core.view({
        title: title as string,
        image: image,
        field1: rating.toString() as string,
        link: link
    })
});

core.search([
    core.viewsHolder({
        title: 'Search',
        distribution: 'longDoubletsDouble',
        orientation: 'vertical',
        design: 'wide3',
        views : filtered_data
    })
])