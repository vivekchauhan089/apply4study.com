import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({ meta }) => {
  return (
    <Helmet>
      {/* Title & Description */}
      {meta.title && <title>{meta.title}</title>}
      {meta.description && (
        <meta name="description" content={meta.description} />
      )}

      {/* Canonical URL */}
      {meta.canonical && (
        <link rel="canonical" href={meta.canonical} />
      )}

      {/* name-based meta tags */}
      {meta.name &&
        Object.entries(meta.name).map(([key, value]) => (
          <meta key={key} name={key} content={value} />
        ))}

      {/* property-based meta tags (OG, Twitter) */}
      {meta.property &&
        Object.entries(meta.property).map(([key, value]) => (
          <meta key={key} property={key} content={value} />
        ))}
    </Helmet>
  );
};

export default SEO;