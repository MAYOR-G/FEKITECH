import fs from 'fs';
import postcss from 'postcss';
import sortMediaQueries from 'postcss-sort-media-queries';

const CSS_FILE = 'src/styles.css';

async function consolidate() {
  const css = fs.readFileSync(CSS_FILE, 'utf8');
  
  const result = await postcss([
    sortMediaQueries({ sort: 'desktop-first' }) // assuming max-width approach
  ]).process(css, { from: CSS_FILE, to: CSS_FILE });
  
  fs.writeFileSync(CSS_FILE, result.css);
  console.log('CSS media query consolidation completed successfully.');
}

consolidate().catch(console.error);
