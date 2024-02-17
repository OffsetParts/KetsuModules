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

var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);
let emptyKeyValue = [new KeyValue('', '')];

const meta = document.querySelectorAll('div.col-lg-7 > h4');

let info = {};

for (const m of meta) {
    let key = m.textContent.replace(':', '').trim().toLowerCase();
    let content = m.nextElementSibling.nextElementSibling;
    if (key == 'genre') {
        const links = Array.from(content.querySelectorAll('a'));
        info[key] = links.map(l => l.textContent);
    } else if (key == 'release') {
        info[key] = content.textContent.trim();
        key = content.nextElementSibling.querySelector('h4');
        content = key.nextElementSibling.nextElementSibling.textContent.toLowerCase();
        key = key.textContent.replace(':', '').trim().toLowerCase();
        info[key] = content.replace('from imdb', '').trim();
    }
}
var episodes = [];
var type = parsedJson.request.url.includes('/M') ? 'Movie' : 'TV-Series';
var rating = info.rating;
var status = info.release.length > 5 ? 'Completed' : 'OnGoing';
var genres = info.genre;
var desc = document.querySelector('p#wrap').textContent.trim().replace(/&quot;|\"/g, '\\');
var title = document.querySelector('.hidden - lg > div > h4 ').textContent.trim();
var image = document.querySelector('.hidden - lg > div > .thumbnail > img ').src;

image = image.indexOf(' / ') === 0 ? new URL(image, parsedJson.request.url).href : image; 
image = new ModuleRequest(image, 'get ', emptyKeyValue, null);

if (parsedJson.request.url.includes(' / M ')) { 
    episodes.push(new Chapter('Movie ', new ModuleRequest(parsedJson.request.url, 'get ', emptyKeyValue), false));
} else {
     const seasonsEle = document.querySelectorAll('.alert.alert - info - ex '); 
     for (const seasonEle of seasonsEle) { let season = seasonEle.querySelector('h4 ').textContent; season = season.replace(': ', '').toLowerCase(); season = season.replace('season ', '').trim(); 
     const eps = seasonEle.querySelectorAll('.col - sm - 12 > .myp1 > a '); 
        for (const ep of eps) { 
            const epSp = ep.textContent.split('.'); 
            let link = new URL(ep.href, parsedJson.request.url).href; link = new ModuleRequest(link, 'get ', emptyKeyValue, null); 
            episodes.push(new Chapter(`S${season}E${epSp[0]} ${epSp[1]}`, link, false)); 
        } 
    } 
}

let infoPageObject = new Info(
    new ModuleRequest('', '', emptyKeyValue, null), 
    new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), 
    new JavascriptConfig(false, false, ''), 
    new Output(image, title, parsedJson.request, desc, genres, status, type, rating, 'Eps: ' + episodes.length, episodes.reverse())
);

var finalJson = JSON.stringify(infoPageObject);     
savedData.innerHTML = finalJson;