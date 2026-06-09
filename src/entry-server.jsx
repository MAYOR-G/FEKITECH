import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import { getHeadTags, getRobotsTxt, getSitemapXml, sitemapRoutes } from "./lib/seo.js";

export function render(pathname) {
  return renderToString(<App initialPathname={pathname} />);
}

export { getHeadTags, getRobotsTxt, getSitemapXml, sitemapRoutes };
