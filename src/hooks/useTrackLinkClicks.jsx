// hooks/useTrackLinkClicks.js
import { useEffect } from "react";
import ReactGA from "react-ga4";

// ✅ Initialize GA only once (outside the hook)
if (!window.GA_INITIALIZED) {
  ReactGA.initialize("G-J4D70SLKDY"); // 🔁 Replace with your GA4 ID
  window.GA_INITIALIZED = true;
}

export default function useTrackLinkClicks() {
  useEffect(() => {
    const handleClick = (event) => {
      // Find the nearest <a> element
      const link = event.target.closest("a");
      if (!link || !link.href) return;

      // Ignore internal hash or same-page anchors
      if (link.href.startsWith("#") || link.href === window.location.href) return;

      // Build event data
      const eventData = {
        event: "link_click",
        link_url: link.href,
        link_text: link.textContent.trim() || "(no text)",
        link_target: link.target || "_self",
      };

      // ✅ Fire GA4 event
      ReactGA.event("link_click", eventData);

      // Optional: console log only in development
      if (process.env.NODE_ENV === "development") {
        console.log("Tracked link click:", eventData);
      }
    };

    // ✅ Use capture phase to catch early clicks before navigation
    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);
}
