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

function cleanText(obj) {
    return obj.replace(/\n/g, '').replace(/\t/g, '').trim();
}

function createData(title, link, image, proxy) {
    const [ep, udate] = proxy.split('\n');
    return new Data(image, title, ep, '', '', '', '', false, link);
}


//Init
const savedData = document.getElementById('ketsu-final-data');
const parsedJson = JSON.parse(savedData.innerHTML);

const output = parsedJson.output;
const emptyKeyValue = [new KeyValue('', '')];
const commands = [new Commands('', emptyKeyValue)];
const emptyExtra = new Extra(commands, emptyKeyValue);

// Latest Chapters
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

console.log('Output submitted: 2');

const MainPageObject = new MainPage(new ModuleRequest('', 'get', emptyKeyValue), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(true, false, ''), output);
const finalJson = JSON.stringify(MainPageObject);
savedData.innerHTML = finalJson;
