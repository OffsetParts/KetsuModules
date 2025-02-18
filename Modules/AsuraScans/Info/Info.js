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

function filtrateCache(data) {
    return JSON.parse(data
		.replace(/[a-zA-Z0-9]+:/g, '')              // Remove any alphanumeric prefix followed by a colon
		.replace(/\\\\r\\\\n/g, '\\n')          // Replace escaped newlines
		.replace(/\\\\\"/g, '\"')              // Unescape quotation marks
		.replace(/\\\\\\\\/g, '\\\\')            // Handle any other escape sequences
		.replace(/\\\\n$/, '')
	);
}

function cleanText(text) {
    return text
        .replace(/\s+|&nbsp;/g, ' ')  // Replace excessive spaces and non-breaking spaces
        .replace(/["']/g, '\$&')      // Escape quotes
        .replace(/â\x80\x99/g, '’')   // Fix right single quotation mark
        .replace(/â\x80\x9c/g, '“')   // Fix left double quote
        .replace(/â\x80\x9d/g, '”')   // Fix right double quote
        .replace(/â\x80\x93/g, '–')   // Fix en dash
        .replace(/â\x80\x94/g, '—')   // Fix em dash
        .normalize();                 // Normalize Unicode text
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
var chapterElms = document.querySelectorAll('div[class*=\"border-[#A2A2A2]/20\"]');

var chapters = Array.from(chapterElms) // Convert NodeList to Array
    .map((element, index) => {
        var link = element.querySelector('a').href;
        let chapter = new Chapter('Chapter ' + (chapterElms.length - index), quickRequest(link, true), false);
        return chapter;
    })
    .reverse(); // Reverse the array to maintain the original order // Reverse the array to maintain the original order

let infoPageObject = new Info(new ModuleRequest('', '', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title, parsedJson.request, synopsis, genres, state, type, '', 'Chapters : ' + chapters.length, chapters));
var finalJson = JSON.stringify(infoPageObject);
savedData.innerHTML = finalJson;