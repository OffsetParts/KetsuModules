function Episodes(request, extra, javascriptConfig, output) {
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

function RawVideo(video) {
    this.video = video;
}

function Video(videoQuality, videoLink) {
    this.videoQuality = videoQuality;
    this.videoLink = videoLink;
}

function Videos(needsResolver, rawVideo) {
    this.needsResolver = needsResolver;
    this.rawVideo = rawVideo;
}

function Resolver(resolverIdentifier, link) {
    this.resolverIdentifier = resolverIdentifier;
    this.link = link;
}

function parseJsonFromSavedData() {
    const savedDataElement = document.getElementById('ketsu-final-data');
    return JSON.parse(savedDataElement.innerHTML);
}

function isValidBase64(input) {
    const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/;
    return base64Regex.test(input) && input.length % 4 === 0;
}

function decodeBase64(input) {
    if (!isValidBase64(input)) {
        throw new Error('Invalid Base64 input');
    }

    const paddedInput = input + '='.repeat(4 - (input.length % 4));
    return atob(paddedInput);
}

function getValueFromKey(keys, key) {
    for (let i = 0; i < keys.length; i++) {
        const currentKey = keys[i];
        if (currentKey.key === key) {
            return currentKey.value;
        }
    }
}

function getEpisodeCount(extraInfo) {
    const countKey = 'count';
    const countValue = getValueFromKey(extraInfo, countKey);
    return parseInt(countValue.match(/\\d+/g)[0]);
}

function getModuleRequestForNextEpisode(extraInfo, nextCount) {
    const nextRequest = getValueFromKey(extraInfo, nextCount);
    if (nextRequest === undefined) {
        return '';
    }
    return new ModuleRequest(nextRequest, 'get', [], null);
}

function buildEpisodeObject(nextRequest, extraInfo, output) {
    const emptyCommands = [new Command('', [])];
    const javascriptConfig = new JavascriptConfig(true, false, '');
    const extra = new Extra(emptyCommands, extraInfo);
    return new Chapter(nextRequest, extra, javascriptConfig, new Output(output, null, null));
}

var parsedJson = parseJsonFromSavedData();
var extraInfo = parsedJson.extra.extraInfo;
var emptyKeyValue = [new KeyValue('Referer', 'https://9animetv.to/watch/')];
var output = parsedJson.output.videos;
var actualCount = getEpisodeCount(extraInfo);
var nextCount = actualCount + 1;
var nextRequest = getModuleRequestForNextEpisode(extraInfo, nextCount);

if (actualCount === 0) {
    output = new Videos([], []);
}

function ze(input) {
    var key = '0wMrYU+ixjJ4QdzgfN2HlyIVAt3sBOZnCT9Lm7uFDovkb/EaKpRWhqXS5168ePcG';
    console.log(input);
    var t = input.replace(/[\\t\\n\\f\\r]/g, '').length % 4 == 0;
    console.log(t);
    if (t.length % 4 == 0) {
        t = t.replace(/==?$/g, '');
    } else {
        t = input;
    }
    if (t.length % 4 == 1 || t.match(/[^+/0-9A-Za-z]/)) {
        throw new Error('bad input');
    }
    var i = 0;
    var r = '';
    var e = 0;
    var u = 0;
    for (o in t) {
        e = e << 6;
        i = key.indexOf(t[o]);
        e = e | i;
        u += 6;
        if (24 == u) {
            r += String.fromCharCode((16711680 & e) >> 16);
            r += String.fromCharCode((65280 & e) >> 8);
            r += String.fromCharCode(255 & e);
            e = 0;
            u = 0;
        }
    }
    return 12 == u ? (e = e >> 4, r += String.fromCharCode(e)) : 18 == u ? (e = e >> 2, r += String.fromCharCode((65280 & e) >> 8), r += String.fromCharCode(255 & e)) : r;
}

function getLink(url) {
    var i = url.substr(0, 6);
    var n = url.substr(6, url.length);
    var c = ze(n);
    console.log(c);
    return decodeURIComponent(je(i, c));
}

function je(t, n) {
    var c = '';
    for (var u, e = [], o = 0, c = '', f = 256, s = 0; s < f; s += 1) e[s] = s;
    for (s = 0; s < f; s += 1) o = helperOne(o + e[s] + t.charCodeAt(s % t.length), f), u = e[s], e[s] = e[o], e[o] = u;
    for (var o = s = 0, a = 0; helperTwo(a, n.length); a += 1) o = (o + e[s = (s + a) % f]) % f, u = e[s], e[s] = e[o], e[o] = u, c += String.fromCharCode(n.charCodeAt(a) ^ e[(e[s] + e[o]) % f]);
    return c;
}

function helperOne(t, n) {
    return t % n;
}

function helperTwo(t, n) {
    return t < n;
}

const script = document.querySelector('script').innerHTML.replace('/*', '').replace('*/', '');
const videoUrl = getLink(JSON.parse(script).url.replaceAll('=', ''));
output.needsResolver.push(new NeedsResolver('', new ModuleRequest(videoUrl.replace('streamtape.com', 'streamta.pe').replace('?autostart=true', ''), 'get', [], null)));
extraInfo[0].value = '' + nextCount;

var chaptersObject = buildEpisodeObject(nextRequest, extraInfo, output)
var finalJson = JSON.stringify(chaptersObject);
var savedDataElement = document.getElementById('ketsu-final-data');
savedDataElement.innerHTML = finalJson;