import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals.jsx';

const container = document.getElementById("root");
const isPrerendered = container?.dataset.prerendered === "true";
try {
  ReactDOM.hydrateRoot(
    container,
    <React.StrictMode>
      <BrowserRouter>
        <App skipRedirects={isPrerendered} />
      </BrowserRouter>
    </React.StrictMode>
  );
} catch (err) {
  console.warn("⚠️ Hydration failed, falling back to client render:", err.message);
  container.innerHTML = ""; // clear invalid prerendered DOM
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <BrowserRouter>
        <App skipRedirects={isPrerendered} />
      </BrowserRouter>
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
