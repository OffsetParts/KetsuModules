function scriptFilter(match) {
    let refinedData = '';
    document.querySelectorAll('script').forEach((elm) => {
        let content = elm.textContent;
        if (content.match('self.__next_f.push') && content.includes(match)) {
            let match = content.match(/self\.__next_f\.push\(\[(\d+),\s*"(.*?)"\]\)/u); if (match) {
                refinedData = JSON.parse(match[2]
                    .replace(/[a-zA-Z0-9]+:/g, '')     // Remove number prefixes
                    .replace(/\\r\\n/g, '\n')          // Replace escaped newlines
                    .replace(/\\"/g, '"')              // Unescape quotation marks
                    .replace(/\\\\/g, '\\')            // Handle any other escape sequences
                    .replace(/\\n$/, ''));
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

let image = findProperties(scriptFilter('series_id'), ['src'])[0]['src']; console.log(image);