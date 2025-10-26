import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals.jsx';

const container = document.getElementById("root");
const isPrerendered = container?.dataset.prerendered === "true";
ReactDOM.hydrateRoot(
  container,
  <React.StrictMode>
    <App skipRedirects={isPrerendered} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
