import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import LazyImage from '../components/common/LazyImage';
import useSEO from "../hooks/useSEO";
import Newsletter from '../components/common/Newsletter';

import blog1 from '../assets/img/blog/blog-1.jpg';
import blog2 from '../assets/img/blog/blog-2.jpg';
import blog3 from '../assets/img/blog/blog-3.jpg';
import blog4 from '../assets/img/blog/blog-4.jpg';
import blog5 from '../assets/img/blog/blog-5.jpg';
import blog6 from '../assets/img/blog/blog-6.jpg';
import blogAuth1 from '../assets/img/blog/blog-author-2.jpg';
import blogAuth2 from '../assets/img/blog/blog-author-2.jpg';
import blogAuth3 from '../assets/img/blog/blog-author-3.jpg';
import blogAuth4 from '../assets/img/blog/blog-author-4.jpg';
import blogAuth5 from '../assets/img/blog/blog-author-5.jpg';
import blogAuth6 from '../assets/img/blog/blog-author-6.jpg';

export default function Blog() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const APP_URL = process.env.REACT_APP_URL;

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Thank you for subscribing!');
  };

  useSEO({
    title: "How to Succeed in Online Learning — Apply4Study Blog",
    description: "Tips and strategies for succeeding in online classrooms.",
    canonical: `${APP_URL}/blog/online-learning-tips`,
    schema: {
      "datePublished": "2025-10-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Succeed in Online Learning",
      "author": {
        "@type": "Person",
        "name": "Vivek Kumar"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Apply4Study",
        "logo": {
          "@type": "ImageObject",
          "url": `${APP_URL}/assets/logo.png`
        }
      },
      "datePublished": "2025-10-01",
      "dateModified": "2025-10-02",
      "image": `${APP_URL}/assets/blog/online-learning.jpg`
    }
  });

  return (
    <>
      <div className="blog-page" >

        <div className="page-title dark-background blog_bg">
          <div className="container position-relative">
            <h1>Our Blog</h1>
            <nav className="breadcrumbs">
              <ol>
                <li><a href={APP_URL}>Home</a></li>
                <li className="current">Blog</li>
              </ol>
            </nav>
          </div>
        </div>

        <section className="section">
          <div className="container section-title" data-aos="fade-up">
            <h5> Insights, Tips & Stories to Power Your Learning Journey</h5>
            <p>Welcome to the <strong>Apply4Study</strong> Blog — your go-to space for practical advice, student stories, learning strategies, and education trends. Whether you're preparing for an exam, exploring new study habits, or simply curious about online learning, we've got something for you.</p>
          </div>
        </section>


        <section id="blog-posts" className="blog-posts section light-background">
          <div className="container section-title" data-aos="fade-up">
            <h5>Latest Posts</h5>
            <p>Explore our latest articles, tips, and insights to help you navigate your educational journey.</p>
          </div>

          <div className="container">
            <div className="row gy-4">

              <div className="col-lg-4">
                <article>

                  <div className="post-img">
                    <LazyImage src={blog1} alt="" className="img-fluid" />
                  </div>

                  <p className="post-category"> Study Tips</p>

                  <h2 className="title mb-2">
                    <a href="blog-details.html">5 Online Learning Habits That Lead to Success</a>
                  </h2>

                  <p className="post-category">Discover proven study habits that help online learners stay motivated, organized, and ahead of the curve.</p>

                  <div className="d-flex align-items-center">
                    <LazyImage src={blogAuth1} alt="" className="img-fluid post-author-img flex-shrink-0" />
                    <div className="post-meta">
                      <p className="post-author">Maria Doe</p>
                      <p className="post-date">
                        <time dateTime="2022-01-01">Jan 1, 2022</time>
                      </p>
                    </div>
                  </div>

                </article>
              </div>

              <div className="col-lg-4">
                <article>

                  <div className="post-img">
                    <LazyImage src={blog2} alt="" className="img-fluid" />
                  </div>
                  <p className="post-category">Test Prep</p>
                  <h2 className="title">
                    <a href="blog-details.html">IELTS vs PTE: Which Test is Right for You?</a>
                  </h2>
                  <p className="post-category">Confused between IELTS and PTE? We break down the differences, scoring systems, and ideal candidate profiles.</p>

                  <div className="d-flex align-items-center">
                    <LazyImage src={blogAuth2} alt="" className="img-fluid post-author-img flex-shrink-0" />
                    <div className="post-meta">
                      <p className="post-author">Allisa Mayer</p>
                      <p className="post-date">
                        <time dateTime="2022-01-01">Jun 5, 2022</time>
                      </p>
                    </div>
                  </div>

                </article>
              </div>

              <div className="col-lg-4">
                <article>

                  <div className="post-img">
                    <LazyImage src={blog3} alt="" className="img-fluid" />
                  </div>
                  <p className="post-category">E-learning Trends</p>

                  <h2 className="title">
                    <a href="blog-details.html">The Rise of Microlearning: Is It the Future of Online Education?</a>
                  </h2>
                  <p className="post-category">Short, focused lessons are changing how we learn. Here's why microlearning might be perfect for your schedule.</p>

                  <div className="d-flex align-items-center">
                    <LazyImage src={blogAuth3} alt="" className="img-fluid post-author-img flex-shrink-0" />
                    <div className="post-meta">
                      <p className="post-author">Mark Dower</p>
                      <p className="post-date">
                        <time dateTime="2022-01-01">Jun 22, 2022</time>
                      </p>
                    </div>
                  </div>

                </article>
              </div>

              <div className="col-lg-4">
                <article>

                  <div className="post-img">
                    <LazyImage src={blog4} alt="" className="img-fluid" />
                  </div>
                  <p className="post-category"> Productivity</p>

                  <h2 className="title">
                    <a href="blog-details.html">How to Stay Focused in Online Classes (Even When You're Home)</a>
                  </h2>
                  <p className="post-category">Simple ways to beat distractions, stay productive, and make the most of your virtual classroom.</p>

                  <div className="d-flex align-items-center">
                    <LazyImage src={blogAuth4} alt="" className="img-fluid post-author-img flex-shrink-0" />
                    <div className="post-meta">
                      <p className="post-author">Lisa Neymar</p>
                      <p className="post-date">
                        <time dateTime="2022-01-01">Jun 30, 2022</time>
                      </p>
                    </div>
                  </div>

                </article>
              </div>

              <div className="col-lg-4">
                <article>

                  <div className="post-img">
                    <LazyImage src={blog5} alt="" className="img-fluid" />
                  </div>

                  <p className="post-category">Tools & Resources</p>
                  <h2 className="title">
                    <a href="blog-details.html">Top 10 Free Tools Every Online Student Should Use</a>
                  </h2>
                  <p className="post-category">From note-taking apps to time trackers, here are the tools our students swear by.</p>

                  <div className="d-flex align-items-center">
                    <LazyImage src={blogAuth5} alt="" className="img-fluid post-author-img flex-shrink-0" />
                    <div className="post-meta">
                      <p className="post-author">Denis Peterson</p>
                      <p className="post-date">
                        <time dateTime="2022-01-01">Jan 30, 2022</time>
                      </p>
                    </div>
                  </div>

                </article>
              </div>

              <div className="col-lg-4">
                <article>

                  <div className="post-img">
                    <LazyImage src={blog6} alt="" className="img-fluid" />
                  </div>

                  <p className="post-category">Entertainment</p>

                  <h2 className="title">
                    <a href="blog-details.html">Distinctio provident quibusdam numquam aperiam aut</a>
                  </h2>

                  <div className="d-flex align-items-center">
                    <LazyImage src={blogAuth6} alt="" className="img-fluid post-author-img flex-shrink-0" />
                    <div className="post-meta">
                      <p className="post-author">Mika Lendon</p>
                      <p className="post-date">
                        <time dateTime="2022-01-01">Feb 14, 2022</time>
                      </p>
                    </div>
                  </div>

                </article>
              </div>

            </div>
          </div>

        </section>

        <section className="stats section mb-3">
          <div className="container section-title col-lg-6 col-md-6 col-12 pb-0" data-aos="fade-up">
            <h3>Want to Contribute?</h3>
            <p>Are you a student, teacher, or education enthusiast with insights to share?</p>
            <p>We welcome guest writers who want to inspire others through their learning journey.</p>
            <p className="my-3"><strong>📧 Email us at <a href="mailto:blog@apply4study.com" title=" blog@apply4study.com">blog@apply4study.com</a> to pitch your idea!</strong></p>
          </div>
        </section>


        <section id="blog-pagination" className="blog-pagination section">

          <div className="container">
            <div className="d-flex justify-content-center">
              <ul>
                <li><a href="#"><i className="bi bi-chevron-left"></i></a></li>
                <li><a href="#">1</a></li>
                <li><a href="#" className="active">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li>...</li>
                <li><a href="#">10</a></li>
                <li><a href="#"><i className="bi bi-chevron-right"></i></a></li>
              </ul>
            </div>
          </div>

        </section>


        <Newsletter />
      </div>
    </>
  );
}