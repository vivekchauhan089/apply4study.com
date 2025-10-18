import { jsx } from "react/jsx-runtime";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
function LazyImage({ src, alt, className, fetchPriority = "low" }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [loadedSrc, setLoadedSrc] = useState(null);
  useEffect(() => {
    if (inView) {
      setLoadedSrc(src);
    }
  }, [inView, src]);
  return /* @__PURE__ */ jsx("div", { ref, children: loadedSrc ? /* @__PURE__ */ jsx("img", { src: loadedSrc, alt, className, loading: fetchPriority == "high" ? "eager" : "lazy", decoding: "async", fetchPriority }) : /* @__PURE__ */ jsx("div", { style: { height: "200px", background: "#f0f0f0" } }) });
}
export {
  LazyImage as L
};
