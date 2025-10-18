import React from 'react'

export function PageShell({ children, pageContext }) {
  const title = pageContext?.documentProps?.title || 'Apply4Study'
  const desc = pageContext?.documentProps?.description || 'Study abroad portal'

  return (
    <React.StrictMode>
      <div id="page-view">{children}</div>
    </React.StrictMode>
  )
}