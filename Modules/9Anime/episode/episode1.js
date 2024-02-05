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

function Videos(needsResolver, rawVideo) {
    this.needsResolver = needsResolver;
    this.rawVideo = rawVideo;
}

function Resolver(resolverIdentifier, link) {
    this.resolverIdentifier = resolverIdentifier;
    this.link = link;
}

function RawVideo(video) {
    this.video = video;
}

function Video(videoQuality, videoLink) {
    this.videoQuality = videoQuality;
    this.videoLink = videoLink;
}

function Text(text) {
    this.text = text;
}

function parseJsonFromSavedData() {
    const savedDataElement = document.getElementById('ketsu-final-data');
    return JSON.parse(savedDataElement.innerHTML);
}

function isValidBase64String(input) {
    const validBase64Chars = /^[A-Za-z0-9+/]+={0,2}$/;
    return validBase64Chars.test(input) && input.length % 4 === 0;
}
  
function decodeBase64(input) {
    if (!isValidBase64String(input)) {
        throw new Error('Invalid Base64 input');
    }

    const paddedInput = input + '='.repeat(4 - (input.length % 4));
    const decodedData = atob(paddedInput);

    return decodedData;
}  

var parsedJson = parseJsonFromSavedData();

var output = parsedJson.output.videos;

const extra = new Extra([new Commands('', emptyKeyValue)], extraInfo);
var emptyKeyValue = [new KeyValue('', '')];
var referer = [new KeyValue('referer', 'https://9animetv.to/watch/')];
let newRequest = new ModuleRequest('', '', emptyKeyValue, null);
let extraInfo = [new KeyValue('current', '1')];

const url = new URL(parsedJson.request.url);
const params = Object.fromEntries(url.searchParams);

const serv = parsedJson.extra.extraInfo.reduce((result, item) => {
    result[item.key] = item.value;
    return result;
}, {});

if (url.href.includes('google')) {
    let servers = {};

    for (const param of params) {
        let p = param.split('=');
        let key = p[0];
        servers[key] = p[1];
    }

    extraInfo.push(new KeyValue('Streamtape', servers['40']));
    extraInfo.push(new KeyValue('Vidstream', servers['41']));

    newRequest = new ModuleRequest(`https://9animetv.to/ajax/anime/episode?id=${servers['35']}`, 'get', referer, null);
    
} else {
    function transform(input) {
        // Decode the Base64 string
        const decodedData = decodeBase64(input.replace(/\\s/g, ''));

        // const transformedData = decodedData.toUpperCase(); // Example transformation: convert to uppercase
      
        return decodedData;
      }

    const current = parseInt(serv.current);
    const script = document.querySelector('script').innerHTML.replace('/*', '').replace('*/', '');
    const videoUrl = transform(JSON.parse(script).url); console.log(videoUrl);
    let name = 'MP4UPLOAD';

    if (current == 1) {
        extraInfo = [];
        output.needsResolver = [];
        extraInfo.push(new KeyValue('current', '2'));
        extraInfo.push(new KeyValue('Vidstream', serv['Vidstream']));

        newRequest = new ModuleRequest(`https://9animetv.to/ajax/anime/episode?id=${serv['Streamtape']}`, 'get', referer, null);
    } else if (current == 2) {
        name = 'STREAMTAPE';

        extraInfo = [];
        extraInfo.push(new KeyValue('current', '3'));

        newRequest = new ModuleRequest(`https://9animetv.to/ajax/anime/episode?id=${serv['Vidstream']}`, 'get', referer, null);
    } else {
        name = 'VIDSTREAM';
    }

    let resolver = new Resolver(name, new ModuleRequest(videoUrl, 'get', referer, null));
    output.needsResolver.push(resolver);
    output.rawVideo = null;
}

var episodeObject = new Episodes(newRequest, extra, new JavascriptConfig(true, false, ''), new Output(output, null, null));
var finalJson = JSON.stringify(episodeObject);
var savedDataElement = document.getElementById('ketsu-final-data');
savedDataElement.innerHTML = finalJson;
