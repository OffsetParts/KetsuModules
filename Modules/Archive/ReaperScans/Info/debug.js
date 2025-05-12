function scriptFilter(innerRegex) {
    let refinedData = '';
    let outerFunctionRegex = /self\.__next_f\.push\(\[(\d+),\s*"(.*?)"\]\)/u;
    document.querySelectorAll('script').forEach((element) => {
        let content = element.innerHTML;
			if (content.includes(innerRegex)) {
            	let match = content.match(outerFunctionRegex); if (match) {
                refinedData = JSON.parse(match[2]
                    .replace(/[a-zA-Z0-9]+:/g, '')     // Remove number prefixes
                    .replace(/\\r\\n/g, '\n')          // Replace escaped newlines
                    .replace(/\\"/g, '"')              // Unescape quotation marks
                    .replace(/\\\\/g, '\\')            // Handle any other escape sequences
                    .replace(/\\n$/, '')
				);
            }
        }
    })
    return refinedData;
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
findProperties(scriptFilter('series_id'), ['series_id'])