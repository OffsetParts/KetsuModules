// Functions
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

function cleanUrl(path) {
	return 'https://reaperscans.com' + (path).trim();
}

function cleanText(str) {
	return str.replace(/[\\n\\t]/g, '').trim();
}

function quickRequest(url, clean) {
	if (clean == true) {
		return new ModuleRequest(cleanUrl(url), 'get', emptyKeyValue, null);
	} else if (clean == false || clean == null) {
		return new ModuleRequest(cleanText(url), 'get', emptyKeyValue, null);
	}
}

function scriptFilter(match) {
    let refinedData = '';
    document.querySelectorAll('script').forEach((elm) => {
        let content = elm.textContent;
        if (content.match('self.__next_f.push') && content.includes(match)) {
            let match = content.match(/self\\.__next_f\\.push\\(\\[(\\d+),\\s*\"(.*?)\"\\]\\)/u); if (match) {
                refinedData = JSON.parse(match[2]
                    .replace(/[a-zA-Z0-9]+:/g, '')              // Remove any alphanumeric prefix followed by a colon
                    .replace(/\\\\r\\\\n/g, '\\n')          // Replace escaped newlines
                    .replace(/\\\\\"/g, '\"')              // Unescape quotation marks
                    .replace(/\\\\\\\\/g, '\\\\')            // Handle any other escape sequences
                    .replace(/\\\\n$/, ''));
            }
        }
    });
    return refinedData;
}

function findProperties(obj, keysToFind) {
	let results = [];

	function recursiveSearch(obj) {
		if (typeof obj === 'object' && obj !== null) {
			let foundKeys = keysToFind.every(key => key in obj); if (foundKeys) {
				results.push(obj);
			}

			// Continue searching nested objects
			for (let key in obj) {
				recursiveSearch(obj[key]);
			}
		}
	}

	recursiveSearch(obj);
	return results;
}

const xhr = new XMLHttpRequest();
var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);
let emptyKeyValue = [new KeyValue('', '')];

var preset = {
    request : new ModuleRequest('', 'get', emptyKeyValue, null),
    extra : new Extra([new Commands('', emptyKeyValue)], emptyKeyValue),
    javascriptConfig : new JavascriptConfig(true, false, ''),
}

// Details
var title = cleanText(document.querySelector('h1').textContent);
var image = quickRequest(findProperties(scriptFilter('series_id'), ['src'])[0]['src'], true);

var Synopsis = cleanText(document.querySelector('.mt-3').textContent);

var genres = ['N/A', 'None', 'Null'];
var AgeRating = document.querySelectorAll('dd.text-neutral-200')[2].textContent;
var status = document.querySelectorAll('dd.text-neutral-200')[3].textContent;
var LastUpdated = document.querySelectorAll('dd.text-neutral-200')[5].textContent;
var chapterAmount = document.querySelectorAll('span.font-medium')[3]

// Chapters
let id = findProperties(scriptFilter('series_id'), ['series_id'])[0]['series_id'];
let dataUrl = `https://api.reaperscans.com/chapter/query?perPage=999&query=&order=asec&series_id=${id}`;

xhr.open("GET", dataUrl, true);

xhr.onload = function () {
    if (xhr.status === 200) {
        console.log("Response:", JSON.parse(xhr.responseText));
    } else {
        console.error("Error:", xhr.status, xhr.statusText);
    }
};

// Set up a callback function to handle network errors
xhr.onerror = function () {
    console.error("Network error");
};

// Send the request
xhr.send();


let infoPageObject = new Info(
    new ModuleRequest('', 'get', emptyKeyValue, null),
    preset.extra,
    preset.javascriptConfig,
    new Output(image, title, parsedJson.request, Synopsis, genres, AgeRating, status, LastUpdated, 'Chapters : ' + chapterAmount, episodes)
);

savedData.innerHTML = JSON.stringify(infoPageObject);