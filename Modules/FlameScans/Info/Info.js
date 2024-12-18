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
let emptyKeyValue = [new KeyValue('', '')];

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
var image = quickRequest(document.querySelector('img').src, true);
var rating =  'N/A';
var status = cleanText(document.querySelector('div .mantine-Badge-root').textContent);
var Synopsis = cleanText([...document.querySelectorAll('p')].find(el => el.textContent.trim().includes('In the past')).textContent);

var genresElm = document.querySelectorAll('.mantine-Paper-root > .mantine-Stack-root > .mantine-Group-root');
var genres = [...genresElm].map(item => {
    // const subElm1 = item.querySelector('[class*=infoField]'); // Get subElm1
    const subElm2 = item.querySelector('[class*=infoValue'); // Get subElm2

    // Combine their textContent with ': '
    return `${subElm2?.textContent.trim()}`;
});

var chapters = document.querySelectorAll('[class*=ChapterCard_chapterWrapper]');

var episodes = [];
if (chapters.length > 0) {
    for (var x = chapters.length - 1; x >= 0; x--) {
        var element = chapters[x];
        var cLink = element.href;
        let chapter = new Chapter('Chapter ' + (chapters.length - x), quickRequest(cLink, true), false);
        episodes.push(chapter);
    }
}

let infoPageObject = new Info(new ModuleRequest('', '', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title, parsedJson.request, Synopsis, genres, rating, status, '', 'Chapters : ' + chapters.length, episodes));
var finalJson = JSON.stringify(infoPageObject);
savedData.innerHTML = finalJson;