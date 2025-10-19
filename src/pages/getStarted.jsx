import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import AOS from 'aos';
import 'aos/dist/aos.css';
// import getStartedImg from '../assets/img/getStarted.png';

import img1 from '../assets/img/testimonials/testimonials-1.jpg';
import img2 from '../assets/img/testimonials/testimonials-2.jpg';
import img3 from '../assets/img/testimonials/testimonials-3.jpg';
import img4 from '../assets/img/testimonials/testimonials-4.jpg';
import img5 from '../assets/img/testimonials/testimonials-5.jpg';

import LazyImage from '../components/common/LazyImage';
import useSEO from "../hooks/useSEO";
import ReCAPTCHA from "react-google-recaptcha";

const testimonials = [
  {
    img: img1,
    name: 'Saul Goodman',
    role: 'Ceo & Founder',
    quote:
      'Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id...',
  },
  {
    img: img2,
    name: 'Sara Wilsson',
    role: 'Designer',
    quote:
      'Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis...',
  },
  {
    img: img3,
    name: 'Jena Karlis',
    role: 'Store Owner',
    quote:
      'Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis...',
  },
  {
    img: img4,
    name: 'Matt Brandon',
    role: 'Freelancer',
    quote:
      'Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat minim velit...',
  },
  {
    img: img5,
    name: 'John Larson',
    role: 'Entrepreneur',
    quote:
      'Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam...',
  },
];

export default function GetStarted() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const APP_URL = process.env.REACT_APP_URL;

  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    role: '',
    recaptcha: '',
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef();
  const [token, setToken] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.first_name.trim()) {
      newErrors.firstNameClass = 'is-invalid';
      newErrors.firstNameMsgClass = 'invalid-feedback';
      newErrors.first_name = 'First name is required';
    }
    if (!formData.email) {
      newErrors.emailClass = 'is-invalid';
      newErrors.emailMsgClass = 'invalid-feedback';
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.emailClass = 'is-invalid';
      newErrors.emailMsgClass = 'invalid-feedback';
      newErrors.email = 'Invalid email address';
    }
    if (!formData.mobile) {
      newErrors.mobileClass = 'is-invalid';
      newErrors.mobileMsgClass = 'invalid-feedback';
      newErrors.mobile = 'Mobile is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobileClass = 'is-invalid';
      newErrors.mobileMsgClass = 'invalid-feedback';
      newErrors.mobile = 'Mobile must be a 10 digit number';
    }
    if (!formData.role) {
      newErrors.roleClass = 'is-invalid';
      newErrors.roleMsgClass = 'invalid-feedback';
      newErrors.role = 'Please select a role';
    }
    if (!formData.termsAccepted) {
      newErrors.termsClass = 'is-invalid';
      newErrors.termsMsgClass = 'invalid-feedback';
      newErrors.termsAccepted = 'You must agree to terms';
    }

    const token = recaptchaRef.current.getValue();
    if (!token) {
      newErrors.captchaClass = 'is-invalid';
      newErrors.captchaMsgClass = 'invalid-feedback';
      newErrors.captcha = 'Please verify your identity at Apply4Study';
    }

    return newErrors;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setValidated(false);
    } else {
      setErrors({});
      setValidated(true);
      
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0LCJ1c2VyX3R5cGVfaWQiOjAsInJvbGUiOiJndWVzdCIsImlhdCI6MTc1ODg4NDcwOCwiZXhwIjoxNzY0MDY4NzA4fQ.zWg19kpqcRf0sxKzrioWP_HzogoC5fHQPeGHTE6nZpc"
          },
          body: JSON.stringify({
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            mobile: formData.mobile,
            role: formData.role,
            recaptcha: token,
            termsAccepted: formData.termsAccepted,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          setMessage(data.message || "Registration successful!");
          setFormData({
            first_name: "",
            last_name: "",
            email: "",
            mobile: "",
            role: "",
            recaptcha: "",
            termsAccepted: false,
          });
        } else {
          setMessage(data.message || "Registration failed. Please try again.");
        }
      } catch (error) {
        console.error("Registration error:", error);
        setMessage("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  // 🕒 Auto-clear message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useSEO({
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
  });

  return (
    <>      
      <div className="partners-page">

        <div className="page-title dark-background get_started_bg getStarted_bg">
          <div className="container text-start text-white">
            <div className="col-lg-6 col-12">
              <h1 className='fs-3'>🚀 Get Started for Free</h1>
              <p className="lead mt-3">Start Learning in Minutes — <strong>No Credit Card Needed</strong></p>
              <p>Welc ome to <strong>Apply4Study</strong>, where learning is flexible, fun, and free to begin!</p>
              <p>
                Sign up today to access a growing library of expert-led courses, live sessions, and
                self-paced learning tools designed to fit your schedule and goals.
              </p>
              <p>
                Whether you're a student, professional, or just curious to learn something new — this is your starting point.
              </p>
              <nav className="breadcrumbs mt-3">
                <ol className="justify-content-start">
                  <li><a href="./">Home</a></li>
                  <li className="current text-white">Get Started</li>
                </ol>
              </nav>

            </div>
          </div>
        </div>


        <section className=" about section light-background  pb-lg-0">
          <div className="container">
            <div className="row pt-lg-5">
              <div className="col-lg-7 col-md-7 col-12">
                <h5 className="mb-3">🎁 What You Get with Free Access:</h5>
                <p>
                  With our free account, you can explore a variety of courses and learning modules at no cost. Enjoy
                  instant access to selected content, live webinars, and personalized learning tools designed to help you
                  succeed. Plus, you can upgrade to a premium account at any time if you love what you see!
                </p>
                <ul className="list-unstyled">
                  <li>✅ Instant Access to a selection of free courses and learning modules</li>
                  <li>✅ Free entry to live webinars and demo classes</li>
                  <li>✅ Personalized learning dashboard</li>
                  <li>✅ Practice quizzes and progress tracking</li>
                  <li>✅ Option to upgrade anytime — only if you love it!</li>
                </ul>
              </div>
              <div className="col-lg-5 col-md-5 col-12">
                <div className="mb-5">
                  <h5 className="mb-4">✍️ Create Your Free Account</h5>
                  <form noValidate validated={validated.toString()} onSubmit={handleRegisterSubmit} className="p-4 border rounded bg-light">
                    <div className="mb-3">
                      <label htmlFor="first_name" className="form-label">First Name *</label>
                      <input type="text" 
                        name="first_name" 
                        required 
                        className={"form-control " + errors.firstNameClass}
                        value={formData.first_name}
                        onChange={handleChange} />
                      <div className={errors.firstNameMsgClass}>{errors.first_name}</div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="last_name" className="form-label">Last Name</label>
                      <input type="text" 
                        name="last_name" 
                        className={"form-control " + errors.lastNameClass}
                        onChange={handleChange}
                        value={formData.last_name} />
                      <div className={errors.lastNameMsgClass}>{errors.last_name}</div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email Address *</label>
                      <input type="email" name="email" required 
                        className={"form-control " + errors.emailClass} 
                        value={formData.email}
                        onChange={handleChange} />
                      <div className={errors.emailMsgClass}>{errors.email}</div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="mobile" className="form-label">Mobile Number *</label>
                      <input type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required 
                        className={"form-control " + errors.mobileClass} />
                        <div className={errors.mobileMsgClass}>{errors.mobile}</div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="role" className="form-label">I am a:</label>
                      <select type="selectbox" 
                        name="role" 
                        className={"form-control " + errors.roleClass} 
                        onChange={handleChange}>
                        <option value="">-- Select --</option>
                        <option value="student">Student</option>
                        <option value="professional">Professional</option>
                        <option value="parent">Parent</option>
                        <option value="other">Other</option>
                      </select>
                      <div className={errors.roleMsgClass}>{errors.role}</div>
                    </div>

                    <div className="form-check mb-3">
                      <input type="checkbox"
                        name="termsAccepted"
                        checked={formData.termsAccepted}
                        onChange={handleChange}
                        required 
                        className={"form-check-input " + errors.termsClass} />
                      <label htmlFor="agree" className="form-check-label">
                        I agree to the <a href="/terms-conditions" target="_blank">Terms & Conditions</a>
                      </label>
                      <div className={errors.termsMsgClass}>{errors.termsAccepted}</div>
                    </div>

                    <div className="mb-3">
                      {/* Google reCAPTCHA */}
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                        style={{ transform: "scale(1.32)", transformOrigin: "0 14px" }}
                        onChange={(value) => setToken(value)}
                        className={errors.captchaClass}
                      />
                      <div className={errors.captchaMsgClass} style={{marginTop: "40px"}}>{errors.captcha}</div>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Create Free Account</button>
                  </form>
                  {message && (
                    <p style={{ marginTop: "8px", color: "#FD7311", fontSize: "0.8rem" }}>
                      {message}{" "}
                    </p>
                  )}
                </div>
              </div>
            </div>

          </div>
        </section>

        <section className=" about section ">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-12">
                <h5>🔒 Your Data is Safe</h5>
                <p>
                  We respect your privacy. Your information will only be used to create your account and personalize your learning experience.
                </p>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                 <h4>🌟 Ready to Begin?</h4>
              <p>
                Join thousands of learners upgrading their skills, advancing their studies, and unlocking new opportunities.
              </p>
              <p><strong>👉 Sign up now — it’s free!</strong></p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}