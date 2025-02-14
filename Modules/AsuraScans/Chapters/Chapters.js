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

function Package(images) {
	this.images = images;
}

var id = 'ketsu-final-data'
let ketsu = document.createElement('div')
ketsu.setAttribute('id', id)

var emptyKeyValue = [ new KeyValue( '', '' ) ];
let emptyExtra = new Extra([new Commands('', emptyKeyValue)], emptyKeyValue);

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

// Functions
function cleanUrl(url) {
	return (url).trim();
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


let deploySource = () => (Array.from(document.querySelectorAll('[alt*=\"chapter page\"]')).map((images) => (
	new ModuleRequest(images.src,'GET',emptyKeyValue,undefined)
)))

let finish = (images) => {
	var output =  new Output(undefined,images,undefined)
	var chaptersObject = new MChapters( new ModuleRequest( '', '', emptyKeyValue, null ), emptyExtra, new JavascriptConfig( false, false ), output);
	var finalJson = JSON.stringify( chaptersObject );
	document.body.querySelectorAll('#' + id).forEach((el) => (el.remove()))
	document.body.prepend(ketsu)
	ketsu.innerHTML = finalJson;
	window.webkit.messageHandlers.EXECUTE_KETSU_ASYNC.postMessage('');
}

let tries = 0
let maxTries = 15
let interval = setInterval(() => {
	let makeup = deploySource()
	if (makeup.length > 0) {
		clearInterval(interval)
		finish(images)
		return
	}
	tries++
	if (tries > maxTries) {
		finish([]);
	}
},300)