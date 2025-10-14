import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import AOS from 'aos';
import 'aos/dist/aos.css';
// import getStartedImg from '../assets/img/getStarted.png';
import LazyImage from '../components/common/LazyImage';
import useSEO from "../hooks/useSEO";

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
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (type === 'register') {
      if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
      if (!formData.mobile) newErrors.mobile = 'Mobile is required';
      else if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = 'Mobile must be a 10 digit number';
      if (!formData.role) newErrors.role = 'Please select a role';
      if (!formData.termsAccepted) newErrors.termsAccepted = 'You must agree to terms';
    } else if (type === 'subscribe') {
      if (!formData.email) newErrors.email = 'Email or mobile number is required';
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
            termsAccepted: formData.termsAccepted,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          setMessage(data.message || "Registration successful!");
          setShowToast(true);
          onHide();
          setFormData({
            first_name: "",
            last_name: "",
            email: "",
            mobile: "",
            role: "",
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
                  <form noValidate validated={validated} onSubmit={handleRegisterSubmit} className="p-4 border rounded bg-light">
                    <div className="mb-3">
                      <label htmlFor="first_name" className="form-label">First Name *</label>
                      <input type="text" 
                        id="first_name" 
                        name="first_name" 
                        required 
                        className="form-control"
                        value={formData.first_name}
                        onChange={handleChange}
                        isInvalid={!!errors.first_name} />
                      <span type="invalid">{errors.first_name}</span>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="last_name" className="form-label">Last Name *</label>
                      <input type="text" 
                        id="last_name" 
                        name="last_name" 
                        required 
                        className="form-control"
                        value={formData.last_name} />
                      <span type="invalid">{errors.last_name}</span>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email Address *</label>
                      <input type="email" id="email" name="email" required className="form-control" 
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email} />
                      <span type="invalid">{errors.email}</span>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="mobile" className="form-label">Mobile Number *</label>
                      <input type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        isInvalid={!!errors.mobile}
                        required 
                        className="form-control" />
                        <span type="invalid">{errors.mobile}</span>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="role" className="form-label">I am a:</label>
                      <select id="role" name="role" className="form-select" 
                        value={formData.role}
                        onChange={handleChange}
                        isInvalid={!!errors.role}>
                        <option value="student">Student</option>
                        <option value="professional">Professional</option>
                        <option value="parent">Parent</option>
                        <option value="other">Other</option>
                      </select>
                      <span type="invalid">{errors.role}</span>
                    </div>

                    <div className="form-check mb-3">
                      <input type="checkbox"
                        name="termsAccepted"
                        checked={formData.termsAccepted}
                        onChange={handleChange}
                        label={
                          <>
                            I agree to the <a href="/terms" target="_blank" rel="noreferrer">Terms & Conditions</a>
                          </>
                        }
                        isInvalid={!!errors.termsAccepted}
                        feedback={errors.termsAccepted}
                        feedbackType="invalid" required 
                        className="form-check-input" />
                      <label htmlFor="agree" className="form-check-label">
                        I agree to the <a href="/terms" target="_blank">Terms & Conditions</a>
                      </label>
                      <span type="invalid">{errors.termsAccepted}</span>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Create Free Account</button>
                  </form>
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