
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
var emptyKeyValue = [new KeyValue('Referer',parsedJson.request.url)];

var videos = [];
let playerRegex = /innerHTML\s=\s*\"([^\"]+)\"\s?\+\s?''\+\s?\('([^']+)/;
let body = document.body.innerText;
let match = playerRegex.exec(body);

if (match) {
    let firstPart = match[1].split('=')[1]?.replace('\"', '');
    let secondPart = match[2].substr(4); // Covers both cases (5 or 4)
    let videoLink = `https:\/\/streamta.pe/get_video?id=${firstPart}${secondPart}&stream=1`;

    videos.push(new Video('THAI GUY WAS HERE', new ModuleRequest(videoLink, 'get', emptyKeyValue, null)));
    
    // Additional matches for 'id=' or other patterns
    let matchedLink = match[2];
    let idMatch = matchedLink.match(/id=([^&]+)/);
    
    if (idMatch) {
        let videoId = idMatch[1];
        let altVideoLink = `https:\/\/streamta.pe/get_video?id=${videoId}&stream=1`;
        videos.push(new Video('Normal', new ModuleRequest(altVideoLink, 'get', emptyKeyValue, null)));
    }

    console.log(videoLink);
}

let emptyExtra = new Extra([new Commands('',emptyKeyValue)],emptyKeyValue);

var chaptersObject = new Resolver(new ModuleRequest('','',emptyKeyValue,null),emptyExtra,new JavascriptConfig(false,false,''), new Output(videos));
var finalJson = JSON.stringify(chaptersObject);
savedData.innerHTML = finalJson;
