import * as core from "../Template/core"
import { ImageService, InfoService } from "../Template/shared"

let res1 = await core.fetch("https://comick.io/", {}, (w) => {
    return JSON.parse(w.document.querySelector('[id=__NEXT_DATA__]')!.textContent!)['props']['pageProps']['data'];
});

let Trending = Array.from(res1['trending'][7]).map((item: any, index: any) => {
    let title = item['title'];
    let image = ImageService(item['md_covers'][0]['b2key']);
    let link = InfoService(item['slug']); 

    return core.view({
        link: link,
        image: image,
        title : title,
        field1: `${index + 1}`
    })
});

let RisingStars = Array.from(res1['topFollowNewComics'][7]).map((item: any) => {
    let title = item['title'];
    let image = ImageService(item['md_covers'][0]['b2key']);
    let link = InfoService(item['slug']);

    return core.view({
        link: link,
        image: image,
        title : title
    })
});

let AdaptedManga = Array.from(res1['comicsByCurrentSeason']['data']).map((item: any) => {
    let title = item['title'];
    let image = ImageService(item['md_covers'][0]['b2key']);
    let link = InfoService(item['slug']); 

    return core.view({
        link: link,
        image: image,
        title : title
    })
});

let Completed = Array.from(res1['completions']).map((item: any) => {
    let title = item['title'];
    let image = ImageService(item['md_covers'][0]['b2key']);
    let link = InfoService(item['slug']);

    return core.view({
        link: link,
        image: image,
        title : title
    })
});

let Recent = Array.from(res1['news']).map((item: any) => {
    let title = item['title'];
    let image = ImageService(item['md_covers'][0]['b2key']);
    let link = InfoService(item['slug']);

    return core.view({
        link: link,
        image: image,
        title : title
    })
});

core.main([
    core.viewsHolder({
        orientation: "horizontal",
        design: "wide3",
        distribution: "longDoubletsFull",
        title : "Trending",
        views : Trending
    }), core.viewsHolder({
        orientation: "horizontal",
        design: "normal1",
        distribution: "longTripletsDouble",
        title : "Rising Stars",
        views : RisingStars
    }), core.viewsHolder({
        orientation: "horizontal",
        design: "wide6",
        distribution: "longTriplets",
        title: "Adapted To Manga",
        views: AdaptedManga
    }), core.viewsHolder({
        orientation: "horizontal",
        design: "wide4",
        distribution: "wideFull",
        title: "Completed",
        views: Completed
    }), core.viewsHolder({
        orientation: "vertical",
        design: "wide9",
        distribution: "wideStrechedFullList",
        title: "Recent Updates",
        views: Recent
    })
])