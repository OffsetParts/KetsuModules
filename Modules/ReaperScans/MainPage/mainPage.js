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
	return 'https://reaperscans.com' + (path).trim();
}

function cleanText(str) {
	return str.replace(/[\\n\\t]/g, '').trim();
}

function quickRequest(url, clean) {
	if (clean == true) {
		return new ModuleRequest(cleanUrl(url), 'get', emptyKeyValue, null);
	} else if (clean == false || clean == null) {
		return new ModuleRequest(cleanText(url), 'get', emptyKeyValue, null);
	}
}

function scriptFilter(match, obj) {
    document.querySelectorAll('script').forEach((elm) => {
        let content = elm.innerHTML;
        if (content.match('self.__next_f.push') && content.includes(match)) {
            const regex = /self\\.__next_f\\.push\\(\\[(\\d+),\\s*\"(.*?)\"\\]\\)/u;
            let match = content.match(regex); if (match) {
                var dictionary = match[2]
                .replace(/[a-zA-Z0-9]+:/g, '')              // Remove any alphanumeric prefix followed by a colon
                .replace(/\\\\r\\\\n/g, '\\n')          // Replace escaped newlines
                .replace(/\\\\\"/g, '\"')              // Unescape quotation marks
                .replace(/\\\\\\\\/g, '\\\\')            // Handle any other escape sequences
                .replace(/\\\\n$/, '');   
                obj.array = JSON.parse(dictionary);
            }
        }
    });
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

/* {{ Dynamic Elements }} */


/* const PosterElms = document.querySelectorAll('[class*=main-embla__slide]');
let Posters = Array.from(PosterElms).map(list => {
	var link = quickRequest(list.querySelector('a').href, true);
	var image = quickRequest(list.querySelector('img').src);

	return new Data(image, '', '0', '1', '2', '3', '4', false, link);
}); */


let NewData = { array: [] }; scriptFilter('solo', NewData);
let NewSeriesList = []; const NewSeriesData = findProperties(NewData.array, ['series']);
if (NewSeriesData) {
    NewSeriesList = Array.from(NewSeriesData[0]['series']).map(list => {
        let title = list['title'];
        let link = quickRequest('/series/' + list['series_slug'], true);
        let image = quickRequest('https:' + list['thumbnail']);

        return new Data(image, title, '0', '1', '2', '3', '4', false, link);
    });

}

/* {{ Static Elements }} */

const LatestElms = document.querySelector('div.col-span-full').querySelectorAll('[role=group]');
let Latests = Array.from(LatestElms).map(list => {
    var title = cleanText(list.querySelector('span [class*=line-clamp-1]').textContent);
	var link = quickRequest(list.querySelector('a').href, true);
	var image = quickRequest(list.querySelector('img').src, true);

    var lastChapter = cleanText(list.querySelector('h5').textContent);

	return new Data(image, title, lastChapter, '1', '2', '3', '4', false, link);
});

fetch(apiEndpoint, fetchOptions)
  .then(response => {
    if (!response.ok) {
      throw new Error(`POST request failed: ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('POST Response Data:', data);
    // Process the data as needed
  })
  .catch(error => {
    console.error('Error with POST request:', error);
  });


// output.push(new Output(CellDesings.normal4, Orientation.horizontal, DefaultLayouts.none, Paging.leading, new Section('', false), Carousel, Posters));
output.push(new Output(CellDesings.normal4, Orientation.horizontal, DefaultLayouts.longTripletsFull, Paging.leading, new Section('New Series', true), null, NewSeriesList));
output.push(new Output(CellDesings.wide9, Orientation.horizontal, DefaultLayouts.wideStrechedList, Paging.leading, new Section('Latest Chapters', true), null, Latests));

const MainPageObject = new MainPage(
    new ModuleRequest('', 'get', emptyKeyValue, null),
    new Extra([new Commands('', emptyKeyValue)], emptyKeyValue),
    new JavascriptConfig(true, false, ''),
    output
);

const finalJson = JSON.stringify(MainPageObject);
savedData.innerHTML = finalJson;