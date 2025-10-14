import React from "react";

const AppDownloadPromo = () => {
  return (
    <div className="section light-background py-0">
      <div className="mockup_img text-center py-5">
        <div className="my-3 app_download">
          <h3 className="mb-3">Mobile App Promo</h3>

          <a
            href="#"
            data-aos="zoom-in"
            data-aos-delay="100"
            aria-label="Download on Google Play"
          >
            <img
              src="./Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              loading="lazy"
              className="mx-2"
            />
          </a>

          <a
            href="#"
            data-aos="zoom-in"
            data-aos-delay="120"
            aria-label="Download on the App Store"
          >
            <img
              src="./download-on-the-app-store.svg"
              alt="App Store"
              loading="lazy"
              className="mx-2"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AppDownloadPromo;
