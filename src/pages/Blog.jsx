import React, { useState, useEffect } from 'react';
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
  const [blogs, setBlogs] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/blog/fetchall`, {
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
          setBlogs(data.data);
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
              {blogs.map(blog => (
              <div className="col-lg-4">
                <article>
                  <div className="post-img">
                    <LazyImage src={getSequentialImage(blogImages)} alt={blog.title} loading="lazy" className="img-fluid" />
                  </div>
                  <p className="post-category">{blog.category}</p>
                  <h2 className="title mb-2">
                    <a href={`/blog/${blog.slug}`}>{blog.title}</a>
                  </h2>
                  <p className="post-category">{blog.summary}</p>
                  <div className="d-flex align-items-center">
                    <LazyImage src={getSequentialAImage(authorImages)} alt={blog.author.name} className="img-fluid post-author-img flex-shrink-0" />
                    <div className="post-meta">
                      <p className="post-author">{blog.author.name}</p>
                      <p className="post-date">
                        <time dateTime={formatDate(blog.publishDate).ymd}>{formatDate(blog.publishDate).readable}</time>
                      </p>
                    </div>
                  </div>
                </article>
              </div>
              ))}
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