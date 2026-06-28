const fs = require('fs');

const jsx = fs.readFileSync('src/App.jsx', 'utf-8');
// Get all word-like strings from JSX (including alphanumeric and dashes)
const jsxWords = new Set(jsx.match(/[a-zA-Z0-9_-]+/g));

const css = fs.readFileSync('src/styles.css', 'utf-8');
const cssNoComments = css.replace(/\/\*[\s\S]*?\*\//g, '');
const cssClean = cssNoComments.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '');

const classRegex = /\.([a-zA-Z_-][a-zA-Z0-9_-]*)/g;
const definedClasses = new Set();
let match;
while ((match = classRegex.exec(cssClean)) !== null) {
  definedClasses.add(match[1]);
}

const unusedClasses = [...definedClasses].filter(c => !jsxWords.has(c));
fs.writeFileSync('unused_classes_strict.txt', unusedClasses.join('\n'));

console.log(`Defined classes in CSS: ${definedClasses.size}`);
console.log(`Potentially unused classes (strict): ${unusedClasses.length}`);
