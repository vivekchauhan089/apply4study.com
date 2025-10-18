import { useEffect } from "react";
function useSEO(meta) {
  useEffect(() => {
    if (!meta) return;
    if (meta.title) {
      document.title = meta.title;
    }
    if (meta.description) {
      setMetaTag("name", "description", meta.description);
    }
    if (meta.canonical) {
      let link = document.querySelector("link[rel='canonical']");
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", meta.canonical);
    }
    if (meta.keywords) {
      setMetaTag("name", "keywords", meta.keywords);
    }
    if (meta.og) {
      Object.entries(meta.og).forEach(([property, content]) => {
        setMetaTag("property", property, content);
      });
    }
    if (meta.twitter) {
      Object.entries(meta.twitter).forEach(([name, content]) => {
        setMetaTag("name", name, content);
      });
    }
    if (meta.schema) {
      let script = document.querySelector("script[type='application/ld+json']");
      if (!script) {
        script = document.createElement("script");
        script.setAttribute("type", "application/ld+json");
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(meta.schema, null, 2);
    }
  }, [meta]);
}
function setMetaTag(attr, key, value) {
  if (!value) return;
  let tag = document.querySelector(`meta[${attr}='${key}']`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", value);
}
export {
  useSEO as u
};
