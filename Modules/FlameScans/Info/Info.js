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

var id = 'ketsu-final-data';
let ketsu = document.createElement('div');
ketsu.setAttribute('id', id);
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
var image = quickRequest(document.querySelector('img').src, true);
var rating =  'N/A';
var state = cleanText(document.querySelector('div .mantine-Badge-root').textContent);
var Synopsis = cleanText(document.querySelector('div [style*=transition] > p.mantine-Text-root').textContent);

var genresElm = document.querySelectorAll('.mantine-Paper-root > .mantine-Stack-root > .mantine-Group-root');
var genres = [...genresElm].map(item => {
    // const subElm1 = item.querySelector('[class*=infoField]'); // Get subElm1
    const subElm2 = item.querySelector('[class*=infoValue'); // Get subElm2

    // Combine their textContent with ': '
    return `${subElm2?.textContent.trim()}`;
});

var chaptersData = () => (Array.from(document.querySelectorAll('[class*=ChapterCard_chapterWrapper]')).map((element) => {
    new Chapter(element.querySelector('p[class*=mantine-Text-root]').textContent, quickRequest(element.querySelector('a').href), false);
}).reverse());

let finish = (chapters) => {
	var infoPageObject = new Info( new ModuleRequest( '', '', emptyKeyValue, null ), emptyExtra, new JavascriptConfig( false, false, ''), new Output(image, title, '', Synopsis, genres, rating, state, '', 'Chapters : ' + chapters.length, chapters));
	var finalJson = JSON.stringify( infoPageObject );
	document.body.querySelectorAll('#' + id).forEach((el) => (el.remove()));
	document.body.prepend(ketsu);
	ketsu.innerHTML = finalJson;
	if (window.webkit && window.webkit.messageHandlers.EXECUTE_KETSU_ASYNC) {
        window.webkit.messageHandlers.EXECUTE_KETSU_ASYNC.postMessage('');
    } else {
        console.warn('WebKit handler not available.');
    }
}

let tries = 0;
let maxTries = navigator.connection ? Math.ceil(navigator.connection.downlink * 5) : 10;
const observer = new MutationObserver((mutations, obs) => {
    let chapters = chaptersData();
    if (chapters.length > 0) {
        finish(chapters);
        obs.disconnect(); // Stop observing when images are found
    }
    
    tries++;
    if (tries > maxTries) {
        finish([]);
        obs.disconnect();
    }
});

observer.observe(document.body, { childList: true, subtree: true });

// Fallback in case images are already present at the start
if (chaptersData().length > 0) {
    observer.disconnect();
    finish(chaptersData());
}