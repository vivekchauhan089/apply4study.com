import { useEffect } from "react";
import ReactGA from "react-ga4";
ReactGA.initialize("G-J4D70SLKDY"); // replace with your GA4 Measurement ID

export default function useTrackLinkClicks() {
  useEffect(() => {
    const handleClick = (e) => {
      const link = e.target.closest("a");
      if (!link) return;

      const eventData = {
        event: "link_click",
        link_url: link.href,
        link_text: link.textContent.trim() || "(no text)",
        link_target: link.target || "_self",
      };

      // Send event to GA4
      ReactGA.event("link_click", {
        link_url: eventData.link_url,
        link_text: eventData.link_text,
        link_target: eventData.link_target,
      });

      console.log("Tracked:", eventData);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
}
