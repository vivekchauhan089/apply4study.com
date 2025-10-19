import React from 'react'

export function PageShell({ children, pageContext }) {
  return (
    <React.StrictMode>
      <div id="page-view">{children}</div>
    </React.StrictMode>
  )
}