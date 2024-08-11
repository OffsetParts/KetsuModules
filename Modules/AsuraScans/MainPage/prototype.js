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

function Output(cellDesing, orientation, defaultLayout, paging, section, layout, data) {
	this.cellDesing = cellDesing;
	this.orientation = orientation;
	this.defaultLayout = defaultLayout;
	this.paging = paging;
	this.section = section;
	this.layout = layout;
	this.data = data;
}

function Section(sectionName, separator) {
	this.sectionName = sectionName;
	this.separator = separator;
}

function Layout ( insets, visibleCellsWidthS, visibleCellsWidthM, visibleCellsWidthL, visibleCellsHeight, heightForVisibleCells, cellSize, ratio, constant, horizontalSpacing, verticalSpacing ) {
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

function Insets ( top, bottom, left, right ) {
	this.top = top;
	this.bottom = bottom;
	this.left = left;
	this.right = right;
}

function Size ( width, height ) {
	this.width = width;
	this.height = height;
}

function Ratio ( inRelation, number1, number2 ) {
	this.inRelation = inRelation;
	this.number1 = number1;
	this.number2 = number2;
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

// Custom Layouts
let Poster = new Layout(
	new Insets(5, 5, 10, 10), // insets
	1, // visibleCellsWidthS
	2, // visibleCellsWidthM
	3, // visibleCellsWidthL
	1, // visibleCellsHeight
	375, // heightForVisibleCells
	new Size(413, 650), // cellSize 
	new Ratio(RatioRelation.height, 216, 340), // ratio 
	new Size(0, 0), // constant
	15, // horizontalSpacing
	15 // verticalSpacing
);

//Init
var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);

var emptyKeyValue = [new KeyValue('', '')];
var commands = [new Commands('helperFunction', [new KeyValue('isCustomRequest', 'true')])];
let emptyExtra = new Extra(commands, emptyKeyValue);

// Functions

/* function scaleImg(img) {
	return img.replaceAll('130x170', '530x650').replaceAll('-222x300', '');
} */

function cleanUrl(url) {
	return 'https://asuracomic.net/' + (url).trim();
}

function cleanText(str) {
	return str.replace(/[\\n\\t]/g, '').trim();
}

function quickRequest(url, clean) {
	if (clean == true) {
		return new ModuleRequest(cleanUrl(url), 'get', emptyKeyValue, null);
	} else if (clean == false || clean == null) {
		return new ModuleRequest(url, 'get', emptyKeyValue, null);
	}
}

async function wait(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function getElement(selector, ms, maxTries) {
    return new Promise((resolve, reject) => {
        let attempts = 0;

        const interval = setInterval(() => {
            const element = document.querySelector(selector);
            attempts++;

            if (element) {
                clearInterval(interval);
                resolve(element);
            } else if (attempts >= maxTries) {
                clearInterval(interval);
                reject(new Error(`Element with selector \"${selector}\" not found within ${maxTries} tries`));
            }
        }, ms);
    });
}


// Update: 7/25/2024
/* Asura changed their site so not all top lists load at once (weekly list defaulted)
Hence only weekly will be displayed for now with an addition of the featured section */


// Featured // nvm featured doesn't seem to work properly
(async () => {
try{
	var featuredParent = document.querySelector('.animated');
	let featuredElms = await getElement('.animated [class*=\"slide\"]', 500, 20);
	let Featured = Array.from(featuredParent.querySelectorAll('li')).map(list => { 
		let title = cleanText(list.querySelector('span a').textContent);
		var link = quickRequest(list.querySelector('span a').href, true);
		var image = quickRequest(list.querySelector('img').src);
		var rating = 'Rating : ' + cleanText(list.querySelector('[class=\"site-vote\"] > span').textContent);
		console.log(rating, title);

		return new Data(image, title, '1', '2', '3', '4', '5', false, link);
	});

	const weeklyElm = document.querySelectorAll('[id*=\"weekly\"] > div');
	let WeeklyList = Array.from(weeklyElm).map(list => {
		let title = cleanText(list.querySelector('span a').textContent);
		var link = quickRequest(list.querySelector('span a').href, true);
		var image = quickRequest(list.querySelector('img').src);
		/* var genres = Array.from(list.querySelector('span p').querySelectorAll('a')).map(g => cleanText(g.textContent)); just for testing
		var rating = 'Rating : ' + cleanText(list.querySelector('[class*=\"999\"]').textContent); */

		return new Data(image, title, '0', '1', '2', '3', '4', false, link);
	});

	// Popular
	const popularElm = document.querySelectorAll('div.hidden > [class*=\"p-1.5\"]');
	let Popular = Array.from(popularElm).map(list => {
		let title = cleanText(list.querySelector('span.block').textContent);
		var link = quickRequest(list.querySelector('a').href, true);
		var image = quickRequest(list.querySelector('img').src);
		
		/* var ep = list.querySelector('[class*=\"13px\"]').textContent;
		var rating = 'Rating : ' + cleanText(list.querySelector('[class*=\"12px\"]').textContent); */

		return new Data(image, title, '1', '2', '3', '4', '5', false, link);
	});

	// Latest Chapters
	const latestElms = document.querySelectorAll('[class*=\"w-full p-1\"]');
	let Latests = Array.from(latestElms).map(list => {
		let title = cleanText(list.querySelector('span').textContent);
		var link = quickRequest(list.querySelector('a').href, true);
		var image = quickRequest(list.querySelector('img').src);

		var ep = cleanText(list.querySelector('a span').textContent);
		// var udate = list.querySelector('p').textContent;

		return new Data(image, title, ep, '', '1', '2', '3', false, link);
	});

	let output = [];
	output.push(new Output(CellDesings.normal1, Orientation.horizontal, DefaultLayouts.none, Paging.leading, new Section('Featured', false), Poster, Featured));
	output.push(new Output(CellDesings.normal4, Orientation.horizontal, DefaultLayouts.longTripletsDouble, Paging.leading, new Section('Weekly', false), null, WeeklyList));
	output.push(new Output(CellDesings.normal4, Orientation.horizontal, DefaultLayouts.longTriplets, Paging.leading, new Section('Popular Today', true), null, Popular));
	output.push(new Output(CellDesings.wide9, Orientation.horizontal, DefaultLayouts.wideStrechedList, Paging.leading, new Section('Latest Chapters', true), null, Latests));


	let MainPageObject = new MainPage(new ModuleRequest('', 'get', emptyKeyValue, null), emptyExtra, new JavascriptConfig(true, false, ''), output);
	var finalJson = JSON.stringify(MainPageObject);
	savedData.innerHTML = finalJson;
} catch (e) {
	console.error(e);
}});
window.webkit.messageHandlers.EXECUTE_KETSU_ASYNC.postMessage('');