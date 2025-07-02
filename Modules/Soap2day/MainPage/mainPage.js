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


let output = [];
var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);

var extraInfo = [new KeyValue('count', '0')];
let emptyKeyValue = [new KeyValue('', '')];

let mainEntries = [
    "Movies",
    "TV Shows"
]

let genres = [
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Kids",
    "Music",
    "Musical",
    "Mystery",
    "Reality",
    "Romance",
    "Sci-Fi",
    "Sport",
    "Thriller",
    "War",
    "Western"
]

let bestEntries = [
    "Best 2025",
    "Best 2022 TV shows",
    "Best 2023 TV shows",
    "Best 2024 TV shows",
    "Best 2025 TV shows",
    "Best TV mini-series",
    "Best Netflix Series",
    "Best Reality-Shows",
    "Best Movies",
    "Best 2024",
    "Best 2023",
    "Best 2022",
    "Best 2021",
    "Best 2020",
    "Best 2019",
    "Best 2018",
    "Best 2017",
    "Best 2016",
    "Best Action 2021",
    "Best Action 2023",
    "Best Animated 2017",
    "Best Animated 2019",
    "Best Animated 2023",
    "Best Adventure 2021",
    "Best Adventure 2023",
    "Best Biography 2022",
    "Best Biography 2023",
    "Best Comedy 2017",
    "Best Comedy 2022",
    "Best Comedy 2023",
    "Best Crime 2021",
    "Best Crime 2022",
    "Best Crime 2023",
    "Best Documentary 2021",
    "Best Documentaries 2022",
    "Best Documentaries 2023",
    "Best Drama 2019",
    "Best Drama 2021",
    "Best Drama 2023",
    "Best Family 2021",
    "Best Family 2023",
    "Best Fantasy & Sci-fi 2021",
    "Best Fantasy & Sci-fi 2023",
    "Best History 2021",
    "Best History 2022",
    "Best History 2023",
    "Best History 2023",
    "Best Horror 2023",
    "Best Musical 2022",
    "Best Mystery 2021",
    "Best Mystery 2022",
    "Best Mystery 2023",
    "Best Romantic 2021",
    "Best Romantic 2022",
    "Best Romantic 2023",
    "Best Thriller 2021",
    "Best Thriller 2022",
    "Best 2010s Body Horror",
    "Best War 2021",
    "Best War 2022",
    "Best War 2023",
    "Best Anime Movies",
    "Best Chick Flick",
    "Best Disney Princess",
    "Best Existential",
    "Best German",
    "Best Franchise",
    "Best Japanese",
    "Best Loners",
    "Best Netflix Movies",
    "Best Songs from Movies"
]

let subEntries = [
    "2025",
    "Best 2024",
    "Trending Movies",
    "Top Most Popular Movies",
    "Oscar",
    "Golden Globe",
    "Box Office in All Times",
    "TV Shows",
    "Top Most Popular TVs",
    "Trending TV Shows",
    "Best 2022 TV shows",
    "Best 2023 TV shows",
    "Best TV mini-series",
    "Best Netflix Series",
    "Best Reality-Shows",
    "Top 250 Movies",
    "Top 250 TVs",
    "Best 2016",
    "Best 2017",
    "Best 2018",
    "Best 2019",
    "Best 2020",
    "Best 2021",
    "Best 2022",
    "Best 2023",
    "Best Action 2021",
    "Best Action 2023",
    "Best Animated 2017",
    "Best Animated 2019",
    "Best Animated 2023",
    "Best Adventure 2021",
    "Best Adventure 2023",
    "Best Biography 2022",
    "Best Biography 2023",
    "Best Comedy 2017",
    "Best Comedy 2022",
    "Best Comedy 2023",
    "Best Crime 2021",
    "Best Crime 2022",
    "Best Crime 2023",
    "Best Documentary 2021",
    "Best Documentaries 2022",
    "Best Documentaries 2023",
    "Best Drama 2019",
    "Best Drama 2021",
    "Best Drama 2023",
    "Best Family 2021",
    "Best Family 2023",
    "Best Fantasy & Sci-fi 2021",
    "Best Fantasy & Sci-fi 2023",
    "Best History 2021",
    "Best History 2022",
    "Best History 2023",
    "Best History 2023",
    "Best Horror 2023",
    "Best Musical 2022",
    "Best Mystery 2021",
    "Best Mystery 2022",
    "Best Mystery 2023",
    "Best Romantic 2021",
    "Best Romantic 2022",
    "Best Romantic 2023",
    "Best Thriller 2021",
    "Best Thriller 2022",
    "Best 2010s Body Horror",
    "Best War 2021",
    "Best War 2022",
    "Best War 2023",
    "2024 Highest Grossing",
    "2023 Highest Grossing",
    "2022 Highest Grossing",
    "Animated for Kids",
    "Artificial Intelligence",
    "Action Comedies",
    "Batman",
    "Best Anime Movies",
    "Best Chick Flick",
    "Best Disney Princess",
    "Best Existential",
    "Best German",
    "Best Franchise",
    "Best Japanese",
    "Best Loners",
    "Best Netflix Movies",
    "Best Songs from Movies",
    "DC Comics",
    "Feminist",
    "Fast and Furious",
    "Gay",
    "Good Cop/Bad Cop",
    "Greatest Remakes",
    "James Bond",
    "Mardi Gras",
    "Marvel",
    "Most Inspirational",
    "Most Rewatchable",
    "Palme d’Or winners",
    "Funniest 2010s Horror",
    "Harry Potter",
    "Martin Luther King",
    "Oldest Profession Movies",
    "Oscar 2019",
    "Oscar 2020",
    "Oscar 2021",
    "Oscar 2024",
    "Pixar",
    "Racism and Movies",
    "Saw Movies",
    "Space",
    "Spider-Man",
    "Superman"
]

function getEntries(count) {
    // Combine all entries into one array
    let allEntries = [...genres, ...subEntries, ...mainEntries];
    
    // Shuffle the array
    let shuffled = allEntries.sort(() => 0.5 - Math.random());
    
    // Select the first 'count' unique entries
    let uniqueEntries = [...new Set(shuffled)].slice(0, count);
    
    return uniqueEntries;
}

function getRandomInteger(min, max) {
    const minValue = Math.ceil(min);
    const maxValue = Math.floor(max);
    return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
}

let Links = getEntries(getRandomInteger(8, 13)).map((site, index) => {
    var url = Array.from(document.querySelectorAll('[id=menu] li a')).find(elm => elm?.textContent == site).href
    if (index === 0) {nextRequest = url} else {extraInfo.push(new KeyValue(`${index}`, `${url}`))};
});

let MainPageObject = new MainPage(new ModuleRequest(nextRequest, 'get', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], extraInfo), new JavascriptConfig(true, false, ''), output);
var finalJson = JSON.stringify(MainPageObject);
savedData.innerHTML = finalJson;
window.webkit.messageHandlers.EXECUTE_KETSU_ASYNC.postMessage(''); 