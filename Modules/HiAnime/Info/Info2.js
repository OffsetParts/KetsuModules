function Info ( request, extra, javascriptConfig, output ) {
    this.request = request;
    this.extra = extra;
    this.javascriptConfig = javascriptConfig;
    this.output = output;
}

function ModuleRequest ( url, method, headers, httpBody ) {
    this.url = url;
    this.method = method;
    this.headers = headers;
    this.httpBody = httpBody;
}

function Extra ( commands, extraInfo ) {
    this.commands = commands;
    this.extraInfo = extraInfo;
}

function Commands ( commandName, params ) {
    this.commandName = commandName;
    this.params = params;
}

function JavascriptConfig ( removeJavascript, loadInWebView, javaScript ) {
    this.removeJavascript = removeJavascript;
    this.loadInWebView = loadInWebView;
    this.javaScript = javaScript;
}

function KeyValue ( key, value ) {
    this.key = key;
    this.value = value;
}

function Chapter ( chapName, link, openInWebView ) {
    this.chapName = chapName;
    this.link = link;
    this.openInWebView = openInWebView;
}

function Output ( image, title, link, description, genres, field1, field2, field3, field4, chapters ) {
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
	return str?.replace(/[\\n\\t]/g, '').trim() ?? '';
}

function cleanUrl(url) {
    return 'https://hianime.to' + (url.replace('/watch', '').replace('?w=latest', '')).trim();
}

function quickRequest(url, clean) {
	if (clean == true) {
		return new ModuleRequest(cleanUrl(url), 'get', emptyKeyValue, null);
	} else if (clean == false || clean == null) {
		return new ModuleRequest(url, 'get', emptyKeyValue, null);
	}
}

var savedData = document.getElementById( 'ketsu-final-data' ) || document.body.querySelector('div');
var parsedJson = JSON.parse( savedData.innerText );
var emptyKeyValue = [new KeyValue('', '')];
let Headers = [new KeyValue('Referer', parsedJson.request.url), new KeyValue('X-Requested-With', 'XMLHttpRequest')];
var commands = [new Commands('helperFunctions', [new KeyValue('isCustomRequest', 'true')])];
let emptyExtra = new Extra(commands, emptyKeyValue);

var image = parsedJson.output.image;
var title = parsedJson.output.title;
var synopsis = parsedJson.output.description;
var genres = parsedJson.output.genres;
var type = '';

var format = document.querySelector('script').innerText.replace('*/', '').replace('/*', '');
var htmldom = new DOMParser().parseFromString(JSON.parse(format).html, 'text/html');
var episodeList = htmldom.querySelectorAll('.ss-list a');

var episodes = Array.from(episodeList).map((element, index) => {
    var link =  'https://hianime.to/ajax/v2/episode/servers?episodeId=' + element.dataset.id;
    var Title = element.title; if ( !Title.includes('Episode') ) { Title = `${index + 1}: ` + Title;}
    let chapter = new Chapter(Title, quickRequest(link), false);
    return chapter;
});

parsedJson.request.url = parsedJson.output.link.url;
parsedJson.request.headers = [ new KeyValue( '', '' ) ];
let infoPageObject = new Info( new ModuleRequest( '', '', Headers, null ), emptyExtra, new JavascriptConfig( false, false, '' ), new Output( image, title, parsedJson.request, synopsis, genres, parsedJson.output.field1, parsedJson.output.field2, type, 'Eps: ' + episodes.length, episodes ) );
var finalJson = JSON.stringify( infoPageObject );
savedData.innerText = finalJson;
window.webkit.messageHandlers.EXECUTE_KETSU_ASYNC.postMessage('');