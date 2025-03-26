function Chapters ( request, extra, javascriptConfig, output ) {
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

function Output ( videos, images, text ) {
    this.videos = videos;
    this.images = images;
    this.text = text;
}

function Videos ( needsResolver, rawVideo ) {
    this.needsResolver = needsResolver;
    this.rawVideo = rawVideo;
}

function NeedsResolver ( resolverIdentifier, link ) {
    this.resolverIdentifier = resolverIdentifier;
    this.link = link;
}

function RawVideo ( video ) {
    this.video = video;
}

function Video ( videoQuality, videoLink ) {
    this.videoQuality = videoQuality;
    this.videoLink = videoLink;
}

//Functions
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

function getValueFromKey(keys, key) {
    for (var x = 0; x < keys.length; x++) {
        let tKey = keys[x];
        if (tKey.key == key) {
            return tKey.value;
        }
    }
}

var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);
var output = parsedJson.output.videos;

var extraInfo = parsedJson.extra.extraInfo;
var XHRequest = [new KeyValue('X-Requested-With', 'XMLHttpRequest')];
var emptyHeaders = [new KeyValue('Referer', 'https://hianime.to/')];
var actualCount = getValueFromKey(extraInfo, 'count');
var nextCount = parseInt(actualCount.match(/\\d+/g)[0]) + 1;
var nextRequest = getValueFromKey(extraInfo, nextCount);
if (actualCount == 0) {
    output = new Videos([], []);
}

const format = document.querySelector('script').innerHTML.replace('/*', '').replace('*/', '');
var data = JSON.parse(format); data.link = data.link.replace('?vast=1', '');

if (data.link.includes('streamtape.com')) {
    var linked = data.link.replace('https://streamtape.com/', 'https://streamta.pe/');
    let label = parsedJson.request.url.includes('lang=dub') ? 'STREAMTA DUB' : '';
    output.needsResolver.push(new NeedsResolver(label, new ModuleRequest(linked, 'get', emptyHeaders, null)));
} else {
    let resolver = parsedJson.request.url.includes('lang=dub') ? data.link.split('/')[2].split('.')[0].toUpperCase() + ' DUB' : data.link.split('/')[2].split('.')[0].toUpperCase();
    output.needsResolver.push(new NeedsResolver(resolver, new ModuleRequest(data.link, 'get', emptyHeaders, null)));
}

extraInfo[0].value = `${nextCount}`;
if (nextRequest == null) {
    nextRequest = '';
}

let emptyExtra = new Extra([new Commands('', XHRequest)], extraInfo);
let chaptersObject = new Chapters(new ModuleRequest(nextRequest, 'get', XHRequest, null), emptyExtra, new JavascriptConfig(false, false, ''), new Output(output, null, null));
var finalJson = JSON.stringify(chaptersObject);
savedData.innerHTML = finalJson;
window.webkit.messageHandlers.EXECUTE_KETSU_ASYNC.postMessage('');