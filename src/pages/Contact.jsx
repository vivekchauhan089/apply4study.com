import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import img1 from '../assets/img/about.jpg';
import LazyImage from '../components/common/LazyImage';

import useSEO from "../hooks/useSEO";

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const APP_URL = process.env.REACT_APP_URL;

  useSEO({
    title: "Contact Apply4Study — Get in Touch",
    description: "Reach out to Apply4Study for online learning support, inquiries, or collaborations.",
    canonical: `${APP_URL}/contact`,
    schema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Apply4Study",
      "image": `${APP_URL}/assets/logo.png`,
      "url": `${APP_URL}/`,
      "telephone": "+91-9876543210",
      "email": "support@apply4study.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Learning Street",
        "addressLocality": "New Delhi",
        "addressRegion": "Delhi",
        "postalCode": "110001",
        "addressCountry": "IN"
      },
      "sameAs": [
        "https://www.facebook.com/apply4study",
        "https://twitter.com/apply4study",
        "https://www.linkedin.com/company/apply4study"
      ]
    }
  });


  return (
    <>    
    <div className="about-page">
      
     <div class="page-title dark-background about_us_bg">
      <div class="container position-relative col-lg-6 col-md-6 col-12">
        <h1>About Us</h1>
        <p>Learn Anywhere. Grow Anytime.</p>
        <nav class="breadcrumbs">
          <ol>
            <li><a href={APP_URL}>Home</a></li>
            <li class="current">About</li>
          </ol>
        </nav>
      </div>
    </div>


    <section class="about section light-background">
      <div class="container section-title" data-aos="fade-up">
        <h2> Learn Anywhere. Grow Anytime.</h2>
        <p>At <strong>Apply4Study</strong>, we're on a mission to make quality education accessible, flexible, and truly
          learner-centric. Our online classroom platform is designed to help students, professionals, and lifelong
          learners gain in-demand skills and knowledge—on their own schedule, from anywhere in the world.</p>
        <p>Whether you're looking to advance your career, explore a new field, or simply learn something new,
          <strong>Apply4Study</strong> is here to support you every step of the way. Join us and discover a world of
          learning opportunities at your fingertips.
        </p>
      </div>


    </section>

     <section id="about" className="about section">

      <div className="container">

        <div className="row gy-4" data-aos="fade-up"  data-aos-delay="100">
          <div className="col-lg-6 position-relative align-self-start">
            <LazyImage src={img1} className="img-fluid" alt="" />
            <a href="https://www.youtube.com/watch?v=Y7f98aduVJ8" className="glightbox pulsating-play-btn"></a>
          </div>
          <div className="col-lg-6 content">

            <h3>Why Choose Apply4Study?</h3>

            <ul>
              <li data-aos="slide-left" data-aos-delay="100">
                <div className="row">
                  <div className="col-auto">
                    <i className="bi bi-check2-all"></i>
                  </div>
                  <div className="col-10">
                    <strong>🎓 Expert-Led Courses</strong>
                    <p>Explore a wide range of courses across various subjects, from academic subjects to professional
                      skills and personal development.</p>
                  </div>
                </div>
              </li>
              <li data-aos="slide-left" data-aos-delay="100">
                <div className="row">
                  <div className="col-auto">
                    <i className="bi bi-check2-all"></i>
                  </div>
                  <div className="col-10">
                    <strong>💻 Flexible Learning</strong>
                    <p>Access courses 24/7 through your desktop, tablet, or phone. Pause, resume, or revisit content
                      anytime to fit your learning pace.</p>
                  </div>
                </div>
              </li>
              <li data-aos="slide-left" data-aos-delay="100">
                <div className="row">
                  <div className="col-auto">
                    <i className="bi bi-check2-all"></i>
                  </div>
                  <div className="col-10">
                    <strong>📈 Skill-Focused Curriculum</strong>
                    <p>Our courses are built around real skills that matter—be it in academics, test prep, technology,
                      communication, or career development.</p>
                  </div>
                </div>

              </li>
              <li data-aos="slide-left" data-aos-delay="100">
                <div className="row">
                  <div className="col-auto">
                    <i className="bi bi-check2-all"></i>
                  </div>
                  <div className="col-10">
                    <strong>🌐 Engaging Learning Environment</strong>
                    <p>From video lectures and live classes to quizzes, peer forums, and assignments—our online
                      classrooms are designed to keep you involved and motivated.</p>
                  </div>
                </div>

              </li>
            </ul>

          </div>
        </div>

      </div>

    </section>
    <section id="stats" className="stats section dark-background">

      <div className="container" data-aos="fade-up" data-aos-delay="100">

        <div className="row gy-4">

          <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <div className="stats-item text-center w-100 h-100">
              <span data-purecounter-start="0" data-purecounter-end="232" data-purecounter-duration="1"
                className="purecounter"></span>
              <p>Clients</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <div className="stats-item text-center w-100 h-100">
              <span data-purecounter-start="0" data-purecounter-end="521" data-purecounter-duration="1"
                className="purecounter"></span>
              <p>Projects</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="300">
            <div className="stats-item text-center w-100 h-100">
              <span data-purecounter-start="0" data-purecounter-end="1453" data-purecounter-duration="1"
                className="purecounter"></span>
              <p>Hours Of Support</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="300">
            <div className="stats-item text-center w-100 h-100">
              <span data-purecounter-start="0" data-purecounter-end="32" data-purecounter-duration="1"
                className="purecounter"></span>
              <p>Workers</p>
            </div>
          </div>

        </div>

      </div>

    </section>
    
    <section id="services" className="services section light-background" data-aos="fade-up" data-aos-delay="100">
      <div className="container section-title" >
        <h2> What We Offer</h2>
      </div>
      <div className="container">

        <div className="row gy-4">

          <div className="col-lg-4 col-md-6" >
            <div className="service-item position-relative">

              <h4> <i className="bi bi-file-earmark-text"></i> Academic Courses</h4>
              <p>Math, Science, Languages, and more for school and college-level students</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6" >
            <div className="service-item position-relative">

              <h4> <i className="bi bi-file-earmark-check"></i> Test Prep</h4>
              <p>Comprehensive preparation for competitive exams like IELTS, SAT, or subject-specific assessments</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6" >
            <div className="service-item position-relative">

              <h4> <i className="bi bi-file-earmark-person"></i> Skill Building</h4>
              <p>Public speaking, digital literacy, coding, critical thinking, etc.</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="service-item position-relative">

              <h4> <i className="bi bi-file-earmark-person"></i> Live Classrooms</h4>
              <p>Interactive sessions with instructors, real-time Q&A, and feedback</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="service-item position-relative">

              <h4> <i className="bi bi-file-earmark-person"></i>Certificates</h4>
              <p>Earn completion certificates to showcase your achievements</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="vision" className="vision section" data-aos="slide-right" data-aos-delay="100">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-6 col-md-6">
            <div className="row gy-4">
              <div className="col-12">
                <h3>Our Vision</h3>
                <p>We envision a world where learning is not limited by geography, time, or background. With
                  Apply4Study,
                  education becomes a continuous journey—powered by curiosity, supported by technology, and led by
                  purpose.</p>
                <p>Join our growing learning community and take the next step in your academic or personal growth.</p>
                <p>👉 Start learning today—because your future begins with knowledge.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="row gy-4">
              <div className="col-12">
                <h3>Our Mission</h3>
                <p>At Apply4Study, we're on a mission to make quality education accessible, flexible, and truly
                  learner-centric. Our online classroom platform is designed to help students, professionals, and
                  lifelong
                  learners gain in-demand skills and knowledge—on their own schedule, from anywhere in the world.</p>
                <p>Whether you're looking to advance your career, explore a new field, or simply learn something new,
                  Apply4Study is here to support you every step of the way. Join us and discover a world of learning
                  opportunities at your fingertips.</p>
              </div>
            </div>
          </div>
        </div>
      </div>


    </section>
     
    </div>
    </>
  );
}