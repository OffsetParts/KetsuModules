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

var baseUrl = '';
if (window.location) {
    baseUrl = window.location.hostname + window.location.pathname
}


var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);
let emptyKeyValue = [new KeyValue('', '')];

var AgeRating = document.querySelectorAll('dd.text-neutral-200')[2].textContent; 
var status = document.querySelectorAll('dd.text-neutral-200')[3].textContent;
var LastUpdated = document.querySelectorAll('dd.text-neutral-200')[5].textContent;

var Summary;
try {
    Synopsis = document.querySelectorAll('.mt-3').textContent.replaceAll('\\n','').trim();
} catch {
    Synopsis = '';
}

var title = document.querySelector('h1').textContent.trim();
var image = document.querySelector('.w-full img').src; image = new ModuleRequest(image, 'get', emptyKeyValue, null);
var chapters = document.querySelector('ul').querySelectorAll('li');

var episodes = [];

if (chapters.length > 0) {
    for (var x = 0; x = 32; x++) {
        var element = chapters[x];
        if (element) {
            var cLink = element.querySelector('a').href;
            let chapter = new Chapter(element.querySelector('p').outerText, new ModuleRequest(cLink, 'get', emptyKeyValue, null), false); console.log(chapter);
            episodes.push(chapter);
        }
    }
}

let infoPageObject = new Info(new ModuleRequest(baseUrl, '', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title, parsedJson.request, Synopsis, AgeRating, status, LastUpdated, '', 'Chapters : ' + document.querySelectorAll('span.font-medium')[3], episodes));
var finalJson = JSON.stringify(infoPageObject);
savedData.innerHTML = finalJson;