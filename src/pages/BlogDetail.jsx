import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

import LazyImage from '../components/common/LazyImage.jsx';
import useSEO from "../hooks/useSEO.jsx";
import Newsletter from '../components/common/Newsletter.jsx';

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
  const [blog, setBlog] = useState([]);
  const { slug } = useParams();

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/blog/${slug}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0LCJ1c2VyX3R5cGVfaWQiOjAsInJvbGUiOiJndWVzdCIsImlhdCI6MTc1ODg4NDcwOCwiZXhwIjoxNzY0MDY4NzA4fQ.zWg19kpqcRf0sxKzrioWP_HzogoC5fHQPeGHTE6nZpc"
      },
      body: JSON.stringify({
        "user_id": "68d27fa20a1b391f84d652ba",
        "source": "Livguard"
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          setBlog(data.data);
        } else {
          console.error("Error:", data.error);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Thank you for subscribing!');
  };

  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return {
      readable: d.toLocaleDateString("en-US", options), // Jan 1, 2022
      ymd: d.toISOString().split("T")[0]                // 2022-01-01
    };
  };

  let currentIndex = 0;
  function getSequentialImage(images) {
    if (!images || images.length === 0) return null;
    const image = images[currentIndex];
    currentIndex = (currentIndex + 1) % images.length;
    return image;
  }

  let currentAIndex = 0;
  function getSequentialAImage(images) {
    if (!images || images.length === 0) return null;
    const image = images[currentAIndex];
    currentAIndex = (currentAIndex + 1) % images.length;
    return image;
  }

  const blogImages = [
    blog1,
    blog2,
    blog3,
    blog4,
    blog5,
    blog6,
  ];

  const authorImages = [
    blogAuth1,
    blogAuth2,
    blogAuth3,
    blogAuth4,
    blogAuth5,
    blogAuth6,
  ];

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
      "image": `${APP_URL}/assets/blog/online-learning.jpg`
    }
  });

  return (
    <>
      <div className="blog-details-page" >

        <section className="section">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <section id="blog-details" className="blog-details section">
                  <div className="container">

                    <article className="article">

                      <div className="post-img">
                        <LazyImage src="BLOG_HERO_IMG" alt="" loading="lazy" className="img-fluid" />
                      </div>

                      <h2 className="title">BLOG_TITLE</h2>

                      <div className="meta-top">
                        <ul>
                          <li className="d-flex align-items-center"><i className="bi bi-person"></i> <a href="#">BLOG_AUTH_NAME</a></li>
                          <li className="d-flex align-items-center"><i className="bi bi-clock"></i> <a href="#"><time dateTime="BLOG_PUBLISH_DATE_YMD">BLOG_PUBLISH_DATE</time></a></li>
                          <li className="d-flex align-items-center"><i className="bi bi-chat-dots"></i> <a href="#">12 Comments</a></li>
                        </ul>
                      </div>

                      <div className="content">
                        BLOG_CONTENT

                        <blockquote>
                          <p>
                            Et vero doloremque tempore voluptatem ratione vel aut. Deleniti sunt animi aut. Aut eos aliquam doloribus minus autem quos.
                          </p>
                        </blockquote>

                        <p>
                          Sed quo laboriosam qui architecto. Occaecati repellendus omnis dicta inventore tempore provident voluptas mollitia aliquid. Id repellendus quia. Asperiores nihil magni dicta est suscipit perspiciatis. Voluptate ex rerum assumenda dolores nihil quaerat.
                          Dolor porro tempora et quibusdam voluptas. Beatae aut at ad qui tempore corrupti velit quisquam rerum. Omnis dolorum exercitationem harum qui qui blanditiis neque.
                          Iusto autem itaque. Repudiandae hic quae aspernatur ea neque qui. Architecto voluptatem magni. Vel magnam quod et tempora deleniti error rerum nihil tempora.
                        </p>

                        <h3>Et quae iure vel ut odit alias.</h3>
                        <p>
                          Officiis animi maxime nulla quo et harum eum quis a. Sit hic in qui quos fugit ut rerum atque. Optio provident dolores atque voluptatem rem excepturi molestiae qui. Voluptatem laborum omnis ullam quibusdam perspiciatis nulla nostrum. Voluptatum est libero eum nesciunt aliquid qui.
                          Quia et suscipit non sequi. Maxime sed odit. Beatae nesciunt nesciunt accusamus quia aut ratione aspernatur dolor. Sint harum eveniet dicta exercitationem minima. Exercitationem omnis asperiores natus aperiam dolor consequatur id ex sed. Quibusdam rerum dolores sint consequatur quidem ea.
                          Beatae minima sunt libero soluta sapiente in rem assumenda. Et qui odit voluptatem. Cum quibusdam voluptatem voluptatem accusamus mollitia aut atque aut.
                        </p>
                        <LazyImage src="assets/img/blog/blog-inside-post.jpg" className="img-fluid" alt="" loading="lazy"/>

                        <h3>Ut repellat blanditiis est dolore sunt dolorum quae.</h3>
                        <p>
                          Rerum ea est assumenda pariatur quasi et quam. Facilis nam porro amet nostrum. In assumenda quia quae a id praesentium. Quos deleniti libero sed occaecati aut porro autem. Consectetur sed excepturi sint non placeat quia repellat incidunt labore. Autem facilis hic dolorum dolores vel.
                          Consectetur quasi id et optio praesentium aut asperiores eaque aut. Explicabo omnis quibusdam esse. Ex libero illum iusto totam et ut aut blanditiis. Veritatis numquam ut illum ut a quam vitae.
                        </p>
                        <p>
                          Alias quia non aliquid. Eos et ea velit. Voluptatem maxime enim omnis ipsa voluptas incidunt. Nulla sit eaque mollitia nisi asperiores est veniam.
                        </p>

                      </div>

                      <div className="meta-bottom">
                        <i className="bi bi-folder"></i>&nbsp;&nbsp;
                        <ul className="cats">
                          <li><a href="#">BLOG_CATEGORY</a></li>
                        </ul>

                        BLOG_TAGS
                      </div>

                    </article>

                  </div>
                </section>

                <section id="blog-comments" className="blog-comments section">

                  <div className="container">

                    <h4 className="comments-count">8 Comments</h4>

                    <div id="comment-1" className="comment">
                      <div className="d-flex">
                        <div className="comment-img"><LazyImage src="/assets/img/blog/comments-1.jpg" alt="" loading="lazy" /></div>
                        <div>
                          <h5><a href="">Georgia Reader</a> <a href="#" className="reply"><i className="bi bi-reply-fill"></i> Reply</a></h5>
                          <time dateTime="2020-01-01">01 Jan,2022</time>
                          <p>
                            Et rerum totam nisi. Molestiae vel quam dolorum vel voluptatem et et. Est ad aut sapiente quis molestiae est qui cum soluta.
                            Vero aut rerum vel. Rerum quos laboriosam placeat ex qui. Sint qui facilis et.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div id="comment-2" className="comment">
                      <div className="d-flex">
                        <div className="comment-img"><LazyImage src="/assets/img/blog/comments-2.jpg" alt="" loading="lazy"/></div>
                        <div>
                          <h5><a href="">Aron Alvarado</a> <a href="#" className="reply"><i className="bi bi-reply-fill"></i> Reply</a></h5>
                          <time dateTime="2020-01-01">01 Jan,2022</time>
                          <p>
                            Ipsam tempora sequi voluptatem quis sapiente non. Autem itaque eveniet saepe. Officiis illo ut beatae.
                          </p>
                        </div>
                      </div>

                      <div id="comment-reply-1" className="comment comment-reply">
                        <div className="d-flex">
                          <div className="comment-img"><LazyImage src="/assets/img/blog/comments-3.jpg" alt="" loading="lazy"/></div>
                          <div>
                            <h5><a href="">Lynda Small</a> <a href="#" className="reply"><i className="bi bi-reply-fill"></i> Reply</a></h5>
                            <time dateTime="2020-01-01">01 Jan,2022</time>
                            <p>
                              Enim ipsa eum fugiat fuga repellat. Commodi quo quo dicta. Est ullam aspernatur ut vitae quia mollitia id non. Qui ad quas nostrum rerum sed necessitatibus aut est. Eum officiis sed repellat maxime vero nisi natus. Amet nesciunt nesciunt qui illum omnis est et dolor recusandae.

                              Recusandae sit ad aut impedit et. Ipsa labore dolor impedit et natus in porro aut. Magnam qui cum. Illo similique occaecati nihil modi eligendi. Pariatur distinctio labore omnis incidunt et illum. Expedita et dignissimos distinctio laborum minima fugiat.

                              Libero corporis qui. Nam illo odio beatae enim ducimus. Harum reiciendis error dolorum non autem quisquam vero rerum neque.
                            </p>
                          </div>
                        </div>

                        <div id="comment-reply-2" className="comment comment-reply">
                          <div className="d-flex">
                            <div className="comment-img"><LazyImage src="/assets/img/blog/comments-4.jpg" alt="" loading="lazy"/></div>
                            <div>
                              <h5><a href="">Sianna Ramsay</a> <a href="#" className="reply"><i className="bi bi-reply-fill"></i> Reply</a></h5>
                              <time dateTime="2020-01-01">01 Jan,2022</time>
                              <p>
                                Et dignissimos impedit nulla et quo distinctio ex nemo. Omnis quia dolores cupiditate et. Ut unde qui eligendi sapiente omnis ullam. Placeat porro est commodi est officiis voluptas repellat quisquam possimus. Perferendis id consectetur necessitatibus.
                              </p>
                            </div>
                          </div>

                        </div>

                      </div>

                    </div>

                    <div id="comment-3" className="comment">
                      <div className="d-flex">
                        <div className="comment-img"><LazyImage src="/assets/img/blog/comments-5.jpg" alt="" loading="lazy"/></div>
                        <div>
                          <h5><a href="">Nolan Davidson</a> <a href="#" className="reply"><i className="bi bi-reply-fill"></i> Reply</a></h5>
                          <time dateTime="2020-01-01">01 Jan,2022</time>
                          <p>
                            Distinctio nesciunt rerum reprehenderit sed. Iste omnis eius repellendus quia nihil ut accusantium tempore. Nesciunt expedita id dolor exercitationem aspernatur aut quam ut. Voluptatem est accusamus iste at.
                            Non aut et et esse qui sit modi neque. Exercitationem et eos aspernatur. Ea est consequuntur officia beatae ea aut eos soluta. Non qui dolorum voluptatibus et optio veniam. Quam officia sit nostrum dolorem.
                          </p>
                        </div>
                      </div>

                    </div>

                    <div id="comment-4" className="comment">
                      <div className="d-flex">
                        <div className="comment-img"><LazyImage src="/assets/img/blog/comments-6.jpg" alt="" loading="lazy"/></div>
                        <div>
                          <h5><a href="">Kay Duggan</a> <a href="#" className="reply"><i className="bi bi-reply-fill"></i> Reply</a></h5>
                          <time dateTime="2020-01-01">01 Jan,2022</time>
                          <p>
                            Dolorem atque aut. Omnis doloremque blanditiis quia eum porro quis ut velit tempore. Cumque sed quia ut maxime. Est ad aut cum. Ut exercitationem non in fugiat.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section id="comment-form" className="comment-form section">
                  <div className="container">

                    <form action="">

                      <h4>Post Comment</h4>
                      <p>Your email address will not be published. Required fields are marked * </p>
                      <div className="row">
                        <div className="col-md-6 form-group">
                          <input name="name" type="text" className="form-control" placeholder="Your Name*" />
                        </div>
                        <div className="col-md-6 form-group">
                          <input name="email" type="text" className="form-control" placeholder="Your Email*" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col form-group">
                          <input name="website" type="text" className="form-control" placeholder="Your Website" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col form-group">
                          <textarea name="comment" className="form-control" placeholder="Your Comment*"></textarea>
                        </div>
                      </div>

                      <div className="text-center">
                        <button type="submit" className="btn btn-primary">Post Comment</button>
                      </div>

                    </form>
                  </div>
                </section>
              </div>

              <div className="col-lg-4 mt-5 sidebar">
                <div className="widgets-container">
                  <div className="blog-author-widget widget-item">
                    <div className="d-flex flex-column align-items-center">
                      <LazyImage src="BLOG_AUTH_IMG" className="rounded-circle flex-shrink-0" alt="" loading="lazy"/>
                      <h4>BLOG_AUTH_NAME</h4>
                      <div className="social-links">
                        <a href="https://x.com/#" style={{padding: "0px 6px", textAlign: "center"}}><i className="bi bi-twitter-x"></i></a>
                        <a href="https://facebook.com/#" style={{padding: "0px 6px", textAlign: "center"}}><i className="bi bi-facebook"></i></a>
                        <a href="https://instagram.com/#" style={{padding: "0px 6px", textAlign: "center"}}><i className="biu bi-instagram"></i></a>
                        <a href="https://instagram.com/#" style={{padding: "0px 6px", textAlign: "center"}}><i className="biu bi-linkedin"></i></a>
                      </div>

                      <p>
                        BLOG_AUTH_BIO
                      </p>

                    </div>
                  </div>

                  <div className="search-widget widget-item">
                    <h3 className="widget-title">Search</h3>
                    <form action="">
                      <input type="text" />
                      <button type="submit" title="Search"><i className="bi bi-search"></i></button>
                    </form>
                  </div>

                  <div className="categories-widget widget-item">
                    <h3 className="widget-title">Categories</h3>
                    <ul className="mt-3">
                      <li><a href="#">General <span>(25)</span></a></li>
                      <li><a href="#">Lifestyle <span>(12)</span></a></li>
                      <li><a href="#">Travel <span>(5)</span></a></li>
                      <li><a href="#">Design <span>(22)</span></a></li>
                      <li><a href="#">Creative <span>(8)</span></a></li>
                      <li><a href="#">Educaion <span>(14)</span></a></li>
                    </ul>
                  </div>

                  <div className="recent-posts-widget widget-item">
                    <h3 className="widget-title">Recent Posts</h3>
                    <div className="post-item">
                      <LazyImage src="/assets/img/blog/blog-recent-1.jpg" alt="" className="flex-shrink-0" loading="lazy"/>
                      <div>
                        <h4><a href="#">Nihil blanditiis at in nihil autem</a></h4>
                        <time dateTime="2020-01-01">Jan 1, 2020</time>
                      </div>
                    </div>

                    <div className="post-item">
                      <LazyImage src="/assets/img/blog/blog-recent-2.jpg" alt="" className="flex-shrink-0" loading="lazy"/>
                      <div>
                        <h4><a href="#">Quidem autem et impedit</a></h4>
                        <time dateTime="2020-01-01">Jan 1, 2020</time>
                      </div>
                    </div>

                    <div className="post-item">
                      <LazyImage src="/assets/img/blog/blog-recent-3.jpg" alt="" className="flex-shrink-0" loading="lazy"/>
                      <div>
                        <h4><a href="#">Id quia et et ut maxime similique occaecati ut</a></h4>
                        <time dateTime="2020-01-01">Jan 1, 2020</time>
                      </div>
                    </div>

                    <div className="post-item">
                      <LazyImage src="/assets/img/blog/blog-recent-4.jpg" alt="" className="flex-shrink-0" loading="lazy"/>
                      <div>
                        <h4><a href="#">Laborum corporis quo dara net para</a></h4>
                        <time dateTime="2020-01-01">Jan 1, 2020</time>
                      </div>
                    </div>

                    <div className="post-item">
                      <LazyImage src="/assets/img/blog/blog-recent-5.jpg" alt="" className="flex-shrink-0" loading="lazy"/>
                      <div>
                        <h4><a href="#">Et dolores corrupti quae illo quod dolor</a></h4>
                        <time dateTime="2020-01-01">Jan 1, 2020</time>
                      </div>
                    </div>
                  </div>

                  <div className="tags-widget widget-item">
                    <h3 className="widget-title">Tags</h3>
                    <ul>
                      <li><a href="#">App</a></li>
                      <li><a href="#">IT</a></li>
                      <li><a href="#">Business</a></li>
                      <li><a href="#">Mac</a></li>
                      <li><a href="#">Design</a></li>
                      <li><a href="#">Office</a></li>
                      <li><a href="#">Creative</a></li>
                      <li><a href="#">Studio</a></li>
                      <li><a href="#">Smart</a></li>
                      <li><a href="#">Tips</a></li>
                      <li><a href="#">Marketing</a></li>
                    </ul>
                  </div>
                </div>
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

        <Newsletter />
      </div>
    </>
  );
}