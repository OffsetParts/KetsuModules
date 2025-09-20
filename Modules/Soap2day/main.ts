import * as core from "../Template/core"
import * as shared from "./shared";

type pageLink = string;
type ScrapedData = { title: string, image: string, rating: string, link: string, category: string};
type PageDictionary = Record<string, string>; // { [siteName]: url }

let soap2day = await core.fetch('https://ww25.soap2day.day/', {loadInSite: true, removeScripts: false});

async function scrapePage(path: pageLink, categoryName: string): Promise<Array<ScrapedData>> {
  let options = {
    mode: 'no-cors' as RequestMode,
    headers: {
      "Referer": "https://ww25.soap2day.day/"
    }
  }

  let response = await window.fetch(path, options);
  let text = await response.text();
  
  let parser = new DOMParser();
  let site = parser.parseFromString(text, 'text/html');

  let entries = Array.from(site.querySelectorAll('div[class*="movies-list-full"] > div[class*="ml-item"]')).map((entry: any) => {
    let link = entry.querySelector('a')?.href ?? "";
    let title = entry.querySelector('span[class=h2]')?.textContent ?? "";
    
    let imgElement = entry.querySelector('a img');
    let image = imgElement?.getAttribute('data-original') || "";
    
    let rating = entry.querySelector('span[title=IMDB]')?.textContent ?? "";

    return {title, image, rating, link, category: categoryName};
  });

  return entries;
}

function getPagesDictionary(): PageDictionary {
  let selectedSites: Array<string> = shared.getCombinedEntries(
    shared.getRandomInteger(2, 5),
    shared.getRandomInteger(2, 5),
    shared.getRandomInteger(2, 5)
  );

  const pagesDictionary: PageDictionary = {};

  selectedSites.forEach((siteName: string) => {
    const elements = Array.from(soap2day.querySelectorAll('[id=menu] li a')) as HTMLAnchorElement[];
    const elm = elements.find((elm) => elm?.textContent === siteName);
    
    if (elm?.href) {
      pagesDictionary[siteName] = elm.href;
    }
  });

  return pagesDictionary;
}

async function main(): Promise<void> {
  const pagesDictionary = getPagesDictionary();

  // Scrape all pages and organize by category
  const categorizedResults: Record<string, ScrapedData[]> = {};
  
  for (const [siteName, url] of Object.entries(pagesDictionary)) {
    try {
      const entries = await scrapePage(url, siteName);
      categorizedResults[siteName] = entries;
      core.log(`Scraped ${entries.length} entries from ${siteName}`);
    } catch (error) {
      core.log(`Failed to scrape ${siteName}:`, error);
      categorizedResults[siteName] = [];
    }
  }

  const viewHolders: Array<any> = [];

  for (const [category, entries] of Object.entries(categorizedResults)) {
    // Skip categories with no entries
    if (entries.length === 0) continue;
    
    // Convert entries to views
    const views = entries.map((entry) => {
      return core.view({
        link: core.request(entry.link),
        image: core.request(entry.image.trim()),
        title: entry.title,
        field1: entry.rating ? `${entry.rating}` : ""
      });
    });

    // Create viewHolder for this category
    viewHolders.push(
      core.viewsHolder({
        title: category,
        orientation: "horizontal",
        design: "wide3",
        distribution: "longDoubletsFull",
        views: views
      })
    );
  }

  // Pass viewHolders to core.main
  core.main(viewHolders);
}

await main().catch((err) => {core.log(err.message);})