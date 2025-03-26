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

var output = [];
var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);

var extraInfo = [new KeyValue('count', '0')];
var XHRequest = [new KeyValue('X-Requested-With', 'XMLHttpRequest')];
let emptyExtra = new Extra([new Commands('', XHRequest)], extraInfo);

var nextRequest = '';
const format = document.querySelector('script').innerHTML.replace('/*', '').replace('*/', '');
var htmldom = new DOMParser().parseFromString(JSON.parse(format).html, 'text/html');

var links = htmldom.querySelectorAll('.item.server-item');
let Servers = Array.from(links).map((link, index) => {
    var url = `https:\/\/hianime.to/ajax/v2/episode/sources?id=${link.dataset.id}&lang=${link.dataset.type}`;
    if (index == 0) {nextRequest = url} else {extraInfo.push(new KeyValue(`${index}`, `${url}`))};
});

var chaptersObject = new Chapters(new ModuleRequest(nextRequest, 'get', XHRequest, null), emptyExtra, new JavascriptConfig(false, false, ''), new Output(new Videos([], []), null, null));
var finalJson = JSON.stringify(chaptersObject);
savedData.innerHTML = finalJson;
window.webkit.messageHandlers.EXECUTE_KETSU_ASYNC.postMessage('');    