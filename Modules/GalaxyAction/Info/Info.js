function Info(request, extra, javascriptConfig, output) {
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

function Chapter(chapName, link, openInWebView) {
    this.chapName = chapName;
    this.link = link;
    this.openInWebView = openInWebView;
}

function Output(image, title, link, description, genres, field1, field2, field3, field4, chapters) {
    this.image = image;
    this.link = link;
    this.title = title;
    this.description = description;
    this.genres = genres;
    this.field1 = field1;
    this.field2 = field2;
    this.field3 = field3;
    this.field4 = field4;
    this.chapters = chapters;
}

// Functions
function cleanText(str) {
    return str.replace(/[\\n\\t]/g, '');
}

function cleanUrl(url) {
    return 'https://galaxyaction.net' + (url).trim();
}

function quickRequest(url, clean) {
	if (clean == true) {
		return new ModuleRequest(cleanUrl(url), 'get', emptyKeyValue, null);
	} else if (clean == false || clean == null) {
		return new ModuleRequest(url, 'get', emptyKeyValue, null);
	}
}

function getText(node, accumulator = []) {
    if (node.nodeType === Node.TEXT_NODE) {
        accumulator.push(node.textContent);
    } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() !== 'script') {
        for (let child of node.childNodes) {
            getText(child, accumulator);
        }
    }
    return cleanText(accumulator.join(' ')).trim();
}

var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);
let emptyKeyValue = [new KeyValue('', '')];

var genres = ['Action', 'Adventure', 'Comics'];
var type = 'Webtoon';

var synopsis = getText(document.querySelector('[class=modal-box] > div > div p'));

var title = cleanText(document.querySelector('.text-2xl').textContent);
var image = quickRequest(document.querySelector('.h-full.rounded').src);
var chapters = document.querySelectorAll('.grid.grid-cols-1 a');

var episodes = [];
for (let x = chapters.length - 1; x >= 0; x--) {
    var element = chapters[x];

    if (!element) {
        continue; // Skip this iteration if element is undefined
    }

    let chapter = new Chapter('Chapter ' + (chapters.length - x), quickRequest(element.href, true), false);
    episodes.push(chapter);
}

let infoPageObject = new Info(new ModuleRequest('', '', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title, parsedJson.request, synopsis, genres, status, type, '', 'Chapters : ' + episodes.length, episodes));
var finalJson = JSON.stringify(infoPageObject);
savedData.innerHTML = finalJson;