import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import AppDownloadPromo from '../components/AddDownloadPromo/AddDownloadPromo.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';
import FaqSection from '../components/FAQ/FAQ.jsx';
import LazyImage from '../components/common/LazyImage.jsx';
import useSEO from "../hooks/useSEO.jsx";

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

import img1 from '../assets/img/testimonials/testimonials-1.jpg';
import img2 from '../assets/img/testimonials/testimonials-2.jpg';
import img3 from '../assets/img/testimonials/testimonials-3.jpg';
import img4 from '../assets/img/testimonials/testimonials-4.jpg';
import img5 from '../assets/img/testimonials/testimonials-5.jpg';

import SearchSection from '../components/SearchSection/HomeSearchSection.jsx';
import StatsSection from '../components/StatsSection/StatsSection.jsx';
import Newsletter from '../components/common/Newsletter.jsx';

const sliderData = [
  {
    heading: 'Apply Online for eLearning & Classroom Courses',
    subText: 'Discover accredited university programs and flexible online courses. Compare programs, enroll, and track your learning progress with Apply4Study.',
    image: hero1,
  },

];

const testimonials = [
  {
    img: img2,
    name: 'Priya Sharma',
    role: 'Student, Delhi',
    quote:
      'Apply4Study made it easy for me to manage both online and offline learning. The mock test feature helped me prepare for my IELTS exam with confidence.',
  },
  {
    img: img1,
    name: 'Rahul Mehta',
    role: 'Teacher, Mumbai',
    quote:
      'The teacher dashboard and content scheduling tools have transformed my classroom sessions. It’s a perfect platform for hybrid learning.',
  },
  {
    img: img3,
    name: 'Anjali Verma',
    role: 'Working Professional, Pune',
    quote:
      'I love how personalized the learning recommendations are! The AI-powered progress tracker keeps me motivated.',
  },
  {
    img: img4,
    name: 'Amit Raj',
    role: 'Freelancer, Bengaluru',
    quote:
      'As a freelancer, Apply4Study’s flexible online classes fit perfectly into my schedule. I can study on weekends and continue improving my professional skills.',
  },
  {
    img: img5,
    name: 'John Larson',
    role: 'Entrepreneur, New York',
    quote:
      'I use Apply4Study to train my team through interactive e-learning modules. It’s user-friendly and has improved our overall productivity.',
  },
];

const isBrowser = typeof window !== "undefined";

export default function Home() {

  const [isMobile, setIsMobile] = useState(false);

  const APP_URL = process.env.REACT_APP_URL;

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
      title: "Apply4Study — Apply Online for eLearning & Classroom Courses",
      description: "Apply4Study helps students apply online for top university classroom programs and eLearning courses. Compare programs, enroll, and track progress with ease.",
      canonical: `${APP_URL}/`,
      keywords: "elearning, online classroom, virtual study, apply4study",
      og: {
          "og:title": "Apply4Study — Apply Online for eLearning & Classroom Courses",
          "og:description": "Find and apply to online and classroom courses from top universities worldwide with Apply4Study.",
          "og:type": "website",
          "og:url": `${APP_URL}/`,
          "og:image": `${APP_URL}/assets/og-banner.jpg`,
      },
      twitter: {
          "twitter:card": "summary_large_image",
          "twitter:title": "Apply4Study — Apply Online for eLearning & Classroom Courses",
          "twitter:description": "Access interactive online courses with Apply4Study.",
          "twitter:image": `${APP_URL}/assets/og-banner.jpg`,
      },
      schema: {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Apply4Study",
          "description": "Apply4Study helps students apply online for top university classroom programs and eLearning courses. Compare programs, enroll, and track progress with ease.",
          "datePublished": "2025-10-01",
          "dateModified": new Date().toISOString().split("T")[0],
          "url": `${APP_URL}/`,
          "logo": `${APP_URL}/assets/logo.png`,
          "sameAs": [
              "https://www.facebook.com/apply4study",
              "https://x.com/apply4study",
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
                          <div className="hero-ctas mt-3">
                            <a href="/get-started" className="btn-get-started mx-auto mx-lg-0" aria-label="Get Started with Apply4Study">Get Started Free</a>
                            <a href="/courses" className="btn-secondary mx-2" aria-label="Browse Programs">Browse Programs</a>
                          </div>
                        )}
                        <p className="mt-3 m-0 small d-lg-block d-none">Trusted by students worldwide • Scholarships & verified university partners</p>
                      </div>
                      <div className="col-md-5 col-12 borderBottomEffect">
                        <div className="slider_img pt-lg-4 text-center">
                          <LazyImage
                            src={slide.image}
                            alt="Students learning online and in classroom"
                            className="img-fluid rounded"
                            loading="lazy"
                            fetchPriority="high"
                          />
                        </div>
                      </div>
                      {isMobile && (
                      <div className="col-md-6 col-12 text-lg-start text-center">
                        <p className="mt-3 small d-lg-block">Trusted by students worldwide • Scholarships & verified university partners</p>
                      </div>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>  
        </div>
      </section>

      <SearchSection />
      {isBrowser && (
        <StatsSection />
      )}

      <section id="featured-services" className="featured-services section" aria-label="Core Features of Apply4Study">
        <div className="container section-title" data-aos="fade-up">
          <h2>Core Features of Apply4Study</h2>
          <p>Discover how our intelligent eLearning platform makes studying, tracking, and applying to programs easier than ever.</p>
        </div>

        <div className="container">
          <div className="row gy-4 text-center">
            <div className="col-lg-12 col-md-6" data-aos="fade-up" data-aos-delay="100">
              <div className="">
                <div className="why-choose__list">
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-12" data-aos="slide-left" data-aos-delay="100">
                      <div className="card why-choose__wrapper round_img">
                        <div>
                          <LazyImage src={quize1} className="img-fluid rounded-circle" loading="lazy" alt="Custom quizzes and tests for online courses" />
                        </div>
                        <h3>Custom Quizzes</h3>
                        <p>Enhance your learning with adaptive <a href="/features/online-quizzes" title="Online Quizzes">online quizzes</a> and self-assessment tools designed to boost retention and track your progress.</p>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-12" data-aos="zoom-in" data-aos-delay="100">
                      <div className="card why-choose__wrapper round_img">
                        <div>
                          <LazyImage src={quize2} className="img-fluid rounded-circle" loading="lazy" alt="Progress tracking dashboard" />
                        </div>          
                        <h3>Progress Tracking</h3>
                        <p>Stay motivated with visual dashboards that let you monitor your learning milestones across all <a href="/courses" title="Courses">courses</a> and programs in real time.</p>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-12" data-aos="slide-right" data-aos-delay="100">
                      <div className="card why-choose__wrapper round_img">
                        <div>
                          <LazyImage src={quize3} className="img-fluid rounded-circle" loading="lazy" alt="Study planner tool for university students" />
                        </div>
                        <h3>Smart Study Planner</h3>
                        <p>Plan your study sessions efficiently with AI-assisted scheduling that adapts to your goals and learning pace. Ideal for <a href="/programs" title="University Classroom Programs">university classroom programs.</a></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how_it_works" className="about section light-background" aria-label="How Apply4Study Works">
        <div className="container section-title" data-aos="fade-up">
          <h2>How Apply4Study Works</h2>
          <p>Start your online learning journey in just a few simple steps — from choosing your subject to tracking your study progress.</p>
        </div>

        <div className="container">
          <div className="row gy-4 text-center">
            <div className="col-lg-12 col-md-6" data-aos="fade-up" data-aos-delay="100">
              <div className="">
                <div className="why-choose__list">
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-12" data-aos="slide-left" data-aos-delay="100">
                      <div className="card why-choose__wrapper round_img">
                        <div>
                          <LazyImage src={worksImg1} className="img-fluid rounded-circle" alt="Create and manage subjects online" loading="lazy" />
                        </div>
                        <h3>Create Your Subjects</h3>
                        <p>Begin by setting up your subjects and topics within your personalized dashboard. Ideal for students joining <a href="/programs/classroom" title="Classroom Learning Programs">classroom programs</a> or online courses.</p>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-12" data-aos="zoom-in" data-aos-delay="100">
                      <div className="card why-choose__wrapper round_img">
                        <div>
                          <LazyImage src={worksImg2} className="img-fluid rounded-circle" alt="Add study notes and flashcards" loading="lazy" />
                        </div>
                        <h3>Add Notes & Flashcards</h3>
                        <p>Upload your own study materials, flashcards, or eBooks, and keep all resources organized in one secure cloud account.</p>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-12" data-aos="slide-right" data-aos-delay="100">
                      <div className="card why-choose__wrapper round_img">
                        <div>
                          <LazyImage src={worksImg3} className="img-fluid rounded-circle" alt="Take quizzes and track progress" loading="lazy" />
                        </div>
                        <h3>Take Quizzes & Track Progress</h3>
                        <p>Test your understanding through interactive quizzes and automatically track progress across all.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>  
          </div>
        </div>
      </section>

      <section id="benefitsUsers" className="about section" aria-label="Benefits of Using Apply4Study">
        <div className="container section-title" data-aos="fade-up">
          <h2>Benefits of Using Apply4Study</h2>
          <p>Whether you're a student, teacher, or preparing for competitive exams — Apply4Study offers powerful tools that make online and classroom learning smarter, simpler, and more effective.</p>
        </div>
        <div className="container">
          <div className="row gy-4 text-center">
            <div className="col-lg-12 col-md-6" data-aos="fade-up" data-aos-delay="100">
              <div className="">
                <div className="why-choose__list">
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-12" data-aos="slide-up" data-aos-delay="100">
                      <div className="card why-choose__wrapper round_img">
                        <div>
                          <LazyImage src={student1} className="img-fluid rounded-circle" alt="eLearning benefits for students" loading="lazy" />
                        </div>
                        <h3>For Students</h3>
                        <p>Access personalized <a href="/courses/online" title="Online Courses for Students">online courses</a>, live classroom sessions, and progress tracking tools. Apply4Study helps you learn at your own pace and stay exam-ready with smart study planners.</p>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-12" data-aos="zoom-in" data-aos-delay="100">
                      <div className="card why-choose__wrapper round_img">
                        <div>
                          <LazyImage src={student2} className="img-fluid rounded-circle" alt="Digital teaching tools for teachers" loading="lazy" />
                        </div>
                        <h3>For Teachers</h3>
                        <p>Create, share, and manage classroom content digitally. With our <a href="/features/teacher-tools" title="Teacher Tools">teacher tools</a>, you can schedule lessons, assign quizzes, and monitor student performance in real time.</p>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-12" data-aos="slide-down" data-aos-delay="100">
                      <div className="card why-choose__wrapper round_img">
                        <div>
                          <LazyImage src={student3} className="img-fluid rounded-circle" alt="Exam preparation and mock tests" loading="lazy" />
                        </div>
                        <h3>For Competitive Exam Prep</h3>
                        <p>Prepare effectively with adaptive practice tests, <a href="/features/mock-tests" title="Mock Tests">mock exams</a>, and study analytics. Apply4Study supports exams like IELTS, GRE, and government entrance tests with structured study plans.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="testimonials section light-background" aria-label="Student and Teacher Testimonials">
        <div className="container">
          <div className="section-title">
            <h2>What Our Learners Say</h2>
            <p>Thousands of students, teachers, and professionals trust Apply4Study to boost their learning journey through online and classroom programs.</p>
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
                        <div className="testimonial-card">
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
      <Newsletter />
    </>

  );
}
