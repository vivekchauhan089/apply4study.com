
import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import useSEO from "../../hooks/useSEO.jsx";

export default function AboutUs() {
  const APP_URL = process.env.REACT_APP_URL;

  useSEO({
    title: "About Us",
    canonical: `${APP_URL}/about-us`,
  });

  React.useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="page">
      <div className="container" data-aos="fade-up">
        <h1>About Us</h1>
        <div dangerouslySetInnerHTML={{ __html: `<p>We are dedicated to helping students achieve their study abroad goals.</p>` }} />
        
      </div>
    </div>
  );
}
