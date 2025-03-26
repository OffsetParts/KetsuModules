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

var savedData = document.getElementById('ketsu-final-data') || document.body.querySelector('div');
var parsedJson = JSON.parse(savedData.innerHTML);
var emptyKeyValue = [new KeyValue('', '')];
let XHRequest = [new KeyValue('Referer', parsedJson.request.url), new KeyValue('X-Requested-With', 'XMLHttpRequest')];
var commands = [new Commands('helperFunctions', [new KeyValue('isCustomRequest', 'true')])];
let emptyExtra = new Extra(commands, emptyKeyValue);

function grabAnimeInfo(Header, Class) {
    var animeInfo = Array.from(document.querySelectorAll( 'div.anisc-info-wrap > div.anisc-info > div.item'));
    var Entry = animeInfo.find(e => e.querySelector('[class*=item-head]')?.textContent.includes(Header)); 
    if (Entry.classList.contains('item-list') && Class.includes('a')) {
        return Array.from(Entry.querySelectorAll('a')).map(e => e.textContent);

    }
    return animeInfo.find(e => e.querySelector('[class*=item-head]')?.textContent.includes(Header)).querySelector(Class).textContent;
}

var Title = document.querySelector('.anisc-detail h2').textContent;
var Image = quickRequest(document.querySelector('div.film-poster img').src);
var Airing = grabAnimeInfo('Aired', '.name');
var Status = grabAnimeInfo('Status', '.name');
var Genres = grabAnimeInfo('Genres', '.a');
var Synopsis = document.querySelector( 'div.anis-content > div.anisc-detail > div.film-depion.m-hide > div' ).textContent.trim();

var Type = document.querySelector('[class=film-stats] > div > .dot').nextElementSibling.textContent;

var json = document.querySelector( '#wrapper' ).dataset.id;
var nextRequest = `https:\/\/hianime.to/ajax/v2/episode/list/${json}`;
let infoPageObject = new Info( new ModuleRequest( nextRequest, 'get', XHRequest, null ), emptyExtra, new JavascriptConfig( false, false, '' ), new Output( Image, Title, parsedJson.request, Synopsis, Genres, Status, Airing, Type, '0', []));
var finalJson = JSON.stringify( infoPageObject );
savedData.innerHTML = finalJson;
window.webkit.messageHandlers.EXECUTE_KETSU_ASYNC.postMessage('');    