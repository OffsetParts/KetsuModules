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

function JavascriptConfig(removeJavascript, loadInWebView) {
	this.removeJavascript = removeJavascript;
	this.loadInWebView = loadInWebView;
	this.javaScript = '';
}

function KeyValue(key, value) {
	this.key = key;
	this.value = value;
}

function Package(images) {
	this.images = images;
}

var id = 'ketsu-final-data';
let ketsu = document.createElement('div');
ketsu.setAttribute('id', id);

var emptyKeyValue = [ new KeyValue( '', '' ) ];
let emptyExtra = new Extra([new Commands('', emptyKeyValue)], emptyKeyValue);

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

// Functions
function cleanUrl(url) {
	return (url).trim();
}

function quickRequest(url) {
	return new ModuleRequest(cleanUrl(url), 'GET', emptyKeyValue, null);
}

let deploySource = () => (
	Array.from(document.querySelectorAll('[alt*=\"chapter page\"]')).map((img) => (quickRequest(img.src)))
);

let finish = (images) => {
	var chaptersObject = new Chapters( new ModuleRequest( '', '', emptyKeyValue, null ), emptyExtra, new JavascriptConfig( false, false ), new Package(images));
	var finalJson = JSON.stringify( chaptersObject );
	document.body.querySelectorAll('#' + id).forEach((el) => (el.remove()));
	document.body.prepend(ketsu);
	ketsu.innerHTML = finalJson;
	window.webkit.messageHandlers.EXECUTE_KETSU_ASYNC.postMessage('');
}

let tries = 0;
let maxTries = 15;
let interval = setInterval(() => {
    let initial = deploySource();
    if (initial.length > 0) {
        clearInterval(interval);
        finish(initial);
        return;
    }
    tries++;
    if (tries > maxTries) {
        finish([]);
    }
}, 300);