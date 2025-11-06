
import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import useSEO from "../../hooks/useSEO.jsx";

export default function WebDevelopment() {
  const APP_URL = process.env.REACT_APP_URL;

  useSEO({
    title: "Web Development",
    canonical: `${APP_URL}/services/web-development`,
  });

  React.useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="page">
      <div className="container" data-aos="fade-up">
        <h1>Web Development</h1>
        <div dangerouslySetInnerHTML={{ __html: `<p>We build scalable and modern web applications.</p>` }} />
        
      </div>
    </div>
  );
}
