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

//Init
let output = [];
var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);

var emptyKeyValue = [new KeyValue('', '')];
var commands = [new Commands('helperFunction', [new KeyValue('isCustomRequest', 'true')])];
let emptyExtra = new Extra(commands, emptyKeyValue);

let newRequest = new ModuleRequest(parsedJson.request.url, 'get', emptyKeyValue, null);

//Debug
console.log('newRequest: ' + newRequest);

//Do stuff
let request = new ModuleRequest(newRequest.url, newRequest.method, newRequest.headers, emptyExtra);


// Great of All Time
let GOATs = [];
goats = document.querySelectorAll('.serieslist.pop.wpop.wpop-alltime li');
for (list of goats) {
	let title = list.querySelector('h2').textContent.replace(' ', '');
	var link = list.querySelector('a').href; link = new ModuleRequest(link, 'get', emptyKeyValue, null);
	var image = list.querySelector('img').src.replaceAll('130x170', '330x450'); image = new ModuleRequest(image, 'get', emptyKeyValue, null);
	var ep = '';
	try {
		ep = list.querySelector('div.leftseries > span').textContent;
	} catch {}
	var rating = 'Rating: ' + list.querySelector('.numscore').textContent.replaceAll('\\n', '').replaceAll(' ', '');
	GOATs.push(new Data(image, title, ep, '', rating, '', '', false, link));
    console.log('GOATs: ' + title);
}

// Popular
let Popular = [];
pops = document.querySelectorAll('.hothome div.bs');
for (list of pops) {
	let title = list.querySelector('.tt').textContent.replaceAll('\\n', '');
	var link = list.querySelector('a').href; link = new ModuleRequest(link, 'get', emptyKeyValue, null);
	var image = list.querySelector('img').src; image = new ModuleRequest(image, 'get', emptyKeyValue, null);
	var ep = list.querySelector('.epxs').textContent;
	Popular.push(new Data(image, title, '', '', '', '', '', false, link));
    console.log('Popular: ' + title);
}

// Latest Chapters
let Latests = [];
LatestChapters = document.querySelectorAll('div.uta');
for (list of LatestChapters) {
	let title = list.querySelector('h4').textContent;
	var link = list.querySelector('a').href; link = new ModuleRequest(link, 'get', emptyKeyValue, null);
	var image = list.querySelector('img').src; image = new ModuleRequest(image, 'get', emptyKeyValue, null);
	var ep = '';
    var udate = '';
	try {
		ep = list.querySelector('ul li a').textContent;
        udate = list.querySelector('ul li span').textContent;
	} catch {}
	Latests.push(new Data(image, title, ep, udate, '', '', '', false, link));
    console.log('Latests: ' + title);
}

output.push(new Output(CellDesings.wide11, Orientation.horizontal, DefaultLayouts.wideFull, Paging.leading, new Section('GOATs', false), null, GOATs));
output.push(new Output(CellDesings.normal4, Orientation.horizontal, DefaultLayouts.tripletsFull, Paging.leading, new Section('Popular Today', true), null, Popular));
output.push(new Output(CellDesings.wide11, Orientation.horizontal, DefaultLayouts.wideStrechedList, Paging.leading, new Section('Latest Chapters', true), null, Latests));

console.log('Output submitted');

let MainPageObject = new MainPage(new ModuleRequest('https://asuratoon.com', 'get', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(true, false, ''), output);
var finalJson = JSON.stringify(MainPageObject);
savedData.innerHTML = finalJson;