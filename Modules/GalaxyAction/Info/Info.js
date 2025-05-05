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

var info = [...document.querySelectorAll('div.tsinfo > [class=imptdt]')]
var Status = cleanText(info.filter(e => e.textContent.includes('Status')).pop().querySelector('i').textContent);
var type = cleanText(info.filter(e => e.textContent.includes('Type')).pop().querySelector('a').textContent);
var genres = Array.from(document.querySelectorAll('[class=mgen] > [rel=tag]')).map(g => g.textContent);

var synopsis = getText(document.querySelector('[itemprop=description]'));

var title = cleanText(document.querySelector('[class=entry-title]').textContent);
var image = quickRequest(document.querySelector('[class=thumb] > img').src);
var chapterElms = document.querySelectorAll('[class=eplister] li');

var chapters = Array.from(chapterElms).map((element) => {
    return new Chapter(element.querySelector('[class=chapternum]').textContent, quickRequest(element.querySelector('a').href), false);
}).reverse();

let infoPageObject = new Info(new ModuleRequest('', '', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title, parsedJson.request, synopsis, genres, Status, type, '', 'Chapters : ' + chapterElms.length, chapters));
var finalJson = JSON.stringify(infoPageObject);
savedData.innerHTML = finalJson;