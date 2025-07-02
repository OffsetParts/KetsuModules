function isObject(value) {
	return typeof value === 'object' && value !== null;
}

function deepAutoParse(obj) {
  if (typeof obj === "string") {
    try {
      const parsed = JSON.parse(obj);
      return deepAutoParse(parsed);
    } catch {
      return obj;
    }
  } else if (Array.isArray(obj)) {
    return obj.map(deepAutoParse);
  } else if (typeof obj === "object" && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, deepAutoParse(v)])
    );
  }
  return obj;
}


function scriptFilter(innerRegex) {
    let refinedData = '';
    let outerFunctionRegex = /self.__next_f.push\(\[(\d+),s*"(.*?)"\]\)/u;
    document.querySelectorAll('script').forEach((element) => {
        let content = element.innerHTML;
			if (content.includes(innerRegex)) {
            	let match = content.match(outerFunctionRegex); if (match) {
                refinedData = deepAutoParse(match[2]
                    .replace(/[a-zA-Z0-9]+:/g, '')
					.replace(/\\n$/, '')
					.replace(/\\"/g, '"')
				);
            }
        }
    })
    return refinedData;
}

function matchesCriteria(obj, criteria) {
	return Object.entries(criteria).every(([key, { type, value }]) => {
		if (!(key in obj)) return false;
		if (typeof obj[key] !== type) return false;

		if (value !== undefined) {
			const val = obj[key];
			if (type === 'string' && value instanceof RegExp) return value.test(val);
			if (type === 'number' && typeof value === 'function') return value(val);
			return val === value;
		}
		return true;
	});
}

function dynamicCriteriaSearch(obj, criteria) {
	const results = [];

	function search(node) {
		if (Array.isArray(node)) {
			node.forEach(search);
		} else if (isObject(node)) {
			if (matchesCriteria(node, criteria)) results.push(node);
			Object.values(node).forEach(search);
		}
	}

	search(obj);
	return results;
}


function hasKeys(obj, keys) {
	return keys.every(k => k in obj);
}

function findWhere(obj, predicate) {
	const results = [];

	function search(node) {
		if (isObject(node)) {
			if (predicate(node)) results.push(node);
			Object.values(node).forEach(search);
		}
	}

	search(obj);
	return results;
}

function encodeFunction(fn) {
    return btoa(fn.toString());
}

function decodeFunction(encoded) {
    eval(atob(encoded));
}

let goatCriteria = { 'value': { type: 'string', value: 'all' } };

let GOATData = []; let goatData = dynamicCiteriaSearch(scriptFilter('{\\"value\\":\\"all\\"'), goatCriteria); if (goatData) {
	GOATData = Array.from(goatData[0]['children']).map(list => {
        const info = findWhere(list, node => hasKeys(node, ['href', 'children']));
		let title = info[1].children;
		var link = info[1].href;
		var image = 'https:' + findWhere(list, node =>  hasKeys(node, ['src']))[0].src;
		console.log({title, link, image});
	});
}