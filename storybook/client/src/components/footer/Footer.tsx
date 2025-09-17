import {
  FaApple,
  FaFacebookF,
  FaGooglePlay,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube
} from 'react-icons/fa';

import Newsletter from '../newsletter/Newsletter';

import ReportForm from './ReportForm';
function Footer() {
  const COMPANY_NAME = import.meta.env.VITE_COMPANY_NAME;
  const COMPANY_ADDRESS = import.meta.env.VITE_COMPANY_ADDRESS;
  const COMPANY_PHONE = import.meta.env.VITE_COMPANY_PHONE;
  const COMPANY_EMAIL = import.meta.env.VITE_COMPANY_EMAIL;
  const COMPANY_WEBSITE = import.meta.env.VITE_COMPANY_WEBSITE;
  const COMPANY_FACEBOOK = import.meta.env.VITE_COMPANY_FACEBOOK;
  const COMPANY_TWITTER = import.meta.env.VITE_COMPANY_TWITTER;
  const COMPANY_INSTAGRAM = import.meta.env.VITE_COMPANY_INSTAGRAM;
  const COMPANY_YOUTUBE = import.meta.env.VITE_COMPANY_YOUTUBE;
  const COMPANY_LINKEDIN = import.meta.env.VITE_COMPANY_LINKEDIN;
  const COMPANY_GOOGLE_PLAY = import.meta.env.VITE_COMPANY_GOOGLE_PLAY;
  const COMPANY_APP_STORE = import.meta.env.VITE_COMPANY_APP_STORE;
  const COMPANY_LOGO = import.meta.env.VITE_APP_LOGO_URL;

  return (
    <div className='container-fluid bg-dark'>
      <footer className='text-center  text-lg-start text-white'>
        <section className='d-flex justify-content-between p-4 bg-primary'>
          <div className='me-5'>
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            {COMPANY_FACEBOOK && (
              <a
                className='text-white me-4'
                href={COMPANY_FACEBOOK}
                rel='noopener noreferrer'
                target='_blank'
              >
                <FaFacebookF />
              </a>
            )}
            {COMPANY_TWITTER && (
              <a
                className='text-white me-4'
                href={COMPANY_TWITTER}
                rel='noopener noreferrer'
                target='_blank'
              >
                <FaTwitter />
              </a>
            )}

            {COMPANY_LINKEDIN && (
              <a
                className='text-white me-4'
                href={COMPANY_LINKEDIN}
                rel='noopener noreferrer'
                target='_blank'
              >
                <FaLinkedinIn />
              </a>
            )}
            {COMPANY_INSTAGRAM && (
              <a
                className='text-white me-4'
                href={COMPANY_INSTAGRAM}
                rel='noopener noreferrer'
                target='_blank'
              >
                <FaInstagram />
              </a>
            )}
            {COMPANY_YOUTUBE && (
              <a
                className='text-white me-4'
                href={COMPANY_YOUTUBE}
                rel='noopener noreferrer'
                target='_blank'
              >
                <FaYoutube />
              </a>
            )}

            {COMPANY_GOOGLE_PLAY && (
              <a
                className='text-white me-4'
                href={COMPANY_GOOGLE_PLAY}
                rel='noopener noreferrer'
                target='_blank'
              >
                <FaGooglePlay />
              </a>
            )}
            {COMPANY_APP_STORE && (
              <a
                className='text-white me-4'
                href={COMPANY_APP_STORE}
                rel='noopener noreferrer'
                target='_blank'
              >
                <FaApple />
              </a>
            )}
          </div>
        </section>

        <section className=''>
          <div className='container text-center text-md-start mt-5'>
            <div className='d-flex justify-content-center'>
              <Newsletter />
            </div>
            <div className='row mt-3'>
              <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold'>
                  <a
                    className='text-white me-4'
                    href={COMPANY_WEBSITE}
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    <img
                      alt='logo'
                      className='img-fluid'
                      src={COMPANY_LOGO}
                      style={{
                        width: '100%',
                        height: '100%',
                        fill: 'white',
                        filter: 'contrast(1.5)'
                      }}
                    />
                  </a>
                </h6>
                <hr className='mb-4 mt-0 d-inline-block mx-auto' />
                <p>
                  Canadian Chamber of Commerce in Egypt (CanCham) was officially
                  inaugurated on the 31st of May 2006. It was established in
                  Egypt as a non-profit and non-governmental organization. It is
                  an official member at the Canadian Chamber of Commerce in
                  Canada; having access to their members database who ...
                </p>
              </div>

              <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold'>Products</h6>
                <hr className='mb-4 mt-0 d-inline-block mx-auto' />
                <p>
                  <a
                    className='text-white'
                    href='https://cancham.org.eg/en/services.html'
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    Services
                  </a>
                </p>

                <p>
                  <a
                    className='text-white'
                    href='https://cancham.org.eg/en/membership.html'
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    Membership
                  </a>
                </p>
                <p>
                  <a
                    className='text-white'
                    href='https://cancham.org.eg/en/courses.html'
                  >
                    Training
                  </a>
                </p>
              </div>

              <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold'>Useful links</h6>
                <hr className='mb-4 mt-0 d-inline-block mx-auto' />
                <p>
                  <a
                    className='text-white'
                    href='https://cancham.org.eg/en/about_us.html'
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    About us
                  </a>
                </p>

                <ReportForm courseID={''} />
              </div>

              <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
                <h6 className='text-uppercase fw-bold'>Contact</h6>
                <hr className='mb-4 mt-0 d-inline-block mx-auto' />
                <p>
                  <i className='fas fa-home mr-3' />
                  {COMPANY_ADDRESS}
                </p>
                <p>
                  <i className='fas fa-envelope mr-3' /> {COMPANY_EMAIL}
                </p>
                <p>
                  <i className='fas fa-phone mr-3' />
                  <a
                    className='text-white me-4'
                    href={`tel:${COMPANY_PHONE}`}
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    {COMPANY_PHONE}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className='text-center p-3'>
          © {new Date().getFullYear()} Copyright &middot;
          <a className='text-white' href={COMPANY_WEBSITE}>
            {COMPANY_NAME}
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
