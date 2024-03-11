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

function getStuff(array, match) {
    for (var x = 0; x < array.length; x++) {
        var data = array[x].innerText;
        if (data.includes(match)) {
            return data.replace(match, '').trim();
        }
    }
}

function getHtmlStuff(array, match) {
    for (var x = 0; x < array.length; x++) {
        var data = array[x].innerText;
        if (data.includes(match)) {
            return array[x];
        }
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerText); // innerHTML
let emptyKeyValue = [new KeyValue('Referer', 'https://9animetv.to/home')];
var commands = [new Commands('', emptyKeyValue)];
var newRequest = new ModuleRequest('', '', emptyKeyValue, null);

let params  = new URLSearchParams(new URL(parsedJson.request.url).searchParams);
const info = document.querySelector('.film-infor');

let meta = {}; const metaArr = info.querySelectorAll('.meta > div > div');
for (const index of metaArr) {
    let str = index.textContent.split(':');
    const key = str[0].trim().replace(' ', '-').toLowerCase();
    const value = str[1].trim();
    meta[key] = value;
}

var episodes = [];
var type    = meta.type ? meta.type : 'TV';
var status  = meta.status ? meta.status : 'On Going';
var genres = []; genres = Array.from(metaArr[4].querySelectorAll('a')).map(g => g.textContent);
var desc    = document.querySelector('.film-description p').textContent.trim();
var title   = info.querySelector('.film-name').textContent.trim();
var image   = document.querySelector('#info > .thumb > div > img').src; image = new ModuleRequest(image, 'get', emptyKeyValue, null);

for (const m of metaArr) {
    let re = m.textContent.split(':');
    const key = re[0].trim().replace(' ', '-').toLowerCase();
    const value = re[1].trim();
    meta[key] = value;
}

var KETSU_ASYNC = true;
async function doStuff() {
    for (var x = 0; x < 13; x++) { // true for when x is less than 13 starting from 0.
        if (episodes.length > 1) {
            break;
        }
        await sleep(500).then(() => {
            let episodeList = document.querySelectorAll('[id=\'episodes-page-1\'] a');
            var total = episodeList.length;
            if (total != 0) {
                for (let index of episodeList) {
                    let title = `Episode - ${index.querySelector('a').title}`;
                    let link = index.querySelector('a').href;
                    let obj = new Chapter(title, new ModuleRequest(link, 'get', emptyKeyValue, null), false);
                    episodes.push(obj);
                }
            }
        });
    }

    var infoPageObject = new Info(new ModuleRequest('', 'get', emptyKeyValue, null), new Extra(commands, emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title, parsedJson.request, desc, genres, status, 'Anime', type, 'Eps: ' + episodes.length, episodes));
    var finalJson = JSON.stringify(infoPageObject);
    savedData.innerHTML = finalJson;
    window.webkit.messageHandlers.EXECUTE_KETSU_ASYNC.postMessage('');
}
doStuff();