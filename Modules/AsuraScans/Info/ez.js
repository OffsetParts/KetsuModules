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

function cleanText(str) {
    return str.replace(/[\n\t]/g, '').trim();
}

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function testFormat(str) {
    let hasSpecialChar = false;
    let specialChars = [];
    for (let i = 0; i < str.length; ++i) {
        let ch = str.charCodeAt(i);
        if (!((ch >= 65 && ch <= 90) || (ch >= 97 && ch <= 122) || (ch >= 48 && ch <= 57))) {
            hasSpecialChar = true;
            specialChars.push(`Detected char:${ch} at index:${i}`);
        }
    }
    if (hasSpecialChar) {
        console.log(specialChars.join('\n'));
    }
    return hasSpecialChar;
}

function getText(node, accumulator = []) {
    if (node.nodeType === Node.TEXT_NODE) {
        if (testFormat(node.textContent)) {
            accumulator.push("");
        } else {
            accumulator.push(node.textContent);
        }
    } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() !== 'script') {
        for (let child of node.childNodes) {
            getText(child, accumulator);
        }
    }
    return cleanText(accumulator.join(''));
}

var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);
let emptyKeyValue = [new KeyValue('', '')];
var genres = [];
genres = Array.from(document.querySelectorAll('.wd-full a')).map(g => g.textContent);
var status = document.querySelector('div.tsinfo > div:nth-child(1) i').textContent;
var type = document.querySelector('div.tsinfo > div:nth-child(2) a').textContent;
var synopsis = [];
synopsis = getText(document.querySelector('[itemprop="description"]'), synopsis);
var title = cleanText(document.querySelector('.entry-title').textContent);
var image = document.querySelector('.thumb img').src;
image = new ModuleRequest(image, 'get', emptyKeyValue, null);
var chapters = document.querySelector('.clstyle').querySelectorAll('li');
var episodes = [];
if (chapters.length > 0) {
    for (var x = chapters.length; x >= 0; --x) {
        var element = chapters[x];
        var link = element.querySelector('a').href;
        let chapter = new Chapter('Chapter ' + (chapters.length - x), new ModuleRequest(link, 'get', emptyKeyValue, null), false);
        episodes.push(chapter);
    }
}
let infoPageObject = new Info(new ModuleRequest('', '', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title, parsedJson.request, synopsis, genres, status, type, '', 'Chapters : ' + episodes.length, episodes));
var finalJson = JSON.stringify(infoPageObject);
savedData.innerHTML = finalJson;