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

const RatioRelation = {
    width: 'width',
    height: 'height'
};

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

function Output(cellDesing, orientation, defaultLayout, paging, section, layout, data) {
    this.cellDesing = cellDesing;
    this.orientation = orientation;
    this.defaultLayout = defaultLayout;
    this.paging = paging;
    this.section = section;
    this.layout = layout;
    this.data = data;
}

function createData(image, title, description, field1, field2, field3, field4, isChapter, link, openInWebView) {
    return new Data(image, title, description, field1, field2, field3, field4, isChapter, link, openInWebView);
}

function createModuleRequest(url) {
    return new ModuleRequest(url, 'get', emptyKeyValue);
}

function cleanText(obj) {
    return obj.replaceAll('\\n', '').replaceAll('\\t', '').trim();
}

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

//Init
let output = [];
var commands = [new Commands('helperFunction', [new KeyValue('isCustomRequest', 'true')])];
var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);

var emptyKeyValue = [new KeyValue('', '')];
let emptyExtra = new Extra(commands, emptyKeyValue);

function finalizeAndDisplayData(mainObject) {
    var finalJson = JSON.stringify(mainObject);
    savedData.innerHTML = finalJson;
    console.log('Final JSON submitted:', finalJson);
}

function continueProcessing(nextURL, delay = 0) {
    return new Promise(resolve => {
        setTimeout(() => {
            var mainPageObject;

            if (nextURL) {
                // Create a new mainPageObject with the next URL
                mainPageObject = new MainPage(
                    new ModuleRequest(nextURL, 'get', emptyKeyValue, null),
                    emptyExtra,
                    new JavascriptConfig(true, false, ''),
                    output
                );

                // Log a message indicating the new request is submitted
                console.log('New request submitted for:', nextURL);
            } else {
                console.log('No more requests to make.');
                finalizeAndDisplayData(mainPageObject);
            }

            resolve(); // Resolve the promise after processing
        }, delay);
    });
}

function scrapeComicsPage() {
    const latestChapters = document.querySelectorAll('.grid .relative');
    const Latests = Array.from(latestChapters).map((list) => {
        const [title, link, image, proxy] = [
            cleanText(list.querySelector('.flex-1 a').textContent),
            createModuleRequest(list.querySelector('a').href),
            createModuleRequest(list.querySelector('img').src),
            list.querySelector('div .flex.mt-2 a').outerText
        ];

        return createData(title, proxy, link, image);
    });

    output.push(new Output(CellDesings.wide9, Orientation.horizontal, DefaultLayouts.wideStrechedList, Paging.leading, new Section('Latest Chapters', true), null, Latests));
}

async function startProcessing() {
    // Greatests of All Time
    const headers = document.querySelectorAll('div .carousel-cell');
    const Banners = Array.from(headers).map((list) => {
        const link = createModuleRequest(list.querySelector('a').href);
        const image = createModuleRequest(list.querySelector('img').src);
        return createData(image, '', '', '', '', '', '', false, link);
    });

    // Popular
    const pops = document.querySelectorAll('[role=\"list\"] li');
    const Popular = Array.from(pops).slice(0, 3).map((list) => {
        const [title, link, image] = [
            cleanText(list.querySelectorAll('.flex-1 a')[1].textContent),
            createModuleRequest(list.querySelector('a').href),
            createModuleRequest(list.querySelector('img').src)
        ];
        return createData(image, title, '', '', '', '', '', false, link);
    });

    output.push(new Output(CellDesings.normal4, Orientation.horizontal, DefaultLayouts.none, Paging.leading, new Section('', false), Carousel, Banners));
    output.push(new Output(CellDesings.normal4, Orientation.horizontal, DefaultLayouts.longTripletsFull, Paging.leading, new Section('Popular Today', true), null, Popular));

    await continueProcessing('https://reaperscans.com/latest/comics', 5000);

    scrapeComicsPage();

    await continueProcessing(null);
}

startProcessing();

window.webkit.messageHandlers.EXECUTE_KETSU_ASYNC.postMessage('');