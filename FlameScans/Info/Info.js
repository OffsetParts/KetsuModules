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

var rating =  'Rating: ' + document.querySelector('.numscore').innerText; 
var status = document.querySelector('.status').innerText;
var type = document.querySelector('.tsinfo .imptdt i').innerText;

var Summary;
try {
    Synopsis = document.querySelector('.entry-content-single').innerText;
} catch {
    Synopsis = '';
}

var title = document.querySelector('.entry-title').innerText.replaceAll('\\n\\n','\\n').replaceAll('(adsbygoogle = window.adsbygoogle || []).push({})', '').trim();
var genres = []; genres = Array.from(document.querySelectorAll('.mgen a')).map(g => g.innerText);
var image = document.querySelector('img').src; image = new ModuleRequest(image, 'get', emptyKeyValue, null);
var chapters = document.querySelectorAll('.eplister ul li');

var episodes = [];

if (chapters.length > 0) {
    for (var x = chapters.length - 1; x >= 0; x--) {
        var element = chapters[x];
        if (element) {
            var cLink = element.querySelector('a').href;
            let chapter = new Chapter('Chapter ' + (chapters.length - x), new ModuleRequest(cLink, 'get', emptyKeyValue, null), false);
            episodes.push(chapter);
        }
    }
}

let infoPageObject = new Info(new ModuleRequest('', '', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title, parsedJson.request, Synopsis, genres, rating, status, type, 'Chapters : ' + chapters.length, episodes));
var finalJson = JSON.stringify(infoPageObject);
savedData.innerHTML = finalJson;