// Functions
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

function cleanText(obj) {
	return obj.replaceAll('\\n','').replaceAll('\\t', '').trim();
}

let emptyKeyValue = [new KeyValue('', '')];

var preset = {
    request : new ModuleRequest('', 'get', emptyKeyValue, null),
    extra : new Extra([new Commands('', emptyKeyValue)], emptyKeyValue),
    javascriptConfig : new JavascriptConfig(true, false, ''),
}

var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);

var currUrl = parsedJson.request.url;

// Details
var title = cleanText(document.querySelector('h1').textContent);
var image = document.querySelector('.w-full img').src; image = new ModuleRequest(image, 'get', emptyKeyValue, null);

var Synopsis = cleanText(document.querySelector('.mt-3').textContent);

var genres = ['N/A', 'None', 'Null'];
var AgeRating = document.querySelectorAll('dd.text-neutral-200')[2].textContent; 
var status = document.querySelectorAll('dd.text-neutral-200')[3].textContent;
var LastUpdated = document.querySelectorAll('dd.text-neutral-200')[5].textContent;
var chapterAmount = document.querySelectorAll('span.font-medium')[3]

// Chapters
var episodes = [];
var chapters = document.querySelector('ul').querySelectorAll('li');

for (index of chapters) {
    var cLink = chapter.querySelector('a').href;
    let chapter = new Chapter(cleanText(index.querySelector('p').textContent), new ModuleRequest(cLink, 'get', emptyKeyValue, null), false);
    episodes.push(chapter); 
}

let infoPageObject

if (chapters.length == 32) {
    infoPageObject = new Info(
        new ModuleRequest(currUrl + `?page=2`, 'get', emptyKeyValue, null), 
        preset.extra, 
        preset.javascriptConfig, 
        new Output(image, title, parsedJson.request, Synopsis, genres, AgeRating, status, LastUpdated, 'Chapters : ' + chapterAmount, episodes)
    );
} else {
    infoPageObject = new Info(
        preset.request, 
        preset.extra, 
        preset.javascriptConfig, 
        new Output(image, title, parsedJson.request, Synopsis, genres, AgeRating, status, LastUpdated, 'Chapters : ' + chapterAmount, episodes)
    );
}

savedData.innerHTML = JSON.stringify(infoPageObject);