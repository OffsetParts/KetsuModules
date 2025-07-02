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

function scriptFilter(match) {
	let refinedData = '';
    document.querySelectorAll('script').forEach((element) => {
        let content = element.textContent;
        if (content.match('self.__next_f.push') && content.includes(match)) {
            let match = content.match(/self\\.__next_f\\.push\\(\\[(\\d+),\\s*\"(.*?)\"\\]\\)/u); if (match) {
                refinedData = JSON.parse(match[2]
                .replace(/[a-zA-Z0-9]+:/g, '')              // Remove any alphanumeric prefix followed by a colon
                .replace(/\\\\r\\\\n/g, '\\n')          // Replace escaped newlines
                .replace(/\\\\\"/g, '\"')              // Unescape quotation marks
                .replace(/\\\\\\\\/g, '\\\\')            // Handle any other escape sequences
                .replace(/\\\\n$/, '')
			);
		}}
    });
    return refinedData
}

function findProperties(obj, keysToFind) {
	let results = [];

	function recursiveSearch(obj) {
		if (typeof obj === 'object' && obj !== null) {
			// Check if all keysToFind exist in the current object
			let foundKeys = keysToFind.every(key => key in obj); if (foundKeys) {
				// Push the entire object containing all keysToFind
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

function getText(node, accumulator = []) {
    function decodeCorruptedText(text) {
        // Converts corrupted UTF-8 text interpreted as Latin-1 back to clean UTF-8
        const bytes = Uint8Array.from(text, c => c.charCodeAt(0));
        const decoder = new TextDecoder('utf-8');
        return decoder.decode(bytes);
    }

    if (node.nodeType === Node.TEXT_NODE) {
        accumulator.push(decodeCorruptedText(node.textContent));
    } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() !== 'script') {
        for (let child of node.childNodes) {
            getText(child, accumulator);
        }
    }
    return cleanText(accumulator.join(' ')).trim();
}

var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);
let emptyKeyValue = [new KeyValue('', '')];

var preset = {
    extra : new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), // [new KeyValue('base', parsedJson.request.url)]
    javascriptConfig : new JavascriptConfig(true, true, ''),
}

// Details
var title = cleanText(document.querySelector('h1').textContent);
var image = quickRequest(document.querySelector('img[alt][fetchpriority]').src);

var Synopsis = getText(document.querySelector('div[class=\"text-muted-foreground\"]'));

var genres = Array.from(document.querySelectorAll('section > div > div > [class*=flex-row] > [class*=FFC5C5')).map(g => g.textContent);
var state = document.querySelector('section > div > div > [class*=flex-row] > [class*=E1F0DA').textContent;
var releaseYear = document.querySelectorAll('span[class=\"text-muted-foreground\"]')[1].textContent;
var chapterAmount = document.querySelectorAll('span[class=\"text-muted-foreground line-clamp-1\"]')[1].textContent

// Chapters
let id = findProperties(scriptFilter('series_id'), ['series_id'])[0]['series_id'];
let dataUrl = `https:\/\/api.reaperscans.com/chapters/${id}?perPage=9999&order=asec`;

let infoPageObject = new Info(
    new ModuleRequest(dataUrl, 'get', emptyKeyValue, null),
    preset.extra,
    preset.javascriptConfig,
    new Output(image, title, parsedJson.request, Synopsis, genres, releaseYear, state, '', 'Chapters: ' + chapterAmount, [])
);

savedData.innerHTML = JSON.stringify(infoPageObject);
window.webkit.messageHandlers.EXECUTE_KETSU_ASYNC.postMessage('');