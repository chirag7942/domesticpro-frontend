import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import AppRoutes from "./AppRoutes.jsx";

document.documentElement.classList.add("js");

const rootEl = document.getElementById("root");

const app = (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

// Check if THIS page was server-rendered for the current URL
const ssrRoute = document.querySelector('meta[name="ssr-route"]')?.content;
const currentPath = window.location.pathname;
const wasRenderedForThisRoute = ssrRoute === currentPath;

if (wasRenderedForThisRoute) {
  ReactDOM.hydrateRoot(rootEl, app);
} else {
  rootEl.innerHTML = "";
  ReactDOM.createRoot(rootEl).render(app);
}