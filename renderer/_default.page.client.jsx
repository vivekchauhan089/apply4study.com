import React from 'react'
import ReactDOM from 'react-dom/client'
import { PageShell } from './PageShell.jsx'

// export { render }

export async function render(pageContext) {
  const { Page } = pageContext
  const container = document.getElementById('page-view')

  ReactDOM.hydrateRoot(
    container,
    <PageShell pageContext={pageContext}>
      <Page />
    </PageShell>
  )
}