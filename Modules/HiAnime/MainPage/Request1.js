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
let emptyKeyValue = [new KeyValue('', '')];
let XHRequest = [new KeyValue('X-Requested-With', 'XMLHttpRequest')];
var commands = [new Commands('helperFunction', [new KeyValue('isCustomRequest', 'true')])];
let emptyExtra = new Extra(commands, emptyKeyValue);

var initialText = parsedJson.extra.extraInfo[0].value;
const dummyRequest = new ModuleRequest('', 'get', emptyKeyValue, null);

// If outdated run the zoro version
const ZoroReplacement = new ModuleRequest('ketsuapp://?moduleData=https://raw.githubusercontent.com/Bilnaa/beta-ketsu/main/zoro.json', 'get', emptyKeyValue, null);
const infoText = new Data(dummyRequest, `Subs are only available on newer versions of Ketsu, and the RapidCloud resolver won't work if you have the App Store version.\nClick on this message if you are using the App Store version of KETSU and not getting subtitles. If you do so don't forget to refresh this page.`, '', '', '', '', '', false, ZoroReplacement, false);

let Output = [];

// Functions

function createLayout(insets, size, ratio) {
    return new Layout(insets, 1, 1, 1, 1, 0, size, ratio, new Size(0, 0), 0, 0);
}

function cleanText(str) {
    return str.replace(/[\\n\\t]/g, '');
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
var Spotlight = Array.from(topSlider).map(slide => {
    var title = slide.querySelector('div.desi-head-title').textContent;
    var image = quickRequest(slide.querySelector('img').src);
    let link  = quickRequest(slide.querySelector('div.desi-buttons a').href, true);

    // var info = cleanText(slide.querySelector('div.desi-description').textContent);
    // var type = cleanText(slide.querySelector('div.sc-detail > div:nth-child(1)').textContent);
    var airing = 'First Aired: ' + slide.querySelector('div.sc-detail > div:nth-child(3)').textContent;
    Spotlight.push(new Data(image, title + ' - ' + type, info, airing, '', '', '', false, link, false));
})

var bestAiring = document.querySelectorAll('div.anif-block-01 li');
var TopAiring = bestAiring.map(list => {
    try {
        var title = list.querySelector('h3').textContent;
        var image = quickRequest(list.querySelector('img').src);
        let link = quickRequest(list.querySelector('a').href, true);
        var episode = list.querySelector('div.tick-sub').textContent;

        return new Data(image, title, '', episode, '', '', '', false, link, false);
    } catch (error) {
        console.log(error);
    }
});

var popularArray = document.querySelectorAll('div.anif-block-03 li');
var Popular = popularArray.map(list => {
    try {
        var ticks = Array.from(list.querySelectorAll('div.tick-item'));
        var title = list.querySelector('h3').textContent;
        var image = quickRequest(list.querySelector('img').src);
        let link = quickRequest(list.querySelector('a').href, true);
        var total = list.querySelector('div.tick-eps').textContent;
        var subisode = list.querySelector('div.tick-sub').textContent;
        var dubisode = list.querySelector('div.tick-dub').textContent;

        var eps = total && subisode ? `${cleanText(subisode)}/${cleanText(total)}`
            : subisode && dubisode ? `${cleanText(subisode)}/${cleanText(dubisode)}`
            : subisode ? `${cleanText(subisode)}`
            : dubisode ? `${cleanText(dubisode)}`
            : '';

		var [tickSub, tickDub] = ticks;
        var language = ticks.length > 1 && tickSub.classList.contains('tick-sub') && tickDub.classList.contains('tick-dub') ? 'SUB/DUB'
            : tickSub.classList.contains('tick-sub') ? 'SUB'
            : tickDub.classList.contains('tick-dub') ? 'DUB'
            : '';

        return new Data(image, title, '', eps, language, '', '', false, link, false);
    } catch (error) {
        console.log(error);
    }
});


var newArray = Array.from(document.querySelectorAll('div.block_area_home') || []);
var filteredArray = newArray.filter((e) => e.querySelector('.cat-heading').innerText.includes('New')).pop()?.querySelectorAll('.flw-item') || [];

var NewAnimes = filteredArray.map(list => {
    try {
        var ticks = Array.from(list.querySelectorAll('.tick.ltr div.tick-item'));
        var title = list.querySelector('img').alt;
        const link = quickRequest(cleanUrl(list.querySelector('a').href), true);
        var image = quickRequest(list.querySelector('img').src);
        var total = list.querySelector('div.tick-eps').textContent;
        var subisode = list.querySelector('div.tick-sub').textContent;
        var dubisode = list.querySelector('div.tick-dub').textContent;

        var eps = total ? `${cleanText(subisode)}/${cleanText(total)}`
            : dubisode && subisode ? `${cleanText(subisode)}/${cleanText(dubisode)}`
            : subisode ? `${cleanText(subisode)}` : dubisode ? `${cleanText(dubisode)}` : '';

		var [tickSub, tickDub] = ticks;
        var language = ticks.length > 1 && tickSub.classList.contains('tick-sub') && tickDub.classList.contains('tick-dub') ? 'SUB/DUB'
            : tickSub.classList.contains('tick-sub') ? 'SUB'
            : tickDub.classList.contains('tick-dub') ? 'DUB'
            : '';

        return new Data(image, title, '', eps, language, '', '', false, link);
    } catch (error) {
        console.log(error);
    }
});

let weeklyArray = Array.from(document.querySelectorAll('#top-viewed-week > ul > li'));
let Weekly = weeklyArray.map(list => {
	var title = list.querySelector('img').alt;
	const link = quickRequest(list.querySelector('a').href, true);
	var image = quickRequest(list.querySelector('img').src);

	return new Data(image, title, '', '', '', '', '', false, link);
});

let layout = createLayout(new Insets(0, 0, 0, 0), new Size(400, 105), new Ratio('width', 6, 10));
let layout1 = createLayout(new Insets(0, 0, 10, 10), new Size(400, 105), new Ratio('width', 6, 10));

output.push(new Output(CellDesings.Special3, Orientation.horizontal, DefaultLayouts.wideStrechedFull, Paging.leading, new Section('', true), layout, sliderArray));

output.push(new Output(CellDesings.Special1, Orientation.horizontal, DefaultLayouts.triplets, Paging.none, new Section('Top Airing : ', true), null, TopAiring));
output.push(new Output(CellDesings.normal1, Orientation.horizontal, DefaultLayouts.longTripletsDouble, Paging.leading, new Section('Last Episodes: ', true), null, LastEpisodes));
output.push(new Output(CellDesings.wide6, Orientation.horizontal, DefaultLayouts.longDoubletsFull, Paging.none, new Section('New On Aniwatch', true), null, NewAnimes));
output.push(new Output(CellDesings.normal2, Orientation.horizontal, DefaultLayouts.longTripletsDouble, Paging.none, new Section('Most Viewed Animes', true), null, MostViewed));

let date = new Date();
let year = date.getFullYear();
let day = date.getDate().toString().padStart(2, '0');
let month = (date.getMonth() + 1).toString().padStart(2, '0');
let timezoneOffset = date.getTimezoneOffset();

let nextRequest = `https://hianime.to/ajax/schedule/list?tzOffset=${timezoneOffset}&date=${year}-${month}-${day}`;
let MainPageObject = new MainPage(new ModuleRequest(nextRequest, 'get', XHRequest, null), new Extra([ new Commands('', emptyKeyValue) ], emptyKeyValue), new JavascriptConfig(true, false, ''), output);
var finalJson = JSON.stringify(MainPageObject);
savedData.innerHTML = finalJson;