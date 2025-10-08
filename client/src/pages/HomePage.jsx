import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { Briefcase, Users, CreditCard, Mail, Info } from "lucide-react";
import emailjs from "@emailjs/browser";

const HomePage = () => {
  const { currentUser } = useContext(AuthContext);
  const form = useRef();

  // ===== SEND FEEDBACK VIA EMAILJS =====
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_uq0k9fi",
        "template_u20y7tx",
        form.current,
        "8zulPVQMoLdxpecti"
      )
      .then(
        () => {
          alert("✅ Feedback sent successfully!");
          form.current.reset();
        },
        (error) => {
          console.error("Error:", error);
          alert("❌ Failed to send feedback. Try again!");
        }
      );
  };

  return (
    <main className="bg-gradient-to-b from-white to-indigo-50 min-h-screen">
      <style>{`
        /* HERO */
        .hero {
          text-align: center;
          padding: 6rem 1rem 4rem;
          background: linear-gradient(180deg, #ffffff, #eef2ff);
        }
        .hero h1 {
          font-size: 3rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 1rem;
        }
        .highlight { color: #4f46e5; }
        .hero p {
          font-size: 1.125rem;
          color: #4b5563;
          max-width: 650px;
          margin: 0 auto 2rem;
        }
        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .cta-btn {
          background: #4f46e5;
          color: white;
          border: none;
          padding: 0.9rem 2rem;
          border-radius: 0.5rem;
          font-size: 1rem;
          font-weight: 500;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .cta-btn:hover {
          background: #4338ca;
          transform: translateY(-3px);
          box-shadow: 0 6px 12px rgba(79,70,229,0.2);
        }
        .secondary-btn {
          background: transparent;
          color: #4f46e5;
          border: 2px solid #4f46e5;
        }
        .secondary-btn:hover { background: #eef2ff; }

        /* GENERAL SECTIONS */
        section {
          padding: 4rem 1rem;
        }
        .section-title {
          text-align: center;
          font-size: 2rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 1rem;
        }
        .section-subtitle {
          text-align: center;
          color: #6b7280;
          margin-bottom: 3rem;
        }

        /* HOW IT WORKS */
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2rem;
          max-width: 1000px;
          margin: 0 auto;
        }
        .step-card {
          background: #f9fafb;
          border-radius: 1rem;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        }
        .step-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px rgba(0,0,0,0.08);
        }
        .step-icon {
          background: #eef2ff;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          color: #4f46e5;
        }

        /* ABOUT US */
        .about {
          background: linear-gradient(to bottom right, #ffffff, #eef2ff);
          padding: 5rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .about-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 3rem;
          max-width: 1100px;
          align-items: center;
        }
        .about-text h2 {
          font-size: 2.5rem;
          font-weight: 800;
          color: #111827;
          margin-bottom: 1rem;
          text-align: left;
        }
        .about-text h2 span {
          background: linear-gradient(90deg, #4f46e5, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .about-text p {
          color: #4b5563;
          font-size: 1.1rem;
          line-height: 1.8;
          margin-bottom: 2rem;
        }
        .about-img {
          text-align: center;
        }
        .about-img img {
          width: 100%;
          max-width: 450px;
          border-radius: 1rem;
          box-shadow: 0 10px 20px rgba(79,70,229,0.15);
          transition: transform 0.4s ease;
        }
        .about-img img:hover {
          transform: scale(1.05);
        }
        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
          margin-top: 3rem;
          max-width: 900px;
        }
        .value-card {
          background: white;
          border-radius: 1rem;
          padding: 1.8rem;
          text-align: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
        }
        .value-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 8px 15px rgba(0,0,0,0.08);
        }
        .value-icon {
          background: #eef2ff;
          color: #4f46e5;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }
        .value-card h4 {
          font-size: 1.2rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 0.5rem;
        }
        .value-card p {
          font-size: 0.95rem;
          color: #6b7280;
        }

        /* CONTACT */
        .contact {
          background: #f9fafb;
        }
        form {
          max-width: 600px;
          margin: 0 auto;
          background: white;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }
        input, textarea {
          width: 100%;
          padding: 0.9rem;
          margin-bottom: 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 1rem;
        }
        button[type="submit"] {
          background: #4f46e5;
          color: white;
          padding: 0.8rem 2rem;
          border: none;
          border-radius: 0.5rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        button[type="submit"]:hover {
          background: #4338ca;
          transform: translateY(-2px);
        }

        /* FOOTER */
        footer {
          background: #111827;
          color: white;
          padding: 3rem 1rem;
          text-align: center;
        }
        footer p {
          color: #9ca3af;
          font-size: 0.9rem;
        }
      `}</style>

      {/* === HERO SECTION === */}
      <section className="hero">
        {!currentUser && (
          <>
            <h1>
              Find Work or Hire <span className="highlight">Local Talent</span>
            </h1>
            <p>
              Join GigConnect — where freelancers meet clients for real, local,
              and remote opportunities. Whether you want to showcase skills or
              hire trusted professionals, it starts here.
            </p>
            <div className="cta-buttons">
              <Link to="/auth" className="cta-btn">
                Get Started
              </Link>
            </div>
          </>
        )}

        {currentUser?.role === "Client" && (
          <>
            <h1>
              Welcome Back, <span className="highlight">Client</span> 👋
            </h1>
            <p>
              Post jobs, chat with top freelancers, and bring your next project
              to life — all on GigConnect.
            </p>
            <div className="cta-buttons">
              <Link to="/find-talent" className="cta-btn">
                Find Talent
              </Link>
              <Link to="/post-gig" className="cta-btn secondary-btn">
                Post a Job
              </Link>
            </div>
          </>
        )}

        {currentUser?.role === "Freelancer" && (
          <>
            <h1>
              Welcome Back, <span className="highlight">Freelancer</span> 🚀
            </h1>
            <p>
              Discover new gigs, grow your career, and build your reputation
              with every successful project.
            </p>
            <div className="cta-buttons">
              <Link to="/find-work" className="cta-btn">
                Find Work
              </Link>
              <Link to="/profile" className="cta-btn secondary-btn">
                View Profile
              </Link>
            </div>
          </>
        )}
      </section>

      {/* === HOW IT WORKS === */}
      <section>
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">
          Get your project done or land your next gig in just three steps.
        </p>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-icon">
              <Briefcase size={28} />
            </div>
            <h3>1. Create an Account</h3>
            <p>Sign up as a client or freelancer and start in seconds.</p>
          </div>
          <div className="step-card">
            <div className="step-icon">
              <Users size={28} />
            </div>
            <h3>2. Connect & Collaborate</h3>
            <p>Browse, chat, and collaborate securely in real time.</p>
          </div>
          <div className="step-card">
            <div className="step-icon">
              <CreditCard size={28} />
            </div>
            <h3>3. Get Paid Safely</h3>
            <p>Secure payments only after approved, completed work.</p>
          </div>
        </div>
      </section>

      {/* === ABOUT US === */}
      <section className="about">
        <div className="about-content">
          <div className="about-text">
            <h2>
              About <span>GigConnect</span>
            </h2>
            <p>
              GigConnect is built with one mission — to bridge the gap between 
              passionate freelancers and visionary clients. Our platform makes it 
              easy to collaborate, communicate, and create together with trust and transparency.
            </p>
            <p>
              Whether you’re launching a business, managing a project, or starting 
              your freelance journey, GigConnect gives you the tools to grow your 
              brand and connect with people who share your goals.
            </p>
          </div>
          <div className="about-img">
            <img
              src="https://img.freepik.com/free-vector/creative-team-concept-illustration_114360-1152.jpg"
              alt="Teamwork illustration"
            />
          </div>
        </div>

        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">
              <Users size={26} />
            </div>
            <h4>Community</h4>
            <p>
              We believe in empowering people through connection, collaboration, 
              and shared success.
            </p>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <Briefcase size={26} />
            </div>
            <h4>Trust</h4>
            <p>
              Our secure platform ensures transparent communication and safe payments 
              every time.
            </p>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <CreditCard size={26} />
            </div>
            <h4>Growth</h4>
            <p>
              We help freelancers and clients scale their careers and projects 
              with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* === CONTACT / FEEDBACK === */}
      <section className="contact">
        <h2 className="section-title">
          <Mail size={24} style={{ display: "inline", marginRight: "8px" }} />
          Contact Us
        </h2>
        <p className="section-subtitle">
          Have questions or feedback? We'd love to hear from you.
        </p>

        <form ref={form} onSubmit={sendEmail}>
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            required
          ></textarea>
          <button type="submit">Send Feedback</button>
        </form>
      </section>

      {/* === FOOTER === */}
      <footer>
        <p>© {new Date().getFullYear()} GigConnect. All rights reserved.</p>
      </footer>
    </main>
  );
};

export default HomePage;
