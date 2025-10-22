const APP_URL = process.env.REACT_APP_URL || "https://www.apply4study.com";

function getSeoConfig() {
    switch(process.env.NODE_ENV){
        // use for production environment
        case 'prod':
            return {
                // add for production
            };
        break;
        // use for local environment
        default:
            return {
                Home: {
                    title: "Apply4Study — Online Learning Platform",
                    description: "Join Apply4Study to access interactive e-learning, online classrooms, and flexible study options.",
                    canonical: `${APP_URL}/`,
                    keywords: "elearning, online classroom, virtual study, apply4study",
                    og: {
                        "og:title": "Apply4Study — Online Learning Platform",
                        "og:description": "Learn smarter with Apply4Study. Online classrooms, live lectures, and flexible e-learning options.",
                        "og:type": "website",
                        "og:url": `${APP_URL}/`,
                        "og:image": `${APP_URL}/assets/og-banner.jpg`,
                    },
                    twitter: {
                        "twitter:card": "summary_large_image",
                        "twitter:title": "Apply4Study — Online Learning Platform",
                        "twitter:description": "Access interactive online courses with Apply4Study.",
                        "twitter:image": `${APP_URL}/assets/og-banner.jpg`,
                    },
                    schema: {
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "Apply4Study",
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
                },
                About: {
                    title: "Apply4Study — Know about Us",
                    description: "Reach out to Apply4Study for online learning support, inquiries, or collaborations.",
                    canonical: `${APP_URL}/about`,
                    schema: {
                        "@context": "https://schema.org",
                        "@type": "LocalBusiness",
                        "name": "Apply4Study",
                        "datePublished": "2025-10-01",
                        "dateModified": new Date().toISOString().split("T")[0],
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
                            "https://x.com/apply4study",
                            "https://www.linkedin.com/company/apply4study"
                        ]
                    }
                },
                Blog: {
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
                },
                Contact: {
                    title: "Contact Apply4Study — Get in Touch",
                    description: "Have questions or need support? Contact Apply4Study for online learning assistance, business inquiries, or partnership opportunities.",
                    canonical: `${APP_URL}/contact`,
                    schema: {
                        "datePublished": "2025-10-01",
                        "dateModified": new Date().toISOString().split("T")[0],
                        "@context": "https://schema.org",
                        "@type": "ContactPage",
                        "mainEntity": {
                            "@type": "Organization",
                            "name": "Apply4Study",
                            "url": `${APP_URL}/`,
                            "logo": `${APP_URL}/assets/logo.png`,
                            "contactPoint": {
                                "@type": "ContactPoint",
                                "telephone": "+91-9716003265",
                                "email": "support@apply4study.com",
                                "contactType": "customer support",
                                "areaServed": "IN",
                                "availableLanguage": ["English", "Hindi"]
                            },
                            "sameAs": [
                                "https://www.facebook.com/apply4study",
                                "https://www.x.com/apply4study",
                                "https://www.instagram.com/apply4study",
                                "https://www.linkedin.com/company/apply4study",
                                "https://www.pinterest.com/apply4study",
                            ]
                        }
                    }
                },
                Courses: {
                    title: "Explore Online Courses — Apply4Study",
                    description: "Browse Apply4Study’s collection of online courses designed to enhance your learning journey.",
                    canonical: `${APP_URL}/courses`,
                    schema: {
                        "datePublished": "2025-10-01",
                        "dateModified": new Date().toISOString().split("T")[0],
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        "itemListElement": [
                            {
                              "@type": "Course",
                              "name": "Full-Stack Web Development",
                              "description": "Learn React, Node.js, and MongoDB in this full-stack developer course.",
                              "url": `${APP_URL}/courses/fullstack-web-development`
                            },
                            {
                              "@type": "Course",
                              "name": "Digital Marketing Essentials",
                              "description": "Master SEO, SEM, and social media marketing strategies.",
                              "url": `${APP_URL}/courses/digital-marketing`
                            },
                            {
                              "@type": "Course",
                              "name": "Data Science with Python",
                              "description": "Hands-on Python, Pandas, and Machine Learning training.",
                              "url": `${APP_URL}/courses/data-science`
                            }
                        ]
                    }
                },
                GetStarted: {
                    title: "Get Started — Join Apply4Study",
                    description: "Sign up today and start your journey with Apply4Study’s interactive online learning platform.",
                    canonical: `${APP_URL}/get-started`,
                    schema: {
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "Get Started with Apply4Study",
                        "url": `${APP_URL}/get-started`,
                        "description": "Sign up for Apply4Study and access online courses, classrooms, and digital learning resources.",
                        "datePublished": "2025-10-01",
                        "dateModified": new Date().toISOString().split("T")[0],
                        "publisher": {
                            "@type": "Organization",
                            "name": "Apply4Study",
                            "logo": {
                                "@type": "ImageObject",
                                "url": `${APP_URL}/assets/logo.png`
                            }
                        }
                    }
                },
                Partners: {
                    title: "Our Partners — Apply4Study",
                    description: "Meet Apply4Study’s global education partners and collaborators.",
                    canonical: `${APP_URL}/partners`,
                    schema: {
                      "@context": "https://schema.org",
                      "@type": "Organization",
                      "name": "Apply4Study Partners",
                      "datePublished": "2025-10-01",
                      "dateModified": new Date().toISOString().split("T")[0],
                      "url": `${APP_URL}/partners`,
                      "logo": `${APP_URL}/assets/logo.png`,
                      "brand": [
                            {
                              "@type": "Brand",
                              "name": "EduGlobal",
                              "url": "https://eduglobal.com"
                            },
                            {
                              "@type": "Brand",
                              "name": "SmartLearning",
                              "url": "https://smartlearning.com"
                            }
                        ]
                    }
                },
                Price: {
                    title: "Pricing Plans — Apply4Study",
                    description: "Choose from affordable pricing plans for online courses and e-learning services at Apply4Study.",
                    canonical: `${APP_URL}/pricing`,
                    schema: {
                        "@context": "https://schema.org",
                        "@type": "Offer",
                        "name": "Apply4Study Course Subscription",
                        "datePublished": "2025-10-01",
                        "dateModified": new Date().toISOString().split("T")[0],
                        "price": "4999",
                        "priceCurrency": "INR",
                        "availability": "https://schema.org/InStock",
                        "url": `${APP_URL}/pricing`,
                        "eligibleRegion": {
                            "@type": "Country",
                            "name": "India"
                        },
                        "seller": {
                            "@type": "Organization",
                            "name": "Apply4Study",
                            "url": `${APP_URL}`
                        }
                    }
                },
                PrivacyPolicy: {
                    title: "Privacy Policy — Apply4Study",
                    description: "Learn how Apply4Study protects your privacy and personal information while delivering secure and trusted online learning experiences.",
                    canonical: `${APP_URL}/privacy-policy`,
                    schema: {
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "Privacy Policy - Apply4Study",
                        "description": "Apply4Study respects your privacy and ensures transparency in how your personal data is collected and used.",
                        "datePublished": "2025-10-01",
                        "dateModified": new Date().toISOString().split("T")[0],
                        "publisher": {
                            "@type": "Organization",
                            "name": "Apply4Study",
                            "url": APP_URL,
                            "logo": `${APP_URL}/assets/logo.png`
                        }
                    }
                },
                Python: {
                    title: "Full-Stack Web Development Course — Apply4Study",
                    description: "Learn full-stack development with Apply4Study’s online course covering React, Node.js, and MongoDB.",
                    canonical: `${APP_URL}/courses/fullstack-web-development`,
                    schema: {
                        "@context": "https://schema.org",
                        "@type": "Course",
                        "name": "Full-Stack Web Development",
                        "description": "Comprehensive full-stack course covering React, Node.js, MongoDB, and deployment best practices.",
                        "provider": {
                            "@type": "Organization",
                            "name": "Apply4Study",
                            "sameAs": `${APP_URL}`
                        },
                        "hasCourseInstance": {
                            "@type": "CourseInstance",
                            "courseMode": "online",
                            "startDate": "2025-10-15",
                            "endDate": "2026-03-15",
                            "instructor": {
                              "@type": "Person",
                              "name": "John Doe"
                            },
                            "location": {
                              "@type": "VirtualLocation",
                              "url": `${APP_URL}/classroom`
                            },
                            "offers": {
                              "@type": "Offer",
                              "price": "9999",
                              "priceCurrency": "INR",
                              "availability": "https://schema.org/InStock",
                              "url": `${APP_URL}/courses/fullstack-web-development`
                            }
                        }
                    }
                },
                RefundPolicy: {
                    title: "Cancellation & Refund Policy — Apply4Study",
                    description: "Read Apply4Study’s cancellation and refund policy for payments made via Razorpay. Understand eligibility, refund timelines, and support process.",
                    canonical: `${APP_URL}/cancellation-refund-policy`,
                    schema: {
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "Cancellation & Refund Policy - Apply4Study",
                        "description": "Apply4Study’s policy describing refund eligibility and cancellation procedures for Razorpay transactions.",
                        "datePublished": "2025-10-01",
                        "dateModified": new Date().toISOString().split("T")[0],
                        "publisher": {
                            "@type": "Organization",
                            "name": "Apply4Study",
                            "url": APP_URL,
                            "logo": `${APP_URL}/assets/logo.png`
                        },
                        "mainEntity": {
                            "@type": "FAQPage",
                            "mainEntity": [
                                {
                                    "@type": "Question",
                                    "name": "How can I request a refund?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "Refunds can be requested by contacting Apply4Study support within 7 days of payment through your Razorpay transaction reference."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "How long does it take to process refunds?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "Refunds are processed within 5–7 business days to the original payment method via Razorpay."
                                    }
                                }
                            ]
                        }
                    }
                },
                Services: {
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
                },
                ShippingPolicy: {
                    title: "Shipping Policy — Apply4Study",
                    description: "Understand Apply4Study's shipping policy for physical or digital course materials. Learn about processing times, delivery methods, and support contact details.",
                    canonical: `${APP_URL}/shipping-policy`,
                    schema: {
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "Shipping Policy - Apply4Study",
                        "description": "Apply4Study outlines the terms and process for shipping digital or physical materials, including delivery timelines and handling.",
                        "datePublished": "2025-10-01",
                        "dateModified": new Date().toISOString().split("T")[0],
                        "publisher": {
                            "@type": "Organization",
                            "name": "Apply4Study",
                            "url": APP_URL,
                            "logo": `${APP_URL}/assets/logo.png`
                        }
                    }
                },
                TermsConditions: {
                    title: "Terms & Conditions — Apply4Study",
                    description: "Review Apply4Study’s Terms & Conditions to understand the rules and responsibilities of using our online learning platform.",
                    canonical: `${APP_URL}/terms-conditions`,
                    schema: {
                        "@context": "https://schema.org",
                        "@type": ["WebPage", "FAQPage"],
                        "name": "Terms and Conditions - Apply4Study",
                        "description": "These Terms & Conditions govern your access and use of Apply4Study's learning platform and services.",
                        "datePublished": "2025-10-01",
                        "dateModified": new Date().toISOString().split("T")[0],
                        "publisher": {
                            "@type": "Organization",
                            "name": "Apply4Study",
                            "url": APP_URL,
                            "logo": `${APP_URL}/assets/logo.png`,
                        },
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "What are the terms of using Apply4Study?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "By using Apply4Study, you agree to comply with our platform guidelines, payment policies, and community standards."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Can I cancel my account anytime?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes. You can cancel your account anytime by contacting our support team. Refunds depend on the selected plan and payment method."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Does Apply4Study update its terms?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes. We may update these terms periodically to reflect new features, services, or legal requirements."
                                }
                            }
                        ]
                    }
                },
                // Add More
            };
        break;
    }
}

const seoConfig = new getSeoConfig();
export default seoConfig;
