// Current model of extracting data from the website
function scriptFilter(match, obj) {
  document.querySelectorAll('script').forEach((elm) => {
      let content = elm.innerHTML;
      if (content.match('self.__next_f.push') && content.includes(match)) {
          const regex = /self\.__next_f\.push\(\[(\d+),\s*"(.*?)"\]\)/u;
          let match = content.match(regex); if (match) {
              var dictionary = match[2]
              .replace(/[a-zA-Z0-9]+:/g, '')     // Remove number prefixes
              .replace(/\\r\\n/g, '\n')          // Replace escaped newlines
              .replace(/\\"/g, '"')              // Unescape quotation marks
              .replace(/\\\\/g, '\\')            // Handle any other escape sequences
              .replace(/\\n$/, '');
              obj.array = JSON.parse(dictionary);
          }
      }
  });
}

function dynamicCiteriaSearch(obj, criteria) {
  let results = [];

  function recursiveSearch(obj) {
      if (Array.isArray(obj)) {
          obj.forEach(item => {
              if (typeof item === "object" && item !== null) {
                  let matches = Object.keys(criteria).every(key => {
                      const expectedType = criteria[key].type;
                      const valueType = typeof item[key];

                      // Check if key exists and type matches
                      if (expectedType && valueType === expectedType) {
                          const expectedValue = criteria[key].value;

                          // If a specific value is provided, check it
                          if (expectedValue !== undefined) {
                              // Handle specific value checks based on type
                              if (valueType === 'string' && expectedValue instanceof RegExp) {
                                  // Use regex for string matching
                                  return expectedValue.test(item[key]);
                              } else if (valueType === 'number' && typeof expectedValue === 'function') {
                                  // Use a function for number matching (e.g., range check)
                                  return expectedValue(item[key]);
                              } else {
                                  return item[key] === expectedValue;
                              }
                          }
                          return true; // No specific value check, just type match
                      }
                      return false;
                  });

                  if (matches) {
                      results.push(item); // Push the matched object, not the parent array
                  }
              }
          });
      }

      // Continue searching nested objects
      if (typeof obj === "object" && obj !== null) {
          for (let key in obj) {
              recursiveSearch(obj[key]);
          }
      }
  }

  recursiveSearch(obj);
  return results;
}

function findProperties(obj, keysToFind) {
  let results = [];

  function recursiveSearch(obj) {
      if (typeof obj === "object" && obj !== null) {
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

let FeaturedData = { array: [] }; scriptFilter('sliders', FeaturedData);
let Featured = []; const sliderData = findProperties(FeaturedData.array, ['sliders']);
if (sliderData) {
	Featured = Array.from(sliderData[0]['sliders']).map(list => {
		let title = list['name'];
		var link = 'series/' + list['slug'];
		var image = 'https:' + list['thumb_large'];
        console.log({ title, link, image });
	});
}