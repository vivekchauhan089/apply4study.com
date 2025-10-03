import React, { useState } from "react";

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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
      question: "Is it free?",
      answer: "Yes, the basic version of our platform is completely free to use.",
    },
    {
      question: "Can I use it offline?",
      answer: "Some features are available offline after downloading content.",
    },
    {
      question: "How is my data stored?",
      answer:
        "We securely store your data using encrypted databases and never share it without permission.",
    },
  ];

  return (
    <>
    {/*<SEO
      title="FAQ — Apply4Study Online Learning"
      description="Find answers to common questions about Apply4Study’s online courses, live classes, certifications and pricing."
      url="https://apply4study.com/faq"
      schema={schema}
    />*/}
    <div className="section">
      <div className="container section-title" data-aos="slide-up">
        <h2>FAQ</h2>
        <div className="accordion text-start">
          {faqs.map((item, index) => (
            <div
              className="accordion-item"
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
               <span>{item.question}</span> 
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
    </div>
    </>
  );
};

export default FaqSection;
