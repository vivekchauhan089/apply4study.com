import { jsx } from "react/jsx-runtime";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { dangerouslySkipEscape, escapeInject } from "vike";
/*! renderer/PageShell.jsx [vike:pluginModuleBanner] */
function PageShell({ children, pageContext }) {
  return /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx("div", { id: "page-view", children }) });
}
/*! renderer/_default.page.server.jsx [vike:pluginModuleBanner] */
async function render(pageContext) {
  const { Page, exports } = pageContext;
  const title = exports?.documentProps?.title?.default || "Apply4Study";
  const desc = exports?.documentProps?.description?.default || "Study abroad portal";
  const pageHtml = ReactDOMServer.renderToString(
    /* @__PURE__ */ jsx(PageShell, { pageContext, children: /* @__PURE__ */ jsx(Page, {}) })
  );
  return escapeInject`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content="${desc}" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
  </head>
  <body>
    <div id="page-view">${dangerouslySkipEscape(pageHtml)}</div>
  </body>
</html>`;
}
export {
  render
};
