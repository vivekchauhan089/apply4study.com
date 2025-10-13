import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

export default function LazyImage({ src, alt, className, fetchPriority="low" }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [loadedSrc, setLoadedSrc] = useState(null);

  useEffect(() => {
    if (inView) {
      setLoadedSrc(src);
    }
  }, [inView, src]);

  return (
    <div ref={ref}>
      {loadedSrc ? (
        <img src={loadedSrc} alt={alt} className={className} loading={fetchPriority=='high' ? "eager" : "lazy"} decoding="async" fetchPriority={fetchPriority} />
      ) : (
        <div style={{ height: '200px', background: '#f0f0f0' }}></div> // Placeholder
      )}
    </div>
  );
}
