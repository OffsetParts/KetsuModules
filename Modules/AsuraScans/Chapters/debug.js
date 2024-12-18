// Functions
function cleanUrl(url) {
	return 'https:' + (url).trim();
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

function matchElementsWithRegexes(selector, regexList, property) {
    let matchedElements = [];

    // Query all matching elements by the selector
    const elements = document.querySelectorAll(selector);

    elements.forEach((element) => {
        let value;

        // Handle property or attribute
        if (property.startsWith("attr:")) {
            const attrName = property.split(":")[1];
            value = element.getAttribute(attrName) || "";
        } else {
            value = element[property] || "";
        }

        // Check if all regexes match the value
        const allRegexesMatch = regexList.every((regex) => regex.test(value));

        if (allRegexesMatch) {
            // console.log(value);
            matchedElements.push(element);
        }
    });

    return matchedElements;
}

function filtrateCache (cachedData) {
    // Cache is the clumped data that we seek to filtrate for the desired specificed data
    let refinedData = '';
    let outerFunctionRegex = /self\.__next_f\.push\(\[(\d+),\s*"(.*?)"\]\)/u;
    let match = cachedData.match(outerFunctionRegex); if (match) {
        refinedData = JSON.parse(match[2]
        .replace(/[a-zA-Z0-9]+:/g, '')     // Remove number prefixes
        .replace(/\\r\\n/g, '\n')          // Replace escaped newlines
        .replace(/\\"/g, '"')              // Unescape quotation marks
        .replace(/\\\\/g, '\\')            // Handle any other escape sequences
        .replace(/\\n$/, ''));
    }
    return refinedData;
}

const matchedContent = matchElementsWithRegexes("p", [/{\\\"order\\\":(\d+),\\\"url\\\":\\\"(.*?)\\\"}/g, /\\"pages\\"/], "textContent")[0].textContent;

let imageUrls = Array.from(findProperties(filtrateCache(matchedContent), ["url", "order"])).map(list => {
    console.log('https:' + list.url);
});