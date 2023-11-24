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

function Section ( sectionName, separator ) {
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

// Functions

function MainPage ( request, extra, javascriptConfig, output ) {
	this.request = request;
	this.extra = extra;
	this.javascriptConfig = javascriptConfig;
	this.output = output;
}

function ModuleRequest ( url, method, headers, httpBody ) {
	this.url = url;
	this.method = method;
	this.headers = headers;
	this.httpBody = httpBody;
}

function Extra ( commands, extraInfo ) {
	this.commands = commands;
	this.extraInfo = extraInfo;
}

function Commands ( commandName, params ) {
	this.commandName = commandName;
	this.params = params;
}

function JavascriptConfig(removeJavascript, loadInWebView, javaScript) {
	this.removeJavascript = removeJavascript;
	this.loadInWebView = loadInWebView;
	this.javaScript = javaScript;
}

function KeyValue ( key, value ) {
	this.key = key;
	this.value = value;
}

function Data ( image, title, description, field1, field2, field3, field4, isChapter, link, openInWebView ) {
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

function Output ( cellDesing, orientation, defaultLayout, paging, section, layout, data ) {
	this.cellDesing = cellDesing;
	this.orientation = orientation;
	this.defaultLayout = defaultLayout;
	this.paging = paging;
	this.section = section;
	this.layout = layout;
	this.data = data;
}


let output = [];
var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);

var commands = [new Commands('helperFunction', [new KeyValue('isCustomRequest', 'true')])];
var emptyKeyValue = [new KeyValue('', '')];
var emptyExtra = new Extra(commands, emptyKeyValue);

// Custom Layouts
let Carousel = new Layout(
	new Insets(5, 5, 0, 0), // insets
	1, // visibleCellsWidthS
	2, // visibleCellsWidthM
	3, // visibleCellsWidthL
	135, // visibleCellsHeight
	145, // heightForVisibleCells
	new Insets(200, 0, 0, 150), // cellSize 
	new Ratio(RatioRelation.width, 118, 45), // ratio 
	new Size(354, 145), // constant
	2, // horizontalSpacing
	2 // verticalSpacing
);

// Top
let GOATs = [];
goats = document.querySelector('.swiper-wrapper').querySelectorAll('.swiper-slide');
for (list of goats) {
	var link = list.querySelector('a').href; link = new ModuleRequest(link, 'get', emptyKeyValue);
	var image = list.querySelector('img').src; image = new ModuleRequest(image, 'get', emptyKeyValue);

	var title = list.querySelector('.tt').textContent.replaceAll('\\n','').replaceAll('\\t', '');
	var rating = list.querySelector('.numscore').textContent;
	var status = list.querySelector('.status').textContent.replaceAll('\\n','').replaceAll('\\t', '').trim();


	GOATs.push(new Data(image, '', '', title, status, '', '', false, link));
}

// Popular
let Popular = [];
pops = document.querySelectorAll('.pop-list-desktop')[0].querySelectorAll('div.bs');
for (list of pops) {
	let title = list.querySelector('.tt') != null ? list.querySelector('.tt').textContent.replaceAll('\\n','').replaceAll('\\t', '') : '';
	var link = list.querySelector('a') != null ? list.querySelector('a').href : ''; link = new ModuleRequest(link, 'get', emptyKeyValue);
	var image = list.querySelector('img') != null ? list.querySelector('img').src : ''; image = new ModuleRequest(image, 'get', emptyKeyValue);

	Popular.push(new Data(image, title, '', '', '', '', '', false, link));
}

let StaffPick = [];
staffs = document.querySelectorAll('.pop-list-desktop')[1].querySelectorAll('div.bs');
for (list of staffs) {
	let title = list.querySelector('.tt') != null ? list.querySelector('.tt').textContent.replaceAll('\\n','').replaceAll('\\t', '') : '';
	var link = list.querySelector('a') != null ? list.querySelector('a').href : ''; link = new ModuleRequest(link, 'get', emptyKeyValue);
	var image = list.querySelector('img') != null ? list.querySelector('img').src : ''; image = new ModuleRequest(image, 'get', emptyKeyValue);

	StaffPick.push(new Data(image, title, '', '', '', '', '', false, link));
}

// Latest Chapters
let Latests = [];
LatestChapters = document.querySelectorAll('.latest-updates div.bs');
for (list of LatestChapters) {
	let title = list.querySelector('.tt').textContent.replaceAll('\\n','').replaceAll('\\t', '');
	var link = list.querySelector('a').href; link = new ModuleRequest(link, 'get', emptyKeyValue);
	var image = list.querySelector('img').src; image = new ModuleRequest(image, 'get', emptyKeyValue);
	
	var ep = list.querySelector('.epxs').textContent.replaceAll('\\n','').replaceAll('\\t', '');
    var udate = list.querySelector('.epxdate').textContent.replaceAll('\\n','').replaceAll('\\t', '');
	Latests.push(new Data(image, title, ep, '', '', '', '', false, link));
}

output.push(new Output(CellDesings.Special3, Orientation.horizontal, DefaultLayouts.none, Paging.leading, new Section('', false), null, GOATs));
output.push(new Output(CellDesings.wide8, Orientation.horizontal, DefaultLayouts.longTriplets, Paging.leading, new Section('Popular Today', true), null, Popular));
output.push(new Output(CellDesings.normal4, Orientation.horizontal, DefaultLayouts.longTriplets, Paging.leading, new Section('Staff Picks', true), null, StaffPick));
output.push(new Output(CellDesings.wide8, Orientation.horizontal, DefaultLayouts.wideStrechedDouble, Paging.leading, new Section('Latest Chapters', true), null, Latests));

let MainPageObject = new MainPage(new ModuleRequest('', 'get', emptyKeyValue), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(true, false, ''), output);
var finalJson = JSON.stringify(MainPageObject);
savedData.innerHTML = finalJson;