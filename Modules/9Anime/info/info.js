try {

    var KETSU_ASYNC = true;

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

    // Helper Functions
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

    // Data Collection
    var episodeID = document.querySelector('#wrapper').dataset.id
    var savedData = document.getElementById('ketsu-final-data') || document.body.querySelector('div');
    var parsedJson = JSON.parse(savedData.innerHTML);
    
    let KeyValues = [ new KeyValue( 'Referer', parsedJson.request.url ), new KeyValue( 'X-Requested-With', 'XMLHttpRequest' ) ];
    var commands = [new Commands('', KeyValues)];

    let params  = new URLSearchParams(new URL(parsedJson.request.url).searchParams);
    const info = document.querySelector('div.film-infor');

    let meta = {}; const metaArr = info.querySelectorAll('.meta > div > div');
    for (const index of metaArr) {
        let str = index.textContent.split(':');
        const key = str[0].trim().replace(' ', '-'); //.toLowerCase();
        const value = str[1].trim();
        meta[key] = value;
    }

    // Info
    var episodes = [];
    var type    = meta.Type ? meta.Type : 'TV';
    var airing  = meta.Status ? meta.Status : 'On Going';
    var genres  = Array.from(metaArr[4].querySelectorAll('a')).map(g => g.textContent);
    var synopsis = info.querySelector('div.film-description p').textContent.trim();
    var title   = info.querySelector('h2.film-name').textContent.trim();
    var image   = document.querySelector('div.film-poster img').src; image = new ModuleRequest(image, 'get', emptyKeyValue, null);

    var nextRequest = `https://9animetv.to/ajax/episode/servers?episodeId=${episodeID}`;

    // Episode Logging
    var episodeList = document.querySelectorAll('div.episodes-ul a'); 
    async function doStuff() {
        await sleep(500).then(() => {
            if (episodeList.length != 0) {
                for (let index of episodeList) {
                    let title = `Episode ${index + 1} - ${index.querySelector('a').title}`; console.log(title);
                    let link = index.querySelector('a').href;
                    let obj = new Chapter(title, new ModuleRequest(link, 'get', KeyValues, null), false);
                    episodes.push(obj);
                }
            }
        });

        var infoPageObject = new Info(new ModuleRequest(nextRequest, 'get', KeyValues, null), new Extra(commands, emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title, parsedJson.request, synopsis, genres, airing, 'Anime', type, 'Eps: ' + episodes.length, episodes));
        var finalJson = JSON.stringify(infoPageObject);
        savedData.innerHTML = finalJson;
        window.webkit.messageHandlers.EXECUTE_KETSU_ASYNC.postMessage('');
    }

    doStuff();

} catch (e) {
    console.error(e.message);

    if (typeof KETSU_ASYNC !== 'undefined') {
        window.webkit.messageHandlers.EXECUTE_KETSU_ASYNC.postMessage('');
    }
}