import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { escapeInject, dangerouslySkipEscape } from 'vike'
import { PageShell } from './PageShell.jsx'

// export { render }

export async function render(pageContext) {
  const { Page, exports } = pageContext
  const title = exports?.documentProps?.title?.default || 'Apply4Study'
  const desc = exports?.documentProps?.description?.default || 'Study abroad portal'

  const pageHtml = ReactDOMServer.renderToString(
    <PageShell pageContext={pageContext}>
      <Page />
    </PageShell>
  )

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
</html>`
}