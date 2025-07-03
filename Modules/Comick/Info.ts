import * as core from "../Template/core"
import * as shared from "../Template/shared"

type ChaptersJson = Record<string, any>;

let res = await core.dynamicFetch({loadInSite: true, removeScripts: false});

let title = res.querySelector('h1')!.textContent;
let image = res.querySelector(`meta[property="og:image"]`)!.getAttribute('content');
let description = res.querySelector('div[class^=comic-desc] > p')!.textContent;
let table = res.querySelector("table.mt-3")!.textContent!.split(/(?=[A-Z][a-z]+(?:\s[A-Z][a-z]+)*:)/g)
let data : Record<string,string[]> = Object.fromEntries(table.map((v) => [v.split(": ")[0],v.split(": ")[1].split(", ")] ));
let hid = JSON.parse(res.querySelector('script[id=__NEXT_DATA__]')!.textContent!)['props']['pageProps']['comic']['hid'];
let chaptersAPI = await core.fetch(`https://api.comick.io/comic/${hid}/chapters?limit=1000`, {headers: {"Referer": "https://comick.io/"}});
let API_Data = shared.extractJsonString(chaptersAPI.querySelector('script')!.textContent!) as ChaptersJson;

let chaptersArray : Array<Record<string, any>> = API_Data ? API_Data['chapters'] : [];

let url = new URL('https://comick.io' + res.querySelector('meta[property="og:url"]')!.getAttribute('content'));
let sortedArray : any = shared.filterChaptersByPreferredGroup(chaptersArray, ['Asura', 'Official', 'flamecomics']).map(entry => {
    core.log(`${url}/${entry['hid']}-chapter-${entry['chap']}-en`);
    return core.chapterRequest(`${url}/${entry['hid']}-chapter-${entry['chap']}-en`, {headers: {"Referer": "https://comick.io/"},openInWebView: false, name: `Chapter ${entry['chap']}`})
}).reverse();

core.info({
    title : title as string,
    image : core.request(image as string),
    description : description as string,
    genres : data.Genres,
    chapters : sortedArray
});