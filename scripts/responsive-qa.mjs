import assert from "node:assert/strict";

const debugPort = process.env.CHROME_DEBUG_PORT || "9222";
const baseUrl = process.env.PREVIEW_URL || "http://localhost:4173";
const testPath = "/services/workflow-automations/";
const widths = [320, 375, 430, 768, 1024, 1280, 1440];

const targets = await fetch(`http://localhost:${debugPort}/json`).then((response) => response.json());
const target = targets.find((item) => item.type === "page");
assert(target?.webSocketDebuggerUrl, "No debuggable Chrome page target found");

const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let messageId = 0;
const pending = new Map();
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (!message.id || !pending.has(message.id)) return;
  const { resolve, reject } = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) reject(new Error(message.error.message));
  else resolve(message.result);
});

function send(method, params = {}) {
  const id = ++messageId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

async function evaluate(expression) {
  const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
await send("Page.enable");
await send("Runtime.enable");

for (const width of widths) {
  await send("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: width <= 1024 });
  await send("Emulation.setTouchEmulationEnabled", { enabled: width <= 1024, maxTouchPoints: width <= 1024 ? 5 : 1 });
  await send("Page.navigate", { url: `${baseUrl}${testPath}` });
  await wait(700);

  const layout = await evaluate(`(() => ({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    h1Count: document.querySelectorAll('main h1').length,
    h1Text: document.querySelector('main h1')?.textContent?.trim(),
    chatbotRight: Math.round(document.querySelector('.chatbot-launcher')?.getBoundingClientRect().right || 0),
    chatbotLeft: Math.round(document.querySelector('.chatbot-launcher')?.getBoundingClientRect().left || 0)
  }))()`);

  assert.equal(layout.innerWidth, width, `${width}px viewport override failed`);
  assert(layout.scrollWidth <= width, `${width}px has horizontal overflow: ${layout.scrollWidth}px`);
  assert.equal(layout.h1Count, 1, `${width}px must render exactly one service H1`);
  assert.match(layout.h1Text, /Move information and action/, `${width}px loaded the wrong route`);
  if (width <= 620) {
    assert(layout.chatbotRight >= width - 14, `${width}px chatbot is not anchored to the right edge`);
    assert(layout.chatbotLeft > width / 2, `${width}px chatbot can obstruct left-aligned service actions`);
  }
}

await send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
await send("Emulation.setTouchEmulationEnabled", { enabled: false, maxTouchPoints: 1 });
await send("Page.navigate", { url: `${baseUrl}${testPath}` });
await wait(500);
await evaluate(`document.querySelector('.nav-dropdown-trigger').click()`);
await wait(180);

const desktopMenu = await evaluate(`(() => {
  const trigger = document.querySelector('.nav-dropdown-trigger');
  const menu = document.querySelector('.nav-dropdown-content');
  const links = [...document.querySelectorAll('.nav-dropdown-link')];
  const rects = links.map((link) => link.getBoundingClientRect());
  return {
    expanded: trigger.getAttribute('aria-expanded'),
    linkCount: links.length,
    menuTop: Math.round(menu.getBoundingClientRect().top),
    triggerBottom: Math.round(trigger.getBoundingClientRect().bottom),
    overlaps: rects.some((rect, index) => index > 0 && rect.top < rects[index - 1].bottom - 0.5),
    maxLinkRight: Math.max(...rects.map((rect) => rect.right)),
    menuVisible: getComputedStyle(menu).visibility
  };
})()`);

assert.equal(desktopMenu.expanded, "true", "Desktop Services trigger did not open");
assert.equal(desktopMenu.linkCount, 12, "Desktop Services menu must contain twelve links");
assert(!desktopMenu.overlaps, "Desktop Services links overlap");
assert(desktopMenu.menuTop >= desktopMenu.triggerBottom - 4, "Desktop Services menu does not sit below its trigger");
assert(desktopMenu.maxLinkRight <= 1280, "Desktop Services menu is clipped by the viewport");
assert.equal(desktopMenu.menuVisible, "visible", "Desktop Services menu is not visible after opening");

await evaluate(`document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))`);
await wait(200);
assert.equal(await evaluate(`document.querySelector('.nav-dropdown-trigger').getAttribute('aria-expanded')`), "false", "Escape did not close the desktop Services menu");

await evaluate(`document.querySelector('.nav-dropdown-trigger').click()`);
await wait(80);
await evaluate(`document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }))`);
await wait(200);
assert.equal(await evaluate(`document.querySelector('.nav-dropdown-trigger').getAttribute('aria-expanded')`), "false", "Outside click did not close the desktop Services menu");

await send("Emulation.setDeviceMetricsOverride", { width: 430, height: 900, deviceScaleFactor: 1, mobile: true });
await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
await send("Page.navigate", { url: `${baseUrl}${testPath}` });
await wait(500);
await evaluate(`document.querySelector('.menu-button').click()`);
await wait(100);
await evaluate(`document.querySelector('.mobile-services-trigger').click()`);
await wait(220);

const mobileMenu = await evaluate(`(() => ({
  navigationExpanded: document.querySelector('.menu-button').getAttribute('aria-expanded'),
  servicesExpanded: document.querySelector('.mobile-services-trigger').getAttribute('aria-expanded'),
  serviceLinkCount: document.querySelectorAll('.mobile-services-list a[href^="/services/"]').length,
  scrollWidth: document.documentElement.scrollWidth,
  panelScrollHeight: document.querySelector('.mobile-panel').scrollHeight,
  panelClientHeight: document.querySelector('.mobile-panel').clientHeight
}))()`);

assert.equal(mobileMenu.navigationExpanded, "true", "Mobile navigation did not open");
assert.equal(mobileMenu.servicesExpanded, "true", "Mobile Services accordion did not expand");
assert.equal(mobileMenu.serviceLinkCount, 12, "Mobile Services accordion must contain twelve service links");
assert(mobileMenu.scrollWidth <= 430, "Mobile Services accordion causes horizontal overflow");
assert(mobileMenu.panelClientHeight <= 798, "Mobile navigation exceeds its viewport allowance");

socket.close();
console.log(`Responsive QA passed at ${widths.join(", ")}px, including desktop and touch Services interactions.`);
