import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import AOS from 'aos';
import 'aos/dist/aos.css';
import testimonial1 from '../assets/img/exam.png';
import testimonial2 from '../assets/img/exam.png';
import testimonial3 from '../assets/img/exam.png';
import LazyImage from '../components/common/LazyImage';
import DocumentMeta from 'react-document-meta';

const meta = {
  title: 'Partners | Apply4Study',
  description: 'Lorem Ipsum content here',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'study, apply, international, education',
    },
    property: {
      'og:title': 'Partners | Apply4Study',
      'og:description': 'Lorem Ipsum content here',
      'og:image': 'https://www.apply4study.com/assets/img/loremIpsum.jpg',
    },
  },
};


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

export default function Partners() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <DocumentMeta {...meta}>
      <div className="partners-page">

        <div className="page-title dark-background partners_bg">
          <div className="container position-relative">
            <h1>Our Partners</h1>
            <nav className="breadcrumbs">
              <ol>
                <li><a href="index.html">Home</a></li>
                <li className="current">Partners</li>
              </ol>
            </nav>
          </div>
        </div>

        <section className="section ">
          <div className="container section-title pb-0" data-aos="fade-up">
            <h5> Collaborating for Better Learning Outcomes</h5>
            <p>At <strong>Apply4Study</strong>, we believe great education is built on strong partnerships. We proudly
              collaborate with a network of trusted institutions, educators, edtech providers, and corporate trainers to
              deliver high-quality, accessible, and future-ready learning experiences.</p>
            <p>Whether it's content development, technology integration, or academic enrichment, our partners play a vital
              role in shaping the success of our learners.</p>
          </div>
        </section>
        <section className=" about section light-background ">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-6 position-relative align-self-start" data-aos="fade-up" data-aos-delay="100">
                <LazyImage src="assets/img/about.jpg" className="img-fluid" alt="" />
                <a href="https://www.youtube.com/watch?v=Y7f98aduVJ8" className="glightbox pulsating-play-btn"></a>
              </div>
              <div className="col-lg-6 content" data-aos="fade-up" data-aos-delay="200">
                <h3>🎓 Academic & Institutional Partners</h3>
                <p> We work with schools, colleges, and universities to create blended learning solutions that complement
                  traditional education. Our academic partners help us ensure that content is curriculum-aligned, credible,
                  and impactful.</p>
                <ul>
                  <li data-aos="slide-left" data-aos-delay="100">
                    <div className="row">
                      <div className="col-auto">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>Curriculum-aligned modules for school boards (CBSE, ICSE, IB)</p>
                      </div>
                    </div>
                  </li>
                  <li data-aos="slide-left" data-aos-delay="200">
                    <div className="row">
                      <div className="col-auto">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>Exam prep and support courses for university students</p>

                      </div>
                    </div>
                  </li>
                  <li data-aos="slide-left" data-aos-delay="300">
                    <div className="row">
                      <div className="col-auto">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>Co-branded certifications and special training programs</p>

                      </div>
                    </div>

                  </li>

                </ul>

              </div>
            </div>
          </div>
        </section>

        <section className=" about section light-background ">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-6 content" data-aos="fade-up" data-aos-delay="200">
                <h3>🖥️ EdTech & Content Collaborators</h3>
                <p>Our tech and content partners help us bring innovation to education—from interactive videos to AI-powered
                  assessments.</p>
                <ul>
                  <li data-aos="slide-left" data-aos-delay="100">
                    <div className="row">
                      <div className="col-auto">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>Educational software and LMS integration</p>
                      </div>
                    </div>
                  </li>
                  <li data-aos="slide-left" data-aos-delay="200">
                    <div className="row">
                      <div className="col-auto">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>Content licensing and custom course creation</p>

                      </div>
                    </div>
                  </li>
                  <li data-aos="slide-left" data-aos-delay="300">
                    <div className="row">
                      <div className="col-auto">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>Virtual lab tools and gamified learning resources</p>

                      </div>
                    </div>

                  </li>

                </ul>

              </div>
              <div className="col-lg-6 position-relative align-self-start" data-aos="fade-up" data-aos-delay="100">
                <LazyImage src="assets/img/about.jpg" className="img-fluid" alt="" />
                <a href="https://www.youtube.com/watch?v=Y7f98aduVJ8" className="glightbox pulsating-play-btn"></a>
              </div>
            </div>
          </div>
        </section>

        <section className=" about section ">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-6 position-relative align-self-start" data-aos="fade-up" data-aos-delay="100">
                <LazyImage src="assets/img/about.jpg" className="img-fluid" alt="" />
                <a href="https://www.youtube.com/watch?v=Y7f98aduVJ8" className="glightbox pulsating-play-btn"></a>
              </div>
              <div className="col-lg-6 content" data-aos="fade-up" data-aos-delay="200">
                <h3>💼 Corporate & Training Partners</h3>
                <p>We also work with businesses and training institutes to deliver scalable upskilling solutions for
                  employees and professionals.</p>
                <ul>
                  <li data-aos="slide-left" data-aos-delay="100">
                    <div className="row">
                      <div className="col-auto">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>Soft skills, communication, and productivity training</p>
                      </div>
                    </div>
                  </li>
                  <li data-aos="slide-left" data-aos-delay="200">
                    <div className="row">
                      <div className="col-auto">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>Onboarding and employee development modules</p>

                      </div>
                    </div>
                  </li>
                  <li data-aos="slide-left" data-aos-delay="300">
                    <div className="row">
                      <div className="col-auto">
                        <i className="bi bi-check2-all"></i>
                      </div>
                      <div className="col-10">
                        <p>Industry-specific skill courses with real-world relevance</p>

                      </div>
                    </div>

                  </li>

                </ul>

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

        <section className="stats section">
          <div className="container section-title col-lg-6 col-md-6 col-12 pb-0" data-aos="fade-up">
            <h3> Let's Grow Together</h3>

            <p>If you're an educator, institution, or organization looking to amplify your impact in the digital learning
              space, we'd love to partner with you.</p>
            <p className="my-3"><strong>👉 Contact us at <a href="mailto:partnerships@apply4study.com"
              title="partnerships@apply4study.com">partnerships@apply4study.com</a></strong></p>
          </div>
        </section>


      </div>
    </DocumentMeta>
  );
}