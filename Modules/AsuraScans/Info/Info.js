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

function cleanUrl(url) {
	return 'https://asuracomic.net/series/' + (url).trim();
}

function cleanText(text) {
    return text
        .replace(/\\s+|&nbsp;/g, ' ')  // Replace excessive spaces and non-breaking spaces
        .replace(/[\"']/g, '\\$&');
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

var genres = Array.from(document.querySelectorAll('[class*=\"flex flex-row flex-wrap gap-3\"] > button')).map(g => g.textContent);
var state = document.querySelector('h3[class*=\"capitalize\"]').textContent;
var type = document.querySelector('h3[class*=\"text-white hover:text-themecolor\"]').textContent;

var synopsis = getText(document.querySelector( 'span[class*=\"A2A2A2\"]'));

var title = cleanText(document.querySelector('[class*=\"text-xl\"]').textContent);
var image = quickRequest(document.querySelector('[alt=\"poster\"]').src);
const chapterElms = document.querySelectorAll('div[class*="border-[#A2A2A2]/20"]');

const chapters = Array.from(chapterElms).filter(element => !element.querySelector('svg')) // exclude elements containing SVGs
.map((element, index, filteredArray) => {
    const link = element.querySelector('a')?.href;
    return new Chapter('Chapter ' + (filteredArray.length - index), quickRequest(link), false);
}).reverse();

let infoPageObject = new Info(new ModuleRequest('', '', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title, parsedJson.request, synopsis, genres, state, type, '', 'Chapters : ' + chapters.length, chapters));
var finalJson = JSON.stringify(infoPageObject);
savedData.textContent = finalJson;