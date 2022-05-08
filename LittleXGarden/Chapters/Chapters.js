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
    
    function Output( videos, images, text) {
        this.videos = videos;
        this.images = images;
        this.text = text;
    }
    
    function Videos(needsResolver, rawVideo) {
        this.needsResolver = needsResolver;
        this.rawVideo = rawVideo;
    }
    
    function NeedsResolver(resolverIdentifier, link) {
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

    function getValueFromKey(keys,key) {
        for (var x = 0; x < keys.length; x++) {
            let tKey = keys[x];
            if (tKey.key == key) {
                return tKey.value;
            }
        }
        return '';
    }
  
    
    var output = [];

    var savedData = document.getElementById('ketsu-final-data');
    var parsedJson = JSON.parse(savedData.innerHTML);

    var extraInfo = parsedJson.extra.extraInfo;
    var count = parseInt(getValueFromKey(extraInfo,'count')) + 1;
    if (count > 2) {
        output = parsedJson.output.images;
    }
    
    var emptyKeyValue = [new KeyValue('', '')];
    var imgsHeaders = [new KeyValue('Referer', parsedJson.request.url)];

    var newRequest = parsedJson.request.url.replace((count - 1) + '.html', count + '.html');

    extraInfo[0].value = ''  + count;

    var imagesExtract = document.querySelector('body').querySelectorAll('p')[5].innerText.split(',__typename:d},{colored:a,original:');
    for (images of imagesExtract) {
        if (images.includes('original:')) {
            images = images.split('colored:a,original:')[1].split('\"')[1];
        } else if (images.includes(',__typename')) {
            images = images.split(',__typename')[0].split('\"')[1];
        } else {
            images = images.split('\"')[1];
        }
        var img = 'https://littlexgarden.com/static/images/webp/' + images + '.webp';
        output.push(new ModuleRequest(img,'get',imgsHeaders,null));
    }
        
    let emptyExtra = new Extra([new Commands('', emptyKeyValue)], extraInfo);
    var chaptersObject = new Chapters(new ModuleRequest(newRequest, 'get', emptyKeyValue, null), emptyExtra, new JavascriptConfig(true, false, ''), new Output(null, output, null));
    var finalJson = JSON.stringify(chaptersObject);
    savedData.innerHTML = finalJson;