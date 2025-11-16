/**
 * FlameScans Search Module
 * Fetches all series and filters based on search query
 */

import * as core from "../Template/core"
import { cleanUrl, cleanText, cleanImage } from './shared';

// Get search metadata (search query)
let SM = core.searchMetadata();

// Fetch the series list page (all comics)
let res = await core.fetch('https://flamecomics.xyz/browse', {loadInSite: true, removeScripts: false});

// Extract all series cards
const seriesCards = res.querySelectorAll('.DescSeriesCard_cardContainer__39kZS');

// Filter and map results based on search query
const results = Array.from(seriesCards)
    .map((card: any) => {
        // Extract title
        const titleElem = card.querySelector('.DescSeriesCard_title__iuEre');
        const title = cleanText(titleElem?.textContent || '');
        
        // Extract link
        const linkElem = card.querySelector('a[href^="/series/"]');
        const link = linkElem?.getAttribute('href') || '';
        
        // Extract image
        const imgElem = card.querySelector('img');
        const image = imgElem?.getAttribute('src') || '';
        
        // Extract status badge
        const statusBadge = card.querySelector('.mantine-Badge-root[data-variant="outline"]');
        const status = statusBadge ? cleanText(statusBadge.textContent || '') : '';
        
        // Extract genres
        const genreBadges = card.querySelectorAll('.DescSeriesCard_categories__0736e .mantine-Badge-root');
        const genres = Array.from(genreBadges).map((badge: any) => 
            cleanText(badge.textContent || '')
        ).join(', ');
        
        return {
            title,
            link,
            image,
            status,
            genres
        };
    })
    .filter(item => {
        // Filter by search query (case-insensitive)
        const searchLower = SM.searched.toLowerCase();
        return item.title.toLowerCase().includes(searchLower) || 
               item.genres.toLowerCase().includes(searchLower);
    })
    .map(item => {
        return core.view({
            link: core.request(cleanUrl(item.link)),
            image: core.request(cleanImage(item.image)),
            title: item.title,
            description: item.status,
            field1: item.genres
        });
    });

// Return search results
core.search([
    core.viewsHolder({
        title: `Search Results for "${SM.searched}"`,
        design: 'wide9',
        distribution: 'wideStrechedList',
        orientation: 'vertical',
        views: results
    })
]);