
function Resolver(request,extra,javascriptConfig,output) {
    this.request = request;
    this.extra = extra;
    this.javascriptConfig = javascriptConfig;
    this.output  = output;
}

function ModuleRequest(url,method,headers,httpBody) {
    this.url = url;
    this.method = method;
    this.headers  = headers;
    this.httpBody = httpBody;
}

function Extra(commands,extraInfo) {
    this.commands = commands;
    this.extraInfo = extraInfo;
}

function Commands(commandName,params) {
    this.commandName = commandName;
    this.params = params;
}

function JavascriptConfig(removeJavascript,loadInWebView,javaScript) {
    this.removeJavascript = removeJavascript;
    this.loadInWebView = loadInWebView;
    this.javaScript = javaScript;
}

function KeyValue(key,value) {
    this.key = key;
    this.value = value;
}

function Subtitles(link, language) {
    this.link = link;
    this.language = language;
}

function Output(video) {
this.video = video;
}

function Video(videoQuality,videoLink) {
    this.videoQuality = videoQuality;
    this.videoLink = videoLink;
}

function getNext(match,array) {
    for (var x = 0; x < array.length; x++) {
        let mMatch = array[x];
        if (mMatch.includes(match)) {
            return  array[x + 1];
        }
    }
}
    
var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);
var emptyHeaders = [new KeyValue('Referer', parsedJson.request.url)];
let output = new Output([], []);

let retries = 10, currentRetry = 0;

window.failedRetriving = () => {
    clearInterval(intervalID);
    window.webkit.messageHandlers.EXECUTE_KETSU_ASYNC.postMessage('');
};

let intervalID = setInterval(() => {
    if (currentRetry++ > retries) {window.failedRetriving(); return}

    window.webkit.messageHandlers.KETSU_LOG.postMessage(window.jwplayer);

    let item = jwplayer().getPlaylist()?.[0];
    if (!item || item.length === 0) return;

    // Extract subtitles
    output.subs = item.tracks
        .filter(track => track.kind === 'captions')
        .map(caption => new Subtitles(new ModuleRequest(caption.file, 'GET', [], undefined), caption.label));

    // Extract video sources
    output.video = item.allSources.map(source => 
        new Video(source.type, new ModuleRequest(source.file, 'GET', [], undefined))
    );

    let emptyExtra = new Extra([new Commands('', emptyHeaders)], emptyHeaders);
    let chaptersObject = new Resolver(new ModuleRequest('', '', emptyHeaders, null), emptyExtra, new JavascriptConfig(false, false, ''), output);

    savedData.innerHTML = JSON.stringify(chaptersObject);
    clearInterval(intervalID); // Stop retries once successful
    window.webkit.messageHandlers.EXECUTE_KETSU_ASYNC.postMessage('');
}, 1e3);
