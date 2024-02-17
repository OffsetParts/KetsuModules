function Chapters(request, extra, javascriptConfig, output) {
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

function Output(videos, images, text) {
    this.videos = videos;
    this.images = images;
    this.text = text;
}

function Videos(needsResolver, rawVideo) {
    this.needsResolver = needsResolver;
    this.rawVideo = rawVideo;
}

function NeedsResolver(resolverIdentifier, link) {
    this.resolverIdentifier = resolverIdentifier;
    this.link = link;
}

function RawVideo(video, subs) {
    this.video = video;
    this.subs = subs;
}

function Video(videoQuality, videoLink) {
    this.videoQuality = videoQuality;
    this.videoLink = videoLink;
}

function Text(text) {
    this.text = text;
}

function VideoSub(language, link) {
    this.language = language;
    this.link = link;
}

var subs = [];
var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);
const url = parsedJson.request.url;
var output = parsedJson.output.videos;

var emptyKeyValue = [new KeyValue('', '')];
let request = new ModuleRequest('', '', emptyKeyValue, null);

const requestHeaders = [new KeyValue('x-requested-with', 'XMLHttpRequest'), new KeyValue('referer', url), new KeyValue('content-type', 'application/x-www-form-urlencoded; charset=UTF-8')];
if (url.includes('/M') || url.includes('/E')) {
    const pass = document.getElementById('hId').value.trim();
    const param = document.getElementById('divU').textContent.trim();
    const extra = document.getElementById('divS').textContent.trim();
    const e2 = document.getElementById('hIsW').value.trim();
    const body = `param=${param}&pass=${pass}&extra=${extra}&e2=${e2}`;
    let requestUrl = new URL('/home/index/GetMInfoAjax', url).href;
    if (url.includes('/E')) {
        requestUrl = new URL('/home/index/GetEInfoAjax', url).href;
    }
    request = new ModuleRequest(requestUrl, 'post', requestHeaders, body);
} else {
    let script = document.querySelector('script').innerHTML.replace('/*', '').replace('*/', '');
    let data = JSON.parse(script);
    data = JSON.parse(data);
    var subtitles = data.subs;
    if (subtitles == undefined) {
        subtitles = '';
    } else {
        for (sub of subtitles) {
            var language = sub.name;
            var link = 'https://soap2day.cc/' + sub.path;
            link = new ModuleRequest(link, 'get', emptyKeyValue, null);
            var subobj = new VideoSub(language, link);
            subs.push(subobj);
        }
    }
    if (data.val) {
        output = {};
        const video = new Video('Normal', new ModuleRequest(data.val, 'get', emptyKeyValue, null));
        output.rawVideo = [new RawVideo([video], subs)];
    }
    if (subs.length == 0) {
        subs = null;
    }
}

let emptyExtra = new Extra([new Commands('', emptyKeyValue)], emptyKeyValue);
var chaptersObject = new Chapters(request, emptyExtra, new JavascriptConfig(true, false, ''), new Output(output, null, null));
var finalJson = JSON.stringify(chaptersObject);
savedData.innerHTML = finalJson;