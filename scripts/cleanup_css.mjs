import fs from 'fs';
import postcss from 'postcss';

const CSS_FILE = 'src/styles.css';
const UNUSED_CLASSES_FILE = 'unused_classes_strict.txt';

async function cleanup() {
  const css = fs.readFileSync(CSS_FILE, 'utf8');
  const unusedClasses = new Set(
    fs.readFileSync(UNUSED_CLASSES_FILE, 'utf8')
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
  );

  const plugin = () => {
    return {
      postcssPlugin: 'cleanup-unused',
      Once(root) {
        // Walk through all rules
        root.walkRules((rule) => {
          // We will filter the selectors
          const newSelectors = [];
          let modified = false;

          for (const selector of rule.selectors) {
            // Find all classes in this selector part
            const classMatches = selector.match(/\.([\w-]+)/g);
            let hasUnused = false;

            if (classMatches) {
              for (const cls of classMatches) {
                const className = cls.substring(1); // remove dot
                if (unusedClasses.has(className)) {
                  hasUnused = true;
                  break;
                }
              }
            }

            if (hasUnused) {
              modified = true;
            } else {
              newSelectors.push(selector);
            }
          }

          if (modified) {
            if (newSelectors.length === 0) {
              rule.remove(); // Remove the entire rule
            } else {
              rule.selectors = newSelectors; // Update selectors
            }
          }
        });

        // Walk through all at-rules (e.g. @media) and remove empty ones
        let removedAtRule;
        do {
          removedAtRule = false;
          root.walkAtRules((atRule) => {
            if (atRule.nodes && atRule.nodes.length === 0) {
              atRule.remove();
              removedAtRule = true;
            }
          });
        } while (removedAtRule);
      }
    };
  };
  plugin.postcss = true;

  const result = await postcss([plugin()]).process(css, { from: CSS_FILE, to: CSS_FILE });
  fs.writeFileSync(CSS_FILE, result.css);
  console.log('CSS cleanup completed successfully.');
}

cleanup().catch(console.error);
