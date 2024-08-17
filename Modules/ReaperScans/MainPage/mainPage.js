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

class Layout {
    constructor(insets, visibleCellsWidthS, visibleCellsWidthM, visibleCellsWidthL, visibleCellsHeight, heightForVisibleCells, cellSize, ratio, constant, horizontalSpacing, verticalSpacing) {
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
}

class Insets {
    constructor(top, bottom, left, right) {
        this.top = top;
        this.bottom = bottom;
        this.left = left;
        this.right = right;
    }
}

class Size {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}

class Ratio {
    constructor(inRelation, number1, number2) {
        this.inRelation = inRelation;
        this.number1 = number1;
        this.number2 = number2;
    }
}

const RatioRelation = {
    width: 'width',
    height: 'height'
};

class MainPage {
    constructor(request, extra, javascriptConfig, output) {
        this.request = request;
        this.extra = extra;
        this.javascriptConfig = javascriptConfig;
        this.output = output;
    }
}

class ModuleRequest {
    constructor(url, method, headers, httpBody) {
        this.url = url;
        this.method = method;
        this.headers = headers;
        this.httpBody = httpBody;
    }
}

class Extra {
    constructor(commands, extraInfo) {
        this.commands = commands;
        this.extraInfo = extraInfo;
    }
}

class Commands {
    constructor(commandName, params) {
        this.commandName = commandName;
        this.params = params;
    }
}

class JavascriptConfig {
    constructor(removeJavascript, loadInWebView, javaScript) {
        this.removeJavascript = removeJavascript;
        this.loadInWebView = loadInWebView;
        this.javaScript = javaScript;
    }
}

class KeyValue {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}

class Section {
    constructor(sectionName, separator) {
        this.sectionName = sectionName;
        this.separator = separator;
    }
}

class Data {
    constructor(image, title, description, field1, field2, field3, field4, isChapter, link, openInWebView) {
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
}

class Output {
    constructor(cellDesing, orientation, defaultLayout, paging, section, layout, data) {
        this.cellDesing = cellDesing;
        this.orientation = orientation;
        this.defaultLayout = defaultLayout;
        this.paging = paging;
        this.section = section;
        this.layout = layout;
        this.data = data;
    }
}

//Init
let output = [];
const savedData = document.getElementById('ketsu-final-data');
const parsedJson = JSON.parse(savedData.innerHTML); console.log(parsedJson.output.url);

const emptyKeyValue = [new KeyValue('', '')];
const commands = [new Commands('helperFunction', [new KeyValue('isCustomRequest', 'true')])];
const emptyExtra = new Extra(commands, emptyKeyValue);

// Custom Layouts
const Carousel = new Layout(
    new Insets(5, 5, 5, 5), // insets
    1, // visibleCellsWidthS
    2, // visibleCellsWidthM
    3, // visibleCellsWidthL
    1, // visibleCellsHeight
    500, // heightForVisibleCells
    new Size(200, 200), // cellSize 
    new Ratio(RatioRelation.width, 315, 590), // ratio 
    new Size(0, 0), // constant
    5, // horizontalSpacing
    5 // verticalSpacing
);

function cleanUrl(path) {
	return 'https://reaperscans.com/' + (path).trim();
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
// Elements
const PosterElms = document.querySelectorAll('[class*=main-embla__slide]');
let Posters = Array.from(PosterElms).map(list => {
	var link = quickRequest(list.querySelector('a').href, true);
	var image = quickRequest(list.querySelector('img').src);

	return new Data(image, '', '0', '1', '2', '3', '4', false, link);
});

const FeaturedElms = document.querySelectorAll('embla > [class*=embla__slide]');
let Featured = Array.from(FeaturedElms).map(list => {
    var title = cleanText(list.querySelector('h5').textContent);
	var link = quickRequest(list.querySelector('a').href, true);
	var image = quickRequest(list.querySelector('img').src);

	return new Data(image, title, '0', '1', '2', '3', '4', false, link);
});

const LatestElms = document.querySelector('div.col-span-full').querySelectorAll('[role=group]');
let Latest = Array.from(LatestElms).map(list => {
    var title = cleanText(list.querySelector('h5').textContent);
	var link = quickRequest(list.querySelector('a').href, true);
	var image = quickRequest(list.querySelector('img').src);

	return new Data(image, title, '0', '1', '2', '3', '4', false, link);
});


output.push(new Output(CellDesings.normal4, Orientation.horizontal, DefaultLayouts.none, Paging.leading, new Section('', false), Carousel, Posters));
output.push(new Output(CellDesings.normal4, Orientation.horizontal, DefaultLayouts.longTripletsFull, Paging.leading, new Section('Popular Today', true), null, Featured));

console.log('Output submitted');

const MainPageObject = new MainPage(
    new ModuleRequest('s', 'get', emptyKeyValue, null),
    new Extra([new Commands('', emptyKeyValue)], emptyKeyValue),
    new JavascriptConfig(true, false, ''),
    output
);

const finalJson = JSON.stringify(MainPageObject);
savedData.innerHTML = finalJson;