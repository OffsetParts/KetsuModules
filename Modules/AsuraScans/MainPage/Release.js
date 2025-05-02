// Style
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
let output = [];
var id = 'ketsu-final-data';
document.body.querySelectorAll('#' + id).forEach((el) => (el.remove()));
let ketsu = document.createElement('div');
ketsu.setAttribute('id', id);
document.body.prepend(ketsu);

var emptyKeyValue = [new KeyValue('', '')];
var commands = [new Commands('helperFunctions', [new KeyValue('isCustomRequest', 'true')])];
let emptyExtra = new Extra(commands, emptyKeyValue);

// Functions
function cleanUrl(url) {
	return 'https://asuracomic.net' + (url).trim();
}

function cleanText(str) {
	return str?.replace(/[\\n\\t]/g, '').trim() ?? '';
}

function quickRequest(url, clean) {
	if (clean == true) {
		return new ModuleRequest(cleanUrl(url), 'get', emptyKeyValue, null);
	} else if (clean == false || clean == null) {
		return new ModuleRequest(cleanText(url), 'get', emptyKeyValue, null);
	}
}

function scriptFilter(match) {
	let refinedData = '';
    document.querySelectorAll('script').forEach((elm) => {
        let content = elm.textContent;
        if (content.match('self.__next_f.push') && content.includes(match)) {
            let match = content.match(/self\\.__next_f\\.push\\(\\[(\\d+),\\s*\"(.*?)\"\\]\\)/u); if (match) {
                refinedData = JSON.parse(match[2]
                .replace(/[a-zA-Z0-9]+:/g, '')              // Remove any alphanumeric prefix followed by a colon
                .replace(/\\\\r\\\\n/g, '\\n')          // Replace escaped newlines
                .replace(/\\\\\"/g, '\"')              // Unescape quotation marks
                .replace(/\\\\\\\\/g, '\\\\')            // Handle any other escape sequences
                .replace(/\\\\n$/, '')
			);
		}}
    });
    return refinedData
}

function dynamicCiteriaSearch(obj, criteria) {
	let results = [];

	function recursiveSearch(obj) {
		if (Array.isArray(obj)) {
			obj.forEach(item => {
				if (typeof item === 'object' && item !== null) {
					let matches = Object.keys(criteria).every(key => {
						const expectedType = criteria[key].type;
						const valueType = typeof item[key];

						// Check if key exists and type matches
						if (expectedType && valueType === expectedType) {
							const expectedValue = criteria[key].value;
							// If a specific value is provided, check it
							if (expectedValue !== undefined) {
								// Handle specific value checks based on type
								if (valueType === 'string' && expectedValue instanceof RegExp) {
									// Use regex for string matching
									return expectedValue.test(item[key]);
								} else if (valueType === 'number' && typeof expectedValue === 'function') {
									// Use a function for number matching (e.g., range check)
									return expectedValue(item[key]);
								} else {
									return item[key] === expectedValue;
								}
							}
							return true; // No specific value check, just type match
						}
						return false;
					});

					if (matches) {
						results.push(item); // Push the matched object, not the parent array
					}
				}
			});
		}

		// Continue searching nested objects
		if (typeof obj === 'object' && obj !== null) {
			for (let key in obj) {
				recursiveSearch(obj[key]);
			}
		}
	}

	recursiveSearch(obj);
	return results;
}

function findProperties(obj, keysToFind) {
	let results = [];

	function recursiveSearch(obj) {
		if (typeof obj === 'object' && obj !== null) {
			// Check if all keysToFind exist in the current object
			let foundKeys = keysToFind.every(key => key in obj); if (foundKeys) {
				// Push the entire object containing all keysToFind
				results.push(obj);
			}

			// Continue searching nested objects
			for (let key in obj) {
				recursiveSearch(obj[key]);
			}
		}
	}

	recursiveSearch(obj);
	return results;
}

/*
UPDATE: 8/17/2024 @ 4:03 AM
After some extensive testing, I have found a new methodology towards grabbing info for grabbing hydrazied data on numerous sites
which I'll call Dynamic Criteria Search (DCS). This method is a more advanced version of nested arraies */


/* {{ Dynamic Elements }} */

let goatCriteria = { 'value': { type: 'string', value: 'all' } };
const goatData = dynamicCiteriaSearch(scriptFilter('{\\\\\"value\\\\\":\\\\\"all\\\\\"'), goatCriteria); if (goatData) {
	let GOAT = Array.from(goatData[0]['children']).map(list => {
		const info = findProperties(list, ['href', 'children'])[1];
		let title = info.children;
		let url = quickRequest(info.href, true);
		let image = quickRequest('https:' + findProperties(list, ['src'])[0].src);
		return new Data(image, title, '0', '', '', '3', '4', false, url);
  	});

  	output.push(new Output(CellDesings.normal1, Orientation.horizontal, DefaultLayouts.none, Paging.leading, new Section('', false), Poster, GOAT));
}

let monthlyCriteria = { 'value': { type: 'string', value: 'monthly' } };
const monthlyData = dynamicCiteriaSearch(scriptFilter('{\\\\\"value\\\\\":\\\\\"monthly\\\\\"'), monthlyCriteria); if (monthlyData) {
  	let MonthlyList = Array.from(monthlyData[0]['children']).map(list => {
		const info = findProperties(list, ['href', 'children'])[1];
		let title = info.children;
		let url = quickRequest(info.href, true);
		let image = quickRequest('https:' + findProperties(list, ['src'])[0].src);
		/* const misc = findProperties(list, ['children',  'className'])[21];
		let rating = misc.children; */
		return new Data(image, title, '0', '1', '2', '3', '4', false, url);
  	});

  	output.push(new Output(CellDesings.normal4, Orientation.horizontal, DefaultLayouts.longDoubletsFull, Paging.leading, new Section('Monthly', false), null, MonthlyList));
}

/* {{ Static Elements }} */

let FeaturedElm = document.querySelectorAll('.slide');
let Featured = Array.from(FeaturedElm).map(list => {
	let title = cleanText(list.querySelector('a').textContent);
	var link = quickRequest(list.querySelector('a').href, true);
	var image = quickRequest(list.querySelector('img').src);

	return new Data(image, title, '0', '', '', '3', '4', false, link);
});

// Weekly
const weeklyElm = document.querySelectorAll('[id*=\"weekly\"] > div');
let WeeklyList = Array.from(weeklyElm).map(list => {
	let title = cleanText(list.querySelector('span a').textContent);
	var link = quickRequest(list.querySelector('span a').href, true);
	var image = quickRequest(list.querySelector('img').src);
	/* var genres = Array.from(list.querySelector('span p').querySelectorAll('a')).map(g => cleanText(g.textContent)); just for testing
	var rating = 'Rating : ' + cleanText(list.querySelector('[class*=\"999\"]').textContent); */

	return new Data(image, title, '0', '1', '2', '3', '4', false, link);
});

// Featured
const FeaturedElms = document.querySelectorAll('.slide');
let = Featured = Array.from(FeaturedElms).map(list => {
	let title = cleanText(list.querySelector('a').textContent);
	var link = quickRequest(list.querySelector('a').href, true);
	var image = quickRequest(list.querySelector('img').src);

	return new Data(image, title, '0', '', '', '3', '4', false, link);
});


// Popular Today
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
const latestElm = document.querySelectorAll('[class*=\"w-full p-1\"]');
let Latests = Array.from(latestElm).map(list => {
	let title = cleanText(list.querySelector('span').textContent);
	var link = quickRequest(list.querySelector('a').href, true);
	var image = quickRequest(list.querySelector('img').src);

	var ep = cleanText(list.querySelector('a span').textContent);
	// var udate = list.querySelector('p').textContent;

	return new Data(image, title, ep, '', '1', '2', '3', false, link);
});

output.push(new Output(CellDesings.normal1, Orientation.horizontal, DefaultLayouts.none, Paging.leading, new Section('Featured', false), Poster, Featured));
output.push(new Output(CellDesings.normal4, Orientation.horizontal, DefaultLayouts.longTripletsDouble, Paging.leading, new Section('Weekly', false), null, WeeklyList));
output.push(new Output(CellDesings.normal1, Orientation.horizontal, DefaultLayouts.none, Paging.leading, new Section('Featured', false), Poster, Featured));
output.push(new Output(CellDesings.normal4, Orientation.horizontal, DefaultLayouts.longTriplets, Paging.leading, new Section('Popular Today', true), null, Popular));
output.push(new Output(CellDesings.wide9, Orientation.horizontal, DefaultLayouts.wideStrechedList, Paging.leading, new Section('Latest Chapters', true), null, Latests));

let MainPageObject = new MainPage(new ModuleRequest('', 'get', emptyKeyValue, null), emptyExtra, new JavascriptConfig(false, true, ''), output);
var finalJson = JSON.stringify(MainPageObject);
ketsu.innerHTML = finalJson;
window.webkit.messageHandlers.EXECUTE_KETSU_ASYNC.postMessage('');