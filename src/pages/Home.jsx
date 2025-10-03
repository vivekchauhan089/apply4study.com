import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import AppDownloadPromo from '../components/AddDownloadPromo/AddDownloadPromo';
import AOS from 'aos';
import 'aos/dist/aos.css';
import FaqSection from '../components/FAQ/FAQ';
import LazyImage from '../components/common/LazyImage';
import useSEO from "../hooks/useSEO";

import hero1 from '../assets/img/hero-img-1.jpg';
import quize1 from '../assets/img/quiz_img.jpg';
import quize2 from '../assets/img/progress_tracking_img.jpg';
import quize3 from '../assets/img/study.jpg';
import worksImg1 from '../assets/img/subjectsTopics.png';
import worksImg2 from '../assets/img/addNotes.jpg';
import worksImg3 from '../assets/img/takeQuize.png';
import student1 from '../assets/img/student.png';
import student2 from '../assets/img/teachers.png';
import student3 from '../assets/img/exam.png';
import testimonial1 from '../assets/img/exam.png';
import testimonial2 from '../assets/img/exam.png';
import testimonial3 from '../assets/img/exam.png';
import SearchSection from '../components/SearchSection/HomeSearchSection';
import StatsSection from '../components/StatsSection/StatsSection';

const sliderData = [
  {
    heading: 'Master Any Subject Faster with Smarter Study Tools',
    subText: 'Track progress, ace quizzes, and never miss a revision.',
    image: hero1,
  },

];

const testimonials = [
  {
    img: require('../assets/img/testimonials/testimonials-1.jpg'),
    name: 'Saul Goodman',
    role: 'Ceo & Founder',
    quote:
      'Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id...',
  },
  {
    img: require('../assets/img/testimonials/testimonials-2.jpg'),
    name: 'Sara Wilsson',
    role: 'Designer',
    quote:
      'Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis...',
  },
  {
    img: require('../assets/img/testimonials/testimonials-3.jpg'),
    name: 'Jena Karlis',
    role: 'Store Owner',
    quote:
      'Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis...',
  },
  {
    img: require('../assets/img/testimonials/testimonials-4.jpg'),
    name: 'Matt Brandon',
    role: 'Freelancer',
    quote:
      'Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat minim velit...',
  },
  {
    img: require('../assets/img/testimonials/testimonials-5.jpg'),
    name: 'John Larson',
    role: 'Entrepreneur',
    quote:
      'Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam...',
  },
];

export default function Home() {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Thank you for subscribing!');
  };

  useSEO({
    title: "Apply4Study — Online Learning Platform",
    description: "Join Apply4Study to access interactive e-learning, online classrooms, and flexible study options.",
    canonical: "https://apply4study.com/",
    keywords: "elearning, online classroom, virtual study, apply4study",
    og: {
      "og:title": "Apply4Study — Online Learning Platform",
      "og:description": "Learn smarter with Apply4Study. Online classrooms, live lectures, and flexible e-learning options.",
      "og:type": "website",
      "og:url": "https://apply4study.com/",
      "og:image": "https://apply4study.com/assets/og-banner.jpg",
    },
    twitter: {
      "twitter:card": "summary_large_image",
      "twitter:title": "Apply4Study — Online Learning Platform",
      "twitter:description": "Access interactive online courses with Apply4Study.",
      "twitter:image": "https://apply4study.com/assets/og-banner.jpg",
    },
    schema: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Apply4Study",
      "url": "https://apply4study.com/",
      "logo": "https://apply4study.com/assets/logo.png",
      "sameAs": [
        "https://www.facebook.com/apply4study",
        "https://twitter.com/apply4study",
        "https://www.linkedin.com/company/apply4study"
      ]
    }
  });


  return (
    <>
      <section id="hero" className="hero section">
        <div className="container py-lg-5">

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation
            autoplay={{ delay: 5000 }}
          >
            {sliderData.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="carousel-container">
                  <div className="col-12">
                    <div className="row align-items-center justify-content-sm-center">
                      <div className="col-md-6 col-12 text-lg-start text-center">
                        <h2 className="my-3">{slide.heading}</h2>
                        <p className='m-0 d-lg-block d-none'>{slide.subText}</p>
                        {!isMobile && (
                          <Link to="/get-started" className="btn-get-started mx-auto mx-lg-0">Get Started Free</Link>
                        )}
                      </div>
                      <div className="col-md-5 col-12 borderBottomEffect">
                        <div className="slider_img pt-lg-4 text-center">
                          <LazyImage
                            src={slide.image}
                            alt={`Slide ${index + 1}`}
                            className="img-fluid rounded"

                            decoding="async"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <SearchSection />
      <StatsSection />

      <section id="featured-services" className="featured-services section">

        <div className="container section-title" data-aos="fade-up">
          <h2>Core features</h2>

        </div>
        <div className="container">

          <div className="row gy-4">

            <div className="col-lg-12 col-md-6">
              <div className="">
                <div className="why-choose__list">
                  <div className="row text-center">
                    <div className="col-lg-4 col-md-4 col-12" data-aos="slide-left" data-aos-delay="100">
                      <div className="card why-choose__wrapper round_img">
                        <LazyImage src={quize1} className="img-fluid rounded-circle" alt="custum quizzes" />
                        <h6>Custom Quizzes</h6>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-12" data-aos="zoom-in" data-aos-delay="100">
                      <div className="card why-choose__wrapper round_img">
                        <LazyImage src={quize2} className="img-fluid rounded-circle"
                          alt="custum quizzes" />
                        <h6>Progress Tracking</h6>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-12" data-aos="slide-right" data-aos-delay="100">
                      <div className="card why-choose__wrapper round_img">
                        <LazyImage src={quize3} className="img-fluid rounded-circle" alt="custum quizzes" />
                        <h6>Study Planner</h6>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>


          </div>

        </div>

      </section>

      <section id="how_it_works" className="about section light-background">
        <div className="container section-title" data-aos="fade-up">
          <h2> How It Works</h2>
        </div>
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-12 col-md-6" data-aos="fade-up" data-aos-delay="100">
              <div className="">
                <div className="why-choose__list">
                  <div className="row text-center">
                    <div className="col-lg-4 col-md-4 col-12" data-aos="slide-left" data-aos-delay="100">

                      <div className="card why-choose__wrapper round_img">
                        <LazyImage src={worksImg1} className="img-fluid rounded-circle" alt="custum quizzes" />
                        <h6>Create subjects & topics</h6>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-12" data-aos="zoom-in" data-aos-delay="100">
                      <div className="card why-choose__wrapper round_img">
                        <LazyImage src={worksImg2} className="img-fluid rounded-circle" alt="custum quizzes" />
                        <h6>Add notes and flashcards</h6>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-12" data-aos="slide-right" data-aos-delay="100">
                      <div className="card why-choose__wrapper round_img">
                        <LazyImage src={worksImg3} className="img-fluid rounded-circle" alt="custum quizzes" />
                        <h6>Take quizzes and track progress</h6>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      <section id="benefitsUsers" className="about section">
        <div className="container section-title" data-aos="fade-up">
          <h2> Benefits for Users</h2>
        </div>
        <div className="container">

          <div className="row gy-4 text-center">

            <div className="col-lg-12 col-md-6" data-aos="fade-up" data-aos-delay="100">
              <div className="">
                <div className="why-choose__list">
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-12" data-aos="slide-up" data-aos-delay="100">
                      <div className="card why-choose__wrapper round_img">
                        <LazyImage src={student1} className="img-fluid rounded-circle" alt="custum quizzes" />
                        <h6>For Students</h6>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-12" data-aos="zoom-in" data-aos-delay="100">
                      <div className="card why-choose__wrapper round_img">
                        <LazyImage src={student2} className="img-fluid rounded-circle" alt="custum quizzes" />
                        <h6>For Teachers</h6>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-12" data-aos="slide-down" data-aos-delay="100">
                      <div className="card why-choose__wrapper round_img">
                        <LazyImage src={student3} className="img-fluid rounded-circle" alt="custum quizzes" />
                        <h6>For Competitive Exam Prep</h6>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>


          </div>

        </div>

      </section>

      <section id="testimonials" className="testimonials section light-background">
        <div className="container">
          <div className="section-title">
            <h2>Testimonials</h2>
            <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
          </div>
          <div className="row">
            <div className="col-12">
              <div
                className="testimonial-slider"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <Swiper
                  modules={[Pagination, Autoplay]}
                  slidesPerView={1}
                  spaceBetween={20}
                  loop={true}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 5000 }}
                  breakpoints={{
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                  }}
                >
                  {testimonials.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className="testimonial-item">
                        <LazyImage
                          src={item.img}
                          className="testimonial-img"
                          alt={item.name}

                        />
                        <h3>{item.name}</h3>
                        <h4>{item.role}</h4>
                        <div className="stars">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <i key={i} className="bi bi-star-fill"></i>
                            ))}
                        </div>
                        <p>
                          <i className="bi bi-quote quote-icon-left"></i>
                          <span>{item.quote}</span>
                          <i className="bi bi-quote quote-icon-right"></i>
                        </p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

            </div>
          </div>


        </div>

      </section>
      <AppDownloadPromo />
      <FaqSection />
      <div className="section light-background">

        <div className="container">
          <div className="row gy-4 align-items-center">
            <div className="col-lg-6 col-md-6 col-12" data-aos="slide-up" data-aos-delay="100">
              <div className="container section-title pb-0" data-aos="fade-up">
                <h5>Subscribe to Our Newsletter</h5>
                <p>Get the latest updates, learning tips, and offers delivered straight to your inbox.</p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12" data-aos="slide-down" data-aos-delay="200">
              <div className="newsletter-form">
                <form className="newsletter-form" onSubmit={handleSubmit}>
                  <input type="email" placeholder="Enter your email" required />
                  <button type="submit">Subscribe</button>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>

  );
}
