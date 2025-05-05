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

var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);

var emptyKeyValue = [ new KeyValue( '', '' ) ];
let emptyExtra = new Extra([new Commands('', emptyKeyValue)], emptyKeyValue);

// Functions
function cleanUrl(url) {
	return 'https://flamecomics.xyz' + (url).trim();
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

var title = document.querySelector('h1').textContent;
var image = quickRequest(document.querySelector('img').src);
var state = cleanText(document.querySelector('div[style*=green] span[class*=Badge]').textContent);
var Synopsis = cleanText(document.querySelector('div [style*=transition] > p.mantine-Text-root').textContent);

var type = document.querySelectorAll('div[class*=Card] p[class*=infoValue]')[3].textContent;
var genres = Array.from(document.querySelectorAll('a[href*=genre] span')).map(g => g.textContent);

var chaptersData = Array.from(JSON.parse(document.querySelector('script[id=__NEXT_DATA__]').textContent)['props']['pageProps']['chapters']).map((entry) => {
    let link = quickRequest('/series/' + entry['series_id'] + '/' + entry['token'], true);
    let title = 'Chapter ' + entry['chapter'].replace('.0', '');
    return new Chapter(title, link, false);
});


var infoPageObject = new Info( new ModuleRequest( '', 'GET', emptyKeyValue, null ), emptyExtra, new JavascriptConfig( false, false, ''), new Output(image, title, parsedJson.request, Synopsis, genres, type, state, '', chaptersData.length + ' Chapters', chaptersData));
var finalJson = JSON.stringify(infoPageObject);
savedData.innerHTML = finalJson;