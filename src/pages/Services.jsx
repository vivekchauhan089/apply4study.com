import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import LazyImage from '../components/common/LazyImage';
import aboutImg1 from '../assets/img/about.jpg';
import aboutImg2 from '../assets/img/about.jpg';
import aboutImg3 from '../assets/img/about.jpg';

import useSEO from "../hooks/useSEO";

export default function Services() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const APP_URL = process.env.REACT_APP_URL;

  useSEO({
    title: "Our Services — Apply4Study Online Learning",
    description: "Explore Apply4Study’s services including e-learning courses, online classrooms, and digital study tools.",
    canonical: `${APP_URL}/services`,
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "E-Learning Platform",
      "provider": {
        "@type": "Organization",
        "name": "Apply4Study",
        "url": `${APP_URL}`
      },
      "areaServed": {
        "@type": "Country",
        "name": "India"
      },
      "datePublished": "2025-10-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "description": "Apply4Study provides online learning services including interactive courses, virtual classrooms, and live sessions."
    }
  });

  return (
    <>      
      <div className="services-page">


        <div className="page-title dark-background service_bg">
          <div className="container position-relative">
            <h1>Our Services</h1>
            <p>Empowering You Through Smart, Flexible Learning</p>
            <nav className="breadcrumbs">
              <ol>
                <li><a href={APP_URL}>Home</a></li>
                <li className="current">Services</li>
              </ol>
            </nav>
          </div>
        </div>

        <section className="section ">
          <div className="container section-title pb-0" data-aos="fade-up">
            <h5> Empowering You Through Smart, Flexible Learning</h5>
            <p>At <strong>Apply4Study</strong>, we offer a wide range of online education services designed to meet the
              diverse needs of students, professionals, and lifelong learners. Whether you're aiming to ace an exam, build
              new skills, or boost your confidence in a subject, we've got a program for you.</p>
          </div>
        </section>
        <section className=" about section light-background ">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-6 position-relative align-self-start" data-aos="fade-up" data-aos-delay="100">
                <LazyImage src={aboutImg1} className="img-fluid" alt="" />
                <a href="https://www.youtube.com/watch?v=Y7f98aduVJ8" className="glightbox pulsating-play-btn"></a>
              </div>
              <div className="col-lg-6 content" data-aos="fade-up" data-aos-delay="200">
                <h3>Academic Courses (K-12 & Higher Ed)</h3>
                <p> Master school and college subjects with our expertly designed academic programs.</p>
                <ul>
                  <li data-aos="slide-left" data-aos-delay="100">
                    <div className="row">
                      <div className="col-auto">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>Math, Science, English, Social Studies & more</p>
                      </div>
                    </div>
                  </li>
                  <li data-aos="slide-left" data-aos-delay="200">
                    <div className="row">
                      <div className="col-auto">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>Aligned with CBSE, ICSE, and international curriculums</p>

                      </div>
                    </div>
                  </li>
                  <li data-aos="slide-left" data-aos-delay="300">
                    <div className="row">
                      <div className="col-auto">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>Concept-based learning with live doubt-solving</p>

                      </div>
                    </div>

                  </li>
                  <li data-aos="slide-left" data-aos-delay="400">
                    <div className="row">
                      <div className="col-auto">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>Practice quizzes and progress reports</p>

                      </div>
                    </div>

                  </li>
                </ul>

              </div>
            </div>
          </div>
        </section>

        <section className=" about section ">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-6 content" data-aos="fade-up" data-aos-delay="200">
                <h3>Test Preparation Courses</h3>
                <p>Ace your exams with targeted preparation strategies and expert mentorship.</p>
                <ul>
                  <li data-aos="slide-left" data-aos-delay="100">
                    <div className="row">
                      <div className="col-auto">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>Ace your exams with targeted preparation strategies and expert mentorship.</p>
                      </div>
                    </div>
                  </li>
                  <li data-aos="slide-left" data-aos-delay="200">
                    <div className="row">
                      <div className="col-auto">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>IELTS, TOEFL, SAT, and other competitive exams</p>

                      </div>
                    </div>
                  </li>
                  <li data-aos="slide-left" data-aos-delay="300">
                    <div className="row">
                      <div className="col-auto">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>Section-wise breakdowns and timed mock tests</p>

                      </div>
                    </div>

                  </li>
                  <li data-aos="slide-left" data-aos-delay="400">
                    <div className="row">
                      <div className="col-auto">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>Performance analytics and score predictors</p>
                      </div>
                    </div>

                  </li>
                  <li data-aos="slide-left" data-aos-delay="400">
                    <div className="row">
                      <div className="col-auto">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>One-on-one mentoring and revision workshops</p>
                      </div>
                    </div>

                  </li>
                </ul>

              </div>
              <div className="col-lg-6 position-relative align-self-start" data-aos="fade-up" data-aos-delay="100">
                <LazyImage src={aboutImg1} className="img-fluid" alt="" />
                <a href="https://www.youtube.com/watch?v=Y7f98aduVJ8" className="glightbox pulsating-play-btn"></a>
              </div>
            </div>
          </div>
        </section>

        <section className=" about section light-background ">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-6 position-relative align-self-start" data-aos="fade-up" data-aos-delay="100">
                <LazyImage src={aboutImg1} className="img-fluid" alt="" />
                <a href="https://www.youtube.com/watch?v=Y7f98aduVJ8" className="glightbox pulsating-play-btn"></a>
              </div>
              <div className="col-lg-6 content" data-aos="fade-up" data-aos-delay="200">
                <h3>Skill Development Programs</h3>
                <p> Future-proof your career with practical, in-demand skills.</p>
                <ul>
                  <li data-aos="slide-left" data-aos-delay="100">
                    <div className="row">
                      <div className="col-auto">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>Public Speaking, Communication, Resume Building</p>
                      </div>
                    </div>
                  </li>
                  <li data-aos="slide-left" data-aos-delay="200">
                    <div className="row">
                      <div className="col-auto">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>Computer Basics, MS Office, and Google Workspace</p>

                      </div>
                    </div>
                  </li>
                  <li data-aos="slide-left" data-aos-delay="300">
                    <div className="row">
                      <div className="col-auto">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>Coding for Kids & Adults (Python, Scratch, Web Dev)</p>

                      </div>
                    </div>

                  </li>
                  <li data-aos="slide-left" data-aos-delay="400">
                    <div className="row">
                      <div className="col-auto">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>Critical Thinking, Time Management, and more</p>

                      </div>
                    </div>

                  </li>
                </ul>

              </div>
            </div>
          </div>
        </section>

        <section className=" about section  ">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-6 content" data-aos="fade-up" data-aos-delay="200">
                <h3>Live Online Classes</h3>
                <p>Learn in real-time with experienced educators.</p>
                <ul>
                  <li data-aos="slide-left" data-aos-delay="100">
                    <div className="row">
                      <div className="col-auto pe-0">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>Interactive sessions via Zoom or Google Meet</p>
                      </div>
                    </div>
                  </li>
                  <li data-aos="slide-left" data-aos-delay="200">
                    <div className="row">
                      <div className="col-auto pe-0">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>Small batch sizes for personalized attention</p>
                      </div>
                    </div>
                  </li>
                  <li data-aos="slide-left" data-aos-delay="300">
                    <div className="row">
                      <div className="col-auto pe-0">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>Real-time Q&A and feedback</p>
                      </div>
                    </div>

                  </li>
                  <li data-aos="slide-left" data-aos-delay="400">
                    <div className="row">
                      <div className="col-auto pe-0">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>Session recordings for later review</p>
                      </div>
                    </div>

                  </li>

                </ul>

              </div>
              <div className="col-lg-6 position-relative align-self-start" data-aos="fade-up" data-aos-delay="100">
                <LazyImage src={aboutImg1} className="img-fluid" alt="" />
                <a href="https://www.youtube.com/watch?v=Y7f98aduVJ8" className="glightbox pulsating-play-btn"></a>
              </div>
            </div>
          </div>
        </section>

        <section className=" about section light-background ">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-6 position-relative align-self-start" data-aos="fade-up" data-aos-delay="100">
                <LazyImage src={aboutImg1} className="img-fluid" alt="" />
                <a href="https://www.youtube.com/watch?v=Y7f98aduVJ8" className="glightbox pulsating-play-btn"></a>
              </div>
              <div className="col-lg-6 content" data-aos="fade-up" data-aos-delay="200">
                <h3>Self-Paced Learning Modules</h3>
                <p> Learn at your convenience, without deadlines.</p>
                <ul>
                  <li data-aos="slide-left" data-aos-delay="100">
                    <div className="row">
                      <div className="col-auto">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>High-quality video lessons</p>
                      </div>
                    </div>
                  </li>
                  <li data-aos="slide-left" data-aos-delay="200">
                    <div className="row">
                      <div className="col-auto">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>Downloadable notes and practice sheets</p>

                      </div>
                    </div>
                  </li>
                  <li data-aos="slide-left" data-aos-delay="300">
                    <div className="row">
                      <div className="col-auto">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>Lifetime access to course materials</p>

                      </div>
                    </div>

                  </li>
                  <li data-aos="slide-left" data-aos-delay="400">
                    <div className="row">
                      <div className="col-auto">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>Quizzes and assessments after each module</p>

                      </div>
                    </div>

                  </li>
                </ul>

              </div>
            </div>
          </div>
        </section>

        <section className=" about section ">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-6 content" data-aos="fade-up" data-aos-delay="200">
                <h3>Mentorship & Academic Support</h3>
                <p>Sometimes, guidance matters as much as content.</p>
                <ul>
                  <li data-aos="slide-left" data-aos-delay="100">
                    <div className="row">
                      <div className="col-auto">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>Academic counseling for course planning</p>
                      </div>
                    </div>
                  </li>
                  <li data-aos="slide-left" data-aos-delay="200">
                    <div className="row">
                      <div className="col-auto">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>Study techniques and goal tracking</p>

                      </div>
                    </div>
                  </li>
                  <li data-aos="slide-left" data-aos-delay="300">
                    <div className="row">
                      <div className="col-auto">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>Career insights and subject advice</p>

                      </div>
                    </div>

                  </li>
                  <li data-aos="slide-left" data-aos-delay="400">
                    <div className="row">
                      <div className="col-auto">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>Motivation and study habit coaching</p>
                      </div>
                    </div>

                  </li>

                </ul>

              </div>
              <div className="col-lg-6 position-relative align-self-start" data-aos="fade-up" data-aos-delay="100">
                <LazyImage src={aboutImg1} className="img-fluid" alt="" />
                <a href="https://www.youtube.com/watch?v=Y7f98aduVJ8" className="glightbox pulsating-play-btn"></a>
              </div>
            </div>
          </div>
        </section>

        <section className=" about section  light-background">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-6 position-relative align-self-start" data-aos="fade-up" data-aos-delay="100">
                <LazyImage src={aboutImg1} className="img-fluid" alt="" />
                <a href="https://www.youtube.com/watch?v=Y7f98aduVJ8" className="glightbox pulsating-play-btn"></a>
              </div>
              <div className="col-lg-6 content" data-aos="fade-up" data-aos-delay="200">
                <h3>Certification & Progress Tracking</h3>
                <p>Earn recognition and stay motivated.</p>
                <ul>
                  <li data-aos="slide-left" data-aos-delay="100">
                    <div className="row">
                      <div className="col-auto">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>Digital certificates on course completion</p>
                      </div>
                    </div>
                  </li>
                  <li data-aos="slide-left" data-aos-delay="200">
                    <div className="row">
                      <div className="col-auto">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>Skill-based certifications for your resume</p>

                      </div>
                    </div>
                  </li>
                  <li data-aos="slide-left" data-aos-delay="300">
                    <div className="row">
                      <div className="col-auto">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>Track your growth with learner dashboards</p>

                      </div>
                    </div>

                  </li>
                  <li data-aos="slide-left" data-aos-delay="400">
                    <div className="row">
                      <div className="col-auto">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>Share achievements on LinkedIn or resumes</p>

                      </div>
                    </div>

                  </li>
                </ul>

              </div>
            </div>
          </div>
        </section>

        <section className="stats section ">
          <div className="container section-title col-lg-6 col-md-6 col-12 pb-0" data-aos="fade-up">
            <h3> Start Your Journey With Apply4Study</h3>
            <p>With expert instructors, engaging content, and flexible options, <strong>Apply4Study</strong> is designed to
              support every kind of learner—from school students to working professionals.</p>
            <p className="my-3"><strong>👉 Explore courses. Discover possibilities. Grow with us.</strong></p>
          </div>
        </section>


      </div>
    </>
  );
}