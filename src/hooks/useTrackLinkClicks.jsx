// hooks/useTrackLinkClicks.js
import React, { useEffect } from "react";
import ReactGA from "react-ga4";

export default function useTrackLinkClicks() {
  useEffect(() => {
    // ✅ Run only in the browser
    if (typeof window === "undefined") return;
    if (typeof ReactGA.initialize !== "function") return;

    // ✅ Initialize GA once
    if (!window.GA_INITIALIZED) {
      ReactGA.initialize("G-J4D70SLKDY"); // your GA4 ID
      window.GA_INITIALIZED = true;
    }

    const handleClick = (event) => {
      const link = event.target.closest("a");
      if (!link || !link.href) return;

      if (link.href.startsWith("#") || link.href === window.location.href) return;

      const eventData = {
        event: "link_click",
        link_url: link.href,
        link_text: link.textContent.trim() || "(no text)",
        link_target: link.target || "_self",
      };

      ReactGA.event("link_click", eventData);

      if (process.env.NODE_ENV === "development") {
        console.log("Tracked link click:", eventData);
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);
}
