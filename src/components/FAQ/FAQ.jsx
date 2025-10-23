import React, { useState } from "react";

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const APP_URL = process.env.REACT_APP_URL;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do I get a certificate after completing a course?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Apply4Study provides a certificate of completion for all courses."
        }
      },
      {
        "@type": "Question",
        "name": "Can I access recorded classes later?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all live sessions are recorded and available to students anytime."
        }
      }
    ]
  };

  const faqs = [
    {
      question: 'What is Apply4Study?',
      answer: 'Apply4Study is an <a href="/about">online learning platform</a> that connects students, teachers, and universities to provide high-quality eLearning and classroom education programs.',
    },
    {
      question: 'How do I apply for a course?',
      answer: 'Visit our <a href="/courses">Online Courses</a> page, select your desired program, and click “Apply Now.” You can track your application through your student dashboard.',
    },
    {
      question: 'Are there any free courses available?',
      answer: 'Yes! Apply4Study offers free demo lessons and introductory modules for selected <a href="/courses/free">free online courses</a>. Explore them anytime to start learning.',
    },
    {
      question: 'Can I access classes on mobile?',
      answer: 'Absolutely. The Apply4Study platform is mobile-friendly, allowing students and teachers to attend live classes, view recordings, and complete assignments on any device.',
    },
    {
      question: 'Which exams can I prepare for?',
      answer: 'Our exam preparation tools support multiple categories like IELTS, GRE, and government exams. Visit our <a href="/exam-preparation">Exam Prep</a> section for details.',
    },
  ];

  return (
    <>
    {/*<SEO
      title="FAQ — Apply4Study Online Learning"
      description="Find answers to common questions about Apply4Study’s online courses, live classes, certifications and pricing."
      url=`${APP_URL}/faq`
      schema={schema}
    />*/}
    <section id="faq" className="faq section" aria-label="Frequently Asked Questions">
      <div className="container section-title" data-aos="fade-up">
        <h2>Frequently Asked Questions</h2>
        <p>Find answers to common questions about Apply4Study’s online courses, enrollment process, and classroom programs.</p>
      </div>

      <div className="container faq-list" data-aos="fade-up" data-aos-delay="100">
        <div className="accordion text-start">
          {faqs.map((item, index) => (
            <div
              className="accordion-item faq-item"
              key={index}
              data-aos="slide-up"
              data-aos-delay={120 + index * 10}
            >
              <button
                className={`accordion-header btn w-100 justify-content-between d-flex ${
                  activeIndex === index ? "" : "collapsed"
                }`}
                onClick={() => toggleItem(index)}
              >
                <h5>{item.question}</h5> 
                <i className={`bi ${activeIndex === index ? "bi-chevron-up" : "bi-chevron-down"} ms-2`}></i>
              </button>
              <div
                className={`accordion-body collapse ${
                  activeIndex === index ? "open" : ""
                }`}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default FaqSection;
