# FlameScans Module

TypeScript module for scraping manga content from FlameComics.

## Overview

**Module Name:** FlameScans  
**Base URL:** https://flamecomics.xyz  
**Type:** Manga (Image-based)  
**Language:** English  

## Features

- ✅ Homepage with carousel, popular, staff picks, and latest chapters
- ✅ Search functionality
- ✅ Manga info with genres, status, and chapter list
- ✅ Chapter image extraction
- ✅ Next.js data parsing for dynamic content

## Module Structure

```
FlameScans/
├── MainPage.ts      # Homepage sections
├── Info.ts          # Manga details & chapters
├── Search.ts        # Search manga
├── Chapters.ts      # Chapter images
├── shared.ts        # Helper functions
└── README.md        # Documentation
```

## API Endpoints

### MainPage
- **URL:** `https://flamecomics.xyz/`
- **Sections:**
  - Carousel (Featured)
  - Popular Today
  - Staff Picked
  - Latest Chapters

### Search
- **URL:** `https://flamecomics.xyz/api/series?s=<query>`
- **Returns:** List of manga matching the search query

### Info
- **URL:** `https://flamecomics.xyz/series/<id>`
- **Returns:** Manga details, genres, synopsis, chapters

### Chapters
- **URL:** `https://flamecomics.xyz/series/<series_id>/<token>`
- **Returns:** Array of chapter images

## Technical Details

### Next.js Integration
FlameScans uses Next.js, so we extract data from:
- `script[id=__NEXT_DATA__]` for chapter information
- Mantine UI components for layout

### CSS Selectors
- Carousel: `div[class*=mantine-Carousel-slide]`
- Popular: `div[class*=Raep6nm] > div > div`
- Staff Picks: `div[class*=Ramp6nm] > div > div`
- Latest: `div[class*=Raup6nm] > div > div`
- Images: `img[decoding=async][fit=contain]`

## Helper Functions

### cleanUrl(url)
Prepends base URL to relative paths.

### cleanText(str)
Removes newlines and tabs, trims whitespace.

## Developer Notes

- All chapters are reversed to show newest first
- Search uses client-side filtering on series data
- Images are extracted using dynamic fetch for JavaScript rendering
- Empty placeholder image used when no cover available

## Version History

- **v1.26** - Module works again (latest)
- **v1.0** - Initial release

---

**Developer:** Scrumptious  
**Module ID:** 20231123  
**Repository:** https://github.com/OffsetParts/KetsuModules/
