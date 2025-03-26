function cleanText(str) {
	return str?.replace(/[\\n\\t]/g, '').trim() ?? '';
}

function cleanUrl(url) {
    return 'https://hianime.to' + (url.replace('/watch', '').replace('?w=latest', '')).trim();
}

function quickRequest(url, clean) {
	if (clean == true) {
		return new ModuleRequest(cleanUrl(url), 'get', emptyKeyValue, null);
	} else if (clean == false || clean == null) {
		return new ModuleRequest(url, 'get', emptyKeyValue, null);
	}
}

// Finding section block and formatting with descretion
    var topSlider = document.querySelectorAll('#slider .swiper-wrapper .swiper-slide');
    var loggedTitles = new Set(); // Track unique titles

    var Spotlight = Array.from(topSlider).map(slide => {
        var title = slide.querySelector('div.desi-head-title').textContent.trim();
        var image = slide.querySelector('img').dataset?.src;
        let link  = slide.querySelector('div.desi-buttons a').href;
        var airing = cleanText('First Aired: ' + slide.querySelector('div.sc-detail > div:nth-child(3)').textContent);

        if (!loggedTitles.has(title)) { // Check if the title is already logged
            loggedTitles.add(title); // Add to set to prevent duplicates
            console.log([title, image, cleanUrl(link), airing]);
        }
    });

    var popularArray = document.querySelectorAll('div.anif-block-03 li');
    var Popular = Array.from(popularArray).map(list => {
        var title = list.querySelector('h3').textContent;
        var image = list.querySelector('img')?.src;
        let link = list.querySelector('a')?.href ?? null; if (!link) return;

        var ticks = Array.from(list.querySelectorAll('div.tick-item')) ?? [];

        var [tickSub, tickDub] = ticks;
        let language = ticks.length > 1 && tickSub?.classList.contains('tick-sub') && tickDub?.classList.contains('tick-dub') 
            ? 'SUB/DUB' 
            : tickSub?.classList.contains('tick-sub') 
            ? 'SUB' 
            : tickDub?.classList.contains('tick-dub') 
            ? 'DUB' 
            : '';

        // Extract episode information
        var total = cleanText(list.querySelector('div.tick-eps')?.textContent);
        var subisode = cleanText(list.querySelector('div.tick-sub')?.textContent);
        var dubisode = cleanText(list.querySelector('div.tick-dub')?.textContent);

        let eps = total 
            ? `${subisode}/${total}`
            : subisode && dubisode 
            ? `${subisode}/${dubisode}` 
            : subisode || dubisode;

        console.log([title, image, cleanUrl(link), total, subisode, dubisode, eps, language]);
    });

    var newArray = Array.from(document.querySelectorAll('section.block_area_home') || [])
    .find(e => e.querySelector('.cat-heading')?.textContent.includes('New'));

    var NewAnimes = Array.from(newArray.querySelectorAll('div.flw-item')).map(list => {
        var imgElement = list.querySelector('img');
        var title = imgElement?.alt ?? 'Unknown Title';
        var link = list.querySelector('a')?.href ?? null; if (!link) return;
        var image = imgElement.dataset?.src ?? '';

        var ticks = Array.from(list.querySelectorAll('div.tick-item')) ?? [];

        var [tickSub, tickDub] = ticks;
        let language = ticks.length > 1 && tickSub?.classList.contains('tick-sub') && tickDub?.classList.contains('tick-dub') 
            ? 'SUB/DUB' 
            : tickSub?.classList.contains('tick-sub') 
            ? 'SUB' 
            : tickDub?.classList.contains('tick-dub') 
            ? 'DUB' 
            : '';

        // Extract episode information
        var total = cleanText(list.querySelector('div.tick-eps')?.textContent);
        var subisode = cleanText(list.querySelector('div.tick-sub')?.textContent);
        var dubisode = cleanText(list.querySelector('div.tick-dub')?.textContent);

        let eps = total 
            ? `${subisode}/${total}`
            : subisode && dubisode 
            ? `${subisode}/${dubisode}` 
            : subisode || dubisode;

        console.log([title, image, cleanUrl(link), total, subisode, dubisode, eps, language]);
    });

    let weeklyArray = Array.from(document.querySelectorAll('#top-viewed-week > ul > li'));
    let Weekly = weeklyArray.map(list => {
        var title = list.querySelector('a').title;
        const link = list.querySelector('a').href;
        var image = list.querySelector('img').dataset.src;

        console.log([title, image, link]);
    });

// Finding scheduling lists through a sequenstial request
    var actualtime = checkTime();

    var format = document.querySelector('script').innerText.replace('*/', '').replace('/*', '');
    var htmldom = new DOMParser().parseFromString(JSON.parse(format).html, 'text/html');
    var scheduleList = htmldom.querySelectorAll('li');

    // Mapping the array based on episodes that haven't aired yet
    let Schedule = Array.from(scheduleList)
    .filter(anime => {
        var time = cleanText(anime.querySelector('.time').textContent);
        return (
            parseInt(time.split(':')[0]) > parseInt(actualtime.split(':')[0]) ||
            (parseInt(time.split(':')[0]) == parseInt(actualtime.split(':')[0]) &&
             parseInt(time.split(':')[1]) > parseInt(actualtime.split(':')[1]))
        );
    })
    .map(anime => {
        var link = anime.querySelector('a').getAttribute('href');
        var episode = cleanText(anime.querySelector('.fd-play').innerText);
        var time = cleanText(anime.querySelector('.time').textContent);
        var title = time + ' - ' + cleanText(anime.querySelector('h3').innerText) + ' ' + episode;
        return { title, link, episode, time }; // Return an object instead of undefined
    });