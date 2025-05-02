/**
 * Simple JavaScript Minifier Script.
 * 
 * Removes comments and unnecessary whitespace from JavaScript code, 
 * and optionally shortens variable names. Designed to be self-contained 
 * and easy to use as a VS Code task or snippet.
 * 
 * Usage: 
 *    Call the minifyCode(code, options) function to get a minified version of `code`. 
 *    If run as a Node script (e.g. via VS Code Task), it can read an input file and output the result.
 */
function minifyCode(code, options = {}) {
  const shrinkVars = options.mangle || options.shrinkVars || false;  // whether to shorten variable names
  let script = code;
  
  // Step 1: Protect strings and regex literals by temporarily replacing them with placeholders.
  const strings = [];
  const regexes = [];
  
  // Helper to replace strings with placeholders
  script = script.replace(/'(\\.|[^'\\])*'|"(\\.|[^"\\])*"/g, (match) => {
    strings.push(match);
    // Return a unique placeholder of form __STR0__, __STR1__, etc.
    return `__STR${strings.length - 1}__`;
  });
  
  // Helper to replace regex literals with placeholders.
  // This regex attempts to match JS regex literals (excluding ones that look like comments).
  script = script.replace(/\/(?!\/|\*)(?:\\.|[^\/\n\\])*\/[gimsuy]*/g, (match) => {
    regexes.push(match);
    return `__REGEX${regexes.length - 1}__`;
  });
  
  // Step 2: Remove comments (now that strings/regex are safe).
  // Remove line comments (//...) – replace them with an empty string.
  script = script.replace(/\/\/[^\n]*\n?/g, "");  
  // Remove block comments (/*...*/) – replace with a space to avoid merging tokens accidentally.
  script = script.replace(/\/\*[\s\S]*?\*\//g, " ");
  
  // Step 3: Remove unnecessary whitespace.
  // We’ll preserve specific spaces using a placeholder (\x01) where needed, then remove all other whitespace.
  
  // Preserve space between a number and a dot (e.g. "5 .toString") to avoid turning it into "5.toString" (which would be a valid number literal "5." and then property).
  script = script.replace(/(\d)\s+(\.\s*[A-Za-z_$\[\(])/g, "$1\x01$2");
  
  // Preserve space between ++ or -- sequences (e.g. "a + ++b" → "a+ ++b") to avoid "a+++b").
  script = script.replace(/([+\-])\s+([+\-])/g, "$1\x01$2");
  
  // Preserve space around the $ identifier in tricky cases (e.g. "return $object" or "var $ in obj"):
  script = script.replace(/\b\s+\$\s+\b/g, "\x01$\x01");  // space on both sides of standalone $
  script = script.replace(/\$\s+\b/g, "$\x01");           // space after $ (end of identifier)
  script = script.replace(/\b\s+\$/g, "\x01$");           // space before $ (start of identifier)
  
  // Collapse remaining multiple whitespace between words to a single space (placeholder).
  script = script.replace(/\b\s+\b/g, "\x01");
  
  // Remove all other whitespace (spaces, newlines, tabs, etc.).
  script = script.replace(/\s+/g, "");
  
  // Restore the preserved spaces (placeholders \x01 back to real space).
  script = script.replace(/\x01/g, " ");
  
  // Step 4: Optional variable name shortening (mangling).
  if (shrinkVars) {
    // Find all variable and function parameter names.
    const allNames = new Set();
    const namesToShorten = [];
    
    // Find variable declarations (var, let, const) and extract names.
    // This regex finds "var x = ..." or "let x,y=..." up to the semicolon.
    const varDeclRegex = /\b(?:var|let|const)\s+([^;]+);/g;
    let declMatch;
    while ((declMatch = varDeclRegex.exec(script)) !== null) {
      const declList = declMatch[1];  // e.g. "longVar=1, anotherVar"
      // Split by commas not including the semicolon (we already stopped at ;).
      const vars = declList.split(",");
      for (const v of vars) {
        const nameMatch = v.match(/\s*([A-Za-z_$][\w$]*)/);
        if (nameMatch) {
          const varName = nameMatch[1];
          allNames.add(varName);
          if (varName.length > 1) {
            namesToShorten.push(varName);
          }
        }
      }
    }
    // Find function definitions and extract parameter names.
    const funcDeclRegex = /\bfunction\s+[A-Za-z_$]*\s*\(([^)]*)\)/g;
    let funcMatch;
    while ((funcMatch = funcDeclRegex.exec(script)) !== null) {
      const params = funcMatch[1].split(",");
      for (const p of params) {
        const paramName = p.trim();
        if (paramName) {
          allNames.add(paramName);
          if (paramName.length > 1) {
            namesToShorten.push(paramName);
          }
        }
      }
    }
    // (Note: Arrow functions and catch block variables could be added similarly if needed)
    
    // Remove duplicates from namesToShorten
    const uniqueNames = [...new Set(namesToShorten)];
    
    // Reserved words to avoid (cannot use as variable names)
    const reservedWords = new Set(["do","if","in","for","let","var","new","try","else","case","enum",
                                   "null","this","true","false","void","with","await","break","catch",
                                   "class","const","super","throw","while","yield","delete","export",
                                   "import","public","return","static","switch","typeof","default",
                                   "extends","finally","package","private","continue","debugger",
                                   "function","arguments"]);
    
    // Generate short names for each long name.
    const shortMap = new Map();
    let count = 0;
    // Base52-like generator: 0->'a', 1->'b', ... 25->'z', 26->'A', ... 51->'Z', 52->'ba', etc.
    function encode52(num) {
      const letters = [];
      do {
        let rem = num % 52;
        let letter = String.fromCharCode(rem < 26 ? 97 + rem    // 0-25 -> 'a'-'z'
                                                : 65 + (rem - 26)); // 26-51 -> 'A'-'Z'
        letters.unshift(letter);
        num = Math.floor(num / 52) - 1;
      } while (num >= 0);
      return letters.join("");
    }
    for (const origName of uniqueNames) {
      let shortName;
      // Find the next short name that is not reserved and not already in use in the code.
      do {
        shortName = encode52(count++);
      } while (reservedWords.has(shortName) || allNames.has(shortName));
      shortMap.set(origName, shortName);
      // Mark this short name as used to avoid reusing it for another variable.
      allNames.add(shortName);
    }
    
    // Replace all occurrences of each long name with its short name.
    // Use regex with word boundaries, and ensure we don't replace occurrences that are part of longer names or object property keys.
    for (const [oldName, newName] of shortMap) {
      const identifierRegex = new RegExp(`(?<![0-9A-Za-z_$\\.])${oldName}(?![0-9A-Za-z_$:])`, "g");
      script = script.replace(identifierRegex, newName);
    }
  }
  
  // Step 5: Restore original strings and regexes from placeholders.
  strings.forEach((str, i) => {
    script = script.replace(`__STR${i}__`, str);
  });
  regexes.forEach((regex, i) => {
    script = script.replace(`__REGEX${i}__`, regex);
  });
  
  return script;
}

// --- If this script is run directly via Node.js, allow file input/output ---
if (typeof require !== 'undefined' && require.main === module) {
  const fs = require('fs');
  const clipboard = require('clipboardy');

  const [inputFile] = process.argv.slice(2);

  if (!inputFile) {
    console.error("Usage: node minify.js <input-file>");
    process.exit(1);
  }

  try {
    const codeText = fs.readFileSync(inputFile, "utf8");
    const result = minifyCode(codeText, { mangle: true });
    clipboard.default.writeSync(result);
    console.log("✅ Minified code copied to clipboard.");
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}