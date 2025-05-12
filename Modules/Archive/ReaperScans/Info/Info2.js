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

function cleanUrl(path) {
	return 'https://reaperscans.com' + (path).trim();
}

function cleanText(str) {
	return str?.replace(/[\\n\\t]/g, '').trim() ?? '';
}

function quickRequest(url, clean) {
	if (clean == true) {
		return new ModuleRequest(cleanUrl(url), 'get', emptyKeyValue, null);
	} else if (clean == false || clean == null) {
		return new ModuleRequest(cleanText(url), 'get', emptyKeyValue, null);
	}
}

var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);
let emptyKeyValue = [new KeyValue('', '')];

var preset = {
    request : new ModuleRequest('', 'get', emptyKeyValue, null),
    extra : new Extra([new Commands('', emptyKeyValue)], emptyKeyValue),
    javascriptConfig : new JavascriptConfig(true, false, ''),
}

let output = parsedJson.output;
let image = parsedJson.output.image;
var title = parsedJson.output.title;
var Synopsis = parsedJson.output.description;
var genres = parsedJson.output.genres;
var type = '';

// Details
const formatData = JSON.parse(document.querySelector('script').innerHTML.replace('/*', '').replace('*/', ''));
let Chapters = Array.from(formatData.data).map((entry) => {
    let chapName = cleanText(entry['chapter_name']);
    let link = quickRequest(output.link.url + '/' + entry['chapter_slug']);
    return new Chapter(chapName, link, false);
}); console.log(Chapters);

let infoPageObject = new Info(
    new ModuleRequest('', 'get', emptyKeyValue, null),
    preset.extra,
    preset.javascriptConfig,
    new Output(image, title, parsedJson.request, Synopsis, genres, parsedJson.output.field1, parsedJson.output.field2, '', parsedJson.output.field4, Chapters)
);

savedData.innerHTML = JSON.stringify(infoPageObject);
window.webkit.messageHandlers.EXECUTE_KETSU_ASYNC.postMessage('');