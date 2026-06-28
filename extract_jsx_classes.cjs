const fs = require('fs');
const jsx = fs.readFileSync('src/App.jsx', 'utf-8');
const classRegex = /className=(?:["']([^"']+)["']|\{`([^`]+)`\})/g;
let match;
const classes = new Set();
while ((match = classRegex.exec(jsx)) !== null) {
  const classString = match[1] || match[2];
  if (classString) {
    const staticParts = classString.replace(/\$\{[^}]+\}/g, ' ').split(/\s+/);
    staticParts.forEach(c => {
      if (c) classes.add(c);
    });
  }
}

// Add dynamic conditionals inside ${... ? "class1" : "class2"}
const dynamicClassRegex = /\?\s*["']([^"']+)["']\s*:\s*["']([^"']*)["']/g;
while ((match = dynamicClassRegex.exec(jsx)) !== null) {
  if (match[1]) match[1].split(' ').forEach(c => { if(c) classes.add(c); });
  if (match[2]) match[2].split(' ').forEach(c => { if(c) classes.add(c); });
}
const dynamicClassRegex2 = /&&\s*["']([^"']+)["']/g;
while ((match = dynamicClassRegex2.exec(jsx)) !== null) {
  if (match[1]) match[1].split(' ').forEach(c => { if(c) classes.add(c); });
}
const dynamicClassRegex3 = /pathname === ["'][^"']+["'] \? ["']([^"']+)["'] : ["']([^"']+)["']/g;
while ((match = dynamicClassRegex3.exec(jsx)) !== null) {
  if (match[1]) match[1].split(' ').forEach(c => { if(c) classes.add(c); });
  if (match[2]) match[2].split(' ').forEach(c => { if(c) classes.add(c); });
}


for (let i = 1; i <= 12; i++) {
  classes.add(`service-visual-${i.toString().padStart(2, '0')}`);
}
const gsapClasses = ["count-up", "hero-label", "hero", "hero-actions", "section-intro", "transform-header", "challenge-card", "fos-node", "transform-grid", "result-card", "why-reasons", "number-card", "simple-card-grid", "method-steps", "blog-list-card", "blog-card", "pricing-card", "about-simple-visual", "about-simple-copy", "mission-panel", "service-rows", "blog-featured-copy", "blog-featured-image", "article-page", "article-hero-image", "article-inline-image", "audit-form", "audit-side-card", "footer-column", "footer-brand", "outcomes-image", "page-image"];
gsapClasses.forEach(c => classes.add(c));

fs.writeFileSync('used_classes.txt', [...classes].sort().join('\n'));
