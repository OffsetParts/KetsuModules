// Style: MainPage
const DefaultLayouts = {
	ultraWideFull: 'ultraWideFull',
	ultraWide: 'ultraWide',
	wideFull: 'wideFull',
	wide: 'wide',
	wideStrechedFull: 'wideStrechedFull',
	wideStrechedFullDouble: 'WideStrechedFullDouble',
	wideStreched: 'wideStreched',
	wideStrechedDouble: 'wideStrechedDouble',
	wideStrechedFullList: 'wideStrechedFullList',
	wideStrechedList: 'wideStrechedList',
	doublets: 'doublets',
	doubletsDouble: 'doubletsDouble',
	doubletsFull: 'doubletsFull',
	doubletsFullDouble: 'doubletsFullDouble',
	doubletsConstant: 'doubletsConstant',
	doubletsDoubleConstant: 'doubletsDoubleConstant',
	doubletsFullConstant: 'doubletsFullConstant',
	doubletsFullDoubleConstant: 'doubletsFullDoubleConstant',
	longDoublets: 'longDoublets',
	longDoubletsDouble: 'longDoubletsDouble',
	longDoubletsFull: 'longDoubletsFull',
	longDoubletsFullDouble: 'longDoubletsFullDouble',
	longDoubletsConstant: 'longDoubletsConstant',
	longDoubletsDoubleConstant: 'longDoubletsDoubleConstant',
	longDoubletsFullConstant: 'longDoubletsFullConstant',
	longDoubletsFullDoubleConstant: 'longDoubletsFullDoubleConstant',
	triplets: 'triplets',
	tripletsDouble: 'tripletsDouble',
	tripletsFull: 'tripletsFull',
	tripletsFullDouble: 'tripletsFullDouble',
	tripletsConstant: 'tripletsConstant',
	tripletsDoubleConstant: 'tripletsDoubleConstant',
	tripletsFullConstant: 'tripletsFullConstant',
	tripletsFullDoubleConstant: 'tripletsFullDoubleConstant',
	longTriplets: 'longTriplets',
	longTripletsDouble: 'longTripletsDouble',
	longTripletsFull: 'longTripletsFull',
	longTripletsFullDouble: 'longTripletsFullDouble',
	longTripletsConstant: 'longTripletsConstant',
	longTripletsDoubleConstant: 'longTripletsDoubleConstant',
	longTripletsFullConstant: 'longTripletsFullConstant',
	longTripletsFullDoubleConstant: 'longTripletsFullDoubleConstant',
	none: ''
};

const CellDesings = {
	Special1: 'Special1',
	Special2: 'Special2',
	Special3: 'Special3',
	CELLHelperText: 'CELLHelperText',
	small1: 'small1',
	small2: 'small2',
	normal1: 'normal1',
	normal2: 'normal2',
	normal3: 'normal3',
	normal4: 'normal4',
	normal5: 'normal5',
	normal6: 'normal6',
	normal7: 'normal7',
	wide1: 'wide1',
	wide2: 'wide2',
	wide3: 'wide3',
	wide4: 'wide4',
	wide5: 'wide5',
	wide6: 'wide6',
	wide7: 'wide7',
	wide8: 'wide8',
	wide9: 'wide9',
	wide10: 'wide10',
	wide11: 'wide11'
};

const Paging = {
	leading: 'leading',
	centered: 'centered',
	none: ''
};

const Orientation = {
	horizontal: 'horizontal',
	vertical: 'vertical'
};

const RatioRelation = {
	width: 'width',
	height: 'height'
};

// Functions
function MainPage(request, extra, javascriptConfig, output) {
	this.request = request;
	this.extra = extra;
	this.javascriptConfig = javascriptConfig;
	this.output = output;
}

function ModuleRequest(url, method, headers, httpBody) {
	this.url = url;
	this.method = method;
	this.headers = headers;
	this.httpBody = httpBody;
}

function Extra(commands, extraInfo) {
	this.commands = commands;
	this.extraInfo = extraInfo;
}

function Commands(commandName, params) {
	this.commandName = commandName;
	this.params = params;
}

function JavascriptConfig(removeJavascript, loadInWebView, javaScript) {
	this.removeJavascript = removeJavascript;
	this.loadInWebView = loadInWebView;
	this.javaScript = javaScript;
}

function KeyValue(key, value) {
	this.key = key;
	this.value = value;
}

function Insets(top, bottom, left, right) {
	this.top = top;
	this.bottom = bottom;
	this.left = left;
	this.right = right;
}

function Size(width, height) {
	this.width = width;
	this.height = height;
}

function Ratio(inRelation, number1, number2) {
	this.inRelation = inRelation;
	this.number1 = number1;
	this.number2 = number2;
}

function Section(sectionName, separator) {
	this.sectionName = sectionName;
	this.separator = separator;
}

function Layout(insets, visibleCellsWidthS, visibleCellsWidthM, visibleCellsWidthL, visibleCellsHeight, heightForVisibleCells, cellSize, ratio, constant, horizontalSpacing, verticalSpacing) {
	this.insets = insets;
	this.visibleCellsWidthS = visibleCellsWidthS;
	this.visibleCellsWidthM = visibleCellsWidthM;
	this.visibleCellsWidthL = visibleCellsWidthL;
	this.visibleCellsHeight = visibleCellsHeight;
	this.heightForVisibleCells = heightForVisibleCells;
	this.cellSize = cellSize;
	this.ratio = ratio;
	this.constant = constant;
	this.horizontalSpacing = horizontalSpacing;
	this.verticalSpacing = verticalSpacing;
}

function Data(image, title, description, field1, field2, field3, field4, isChapter, link, openInWebView) {
	this.image = image;
	this.title = title;
	this.description = description;
	this.field1 = field1;
	this.field2 = field2;
	this.field3 = field3;
	this.field4 = field4;
	this.isChapter = isChapter;
	this.link = link;
	this.openInWebView = openInWebView;
}

function Output(cellDesing, orientation, defaultLayout, paging, section, layout, data) {
	this.cellDesing = cellDesing;
	this.orientation = orientation;
	this.defaultLayout = defaultLayout;
	this.paging = paging;
	this.section = section;
	this.layout = layout;
	this.data = data;
}

//Init
var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);
var emptyKeyValue = [new KeyValue('', '')];
let XHRequest = [new KeyValue('X-Requested-With', 'XMLHttpRequest')];
var commands = [new Commands('helperFunctions', [new KeyValue('isCustomRequest', 'true')])];
let emptyExtra = new Extra(commands, emptyKeyValue);

// var onLoadTest = parsedJson.extra.extraInfo[0].value;
const dummyRequest = new ModuleRequest('', 'get', emptyKeyValue, null);

// If outdated run the zoro version
const ZoroReplacement = new ModuleRequest('ketsuapp://?moduleData=https://raw.githubusercontent.com/Bilnaa/beta-ketsu/main/zoro.json', 'get', emptyKeyValue, null);
const infoText = new Data(dummyRequest, `Subs are only available on newer versions of Ketsu, and the RapidCloud resolver won't work if you have the App Store version.\\nClick on this message if you are using the App Store version of KETSU and not getting subtitles. If you do so don't forget to refresh this page.`, '', '', '', '', '', false, ZoroReplacement, false);

let output = [];

// Functions

function createLayout(insets, size, ratio) {
    return new Layout(insets, 1, 1, 1, 1, 0, size, ratio, new Size(0, 0), 0, 0);
}

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

var topSlider = document.querySelectorAll('#slider .swiper-wrapper .swiper-slide');
var loggedTitles = new Set();

var Spotlight = Array.from(topSlider).map(slide => {
    var title = cleanText(slide.querySelector('div.desi-head-title').textContent);
    var image = quickRequest(slide.querySelector('img').dataset?.src);
    let link  = quickRequest(slide.querySelector('div.desi-buttons a').href, true);

    // var info = cleanText(slide.querySelector('div.desi-description').textContent);
    // var type = cleanText(slide.querySelector('div.sc-detail > div:nth-child(1)').textContent);
    var airing = cleanText('First Aired: ' + slide.querySelector('div.sc-detail > div:nth-child(3)').textContent);
	if (!loggedTitles.has(title)) {
		loggedTitles.add(title);
		return new Data(image,'', '', title, airing, '', '', false, link, false);
	}
});

var risingTides = document.querySelectorAll('div [class=trending-list] > div > div > div');
var Trending = Array.from(risingTides).map(list => {
	var title = list.querySelector('[class*=title]').textContent;
	var image = quickRequest(list.querySelector('img').dataset?.src);
	let link = quickRequest(list.querySelector('a').href, true);
	// var ranking = list.querySelector('span').textContent;

	return new Data(image, title, '', '', '', '', '', false, link, false);
});

var bestAiring = document.querySelectorAll('div.anif-block-01 li');
var TopAiring = Array.from(bestAiring).map(list => {
	var title = list.querySelector('h3').textContent;
	var image = quickRequest(list.querySelector('img').dataset?.src);
	let link = quickRequest(list.querySelector('a').href, true);
	// var episode = list.querySelector('div.tick-sub').classList.contains('tick-sub') ? list.querySelector('div.tick-sub').textContent : '';

	return new Data(image, title, '', '', '', '', '', false, link, false);
});

var popularArray = document.querySelectorAll('div.anif-block-03 li');
var Popular = Array.from(popularArray).map(list => {
	var title = list.querySelector('h3').textContent;
	var image = quickRequest(list.querySelector('img').dataset?.src);
	let link = quickRequest(list.querySelector('a')?.href, true) ?? null; if (!link) return;

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

	return new Data(image, title, '', eps, language, '', '', false, link, false);
});


var newArray = Array.from(document.querySelectorAll('section.block_area_home') || [])
.find(e => e.querySelector('.cat-heading')?.textContent.includes('New'));

var NewAnimes = Array.from(newArray.querySelectorAll('div.flw-item')).map(list => {
	var imgElement = list.querySelector('img');
    var title = imgElement?.alt ?? 'Unknown Title';
    var link = quickRequest(list.querySelector('a')?.href, true) ?? null; if (!link) return;
    var image = quickRequest(imgElement.dataset?.src ?? '');

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

	return new Data(image, title, '', eps, language, '', '', false, link);
});

let weeklyArray = Array.from(document.querySelectorAll('#top-viewed-week > ul > li'));
let Weekly = Array.from(weeklyArray).map(list => {
	var title = list.querySelector('a').title;
	const link = quickRequest(list.querySelector('a').href, true);
	var image = quickRequest(list.querySelector('img').dataset.src);

	return new Data(image, title, '', '', '', '', '', false, link);
});

let Poster = createLayout(new Insets(0, 0, 0, 0), new Size(400, 105), new Ratio('width', 6, 10));

output.push(new Output(CellDesings.Special3, Orientation.horizontal, DefaultLayouts.none, Paging.leading, new Section( 'Spotlight', true ), Poster, Spotlight));
output.push(new Output(CellDesings.wide4, Orientation.horizontal, DefaultLayouts.longDoublets, Paging.none, new Section( 'Trending', true ), null, Trending));
output.push(new Output(CellDesings.wide6, Orientation.horizontal, DefaultLayouts.longTriplets, Paging.none, new Section( 'Top Airing', true ), null, TopAiring));
output.push(new Output(CellDesings.wide6, Orientation.horizontal, DefaultLayouts.longDoubletsFull, Paging.leading, new Section( 'Popular', true ), null, Popular));
output.push(new Output(CellDesings.wide6, Orientation.horizontal, DefaultLayouts.longDoubletsDouble, Paging.none, new Section( 'New On HiAnime', true ), null, NewAnimes));
output.push(new Output(CellDesings.wide1, Orientation.horizontal, DefaultLayouts.longDoublets, Paging.none, new Section( 'Weekly Highlights', true ), null, Weekly));

let date = new Date();
let year = date.getFullYear();
let day = date.getDate().toString().padStart(2, '0');
let month = date.getMonth().toString().padStart(2, '0');
let timezoneOffset = date.getTimezoneOffset();

let nextRequest = `https:\/\/hianime.to/ajax/schedule/list?tzOffset=${timezoneOffset}&date=${year}-${month}-${day}`;
let MainPageObject = new MainPage(new ModuleRequest(nextRequest, 'get', XHRequest, null), emptyExtra, new JavascriptConfig(true, false, ''), output);
var finalJson = JSON.stringify(MainPageObject);
savedData.innerHTML = finalJson;