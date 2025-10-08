import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const BriefcaseIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);

const MessageSquareIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const ShieldIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

export default function WhyGigConnectPage() {
  const { currentUser } = useContext(AuthContext);

  return (
    <main className="why-root">
      <style>{`
        body {
          background-color: #f9fafb;
        }

        .why-root {
          padding: 48px 20px;
          min-height: 100vh;
          box-sizing: border-box;
          background-color: #f9fafb;
        }

        .why-container {
          max-width: 1120px;
          margin: 0 auto;
        }

        .why-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .why-title {
          font-size: 32px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 10px;
        }

        .why-title span {
          background: linear-gradient(90deg,#4f46e5,#6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .why-sub {
          color: #5f6b7a;
          max-width: 820px;
          margin: 0 auto;
          font-size: 15px;
        }

        .why-grid {
          display: grid;
          gap: 22px;
          grid-template-columns: 1fr;
          margin-top: 28px;
        }

        @media (min-width: 880px) {
          .why-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .why-card {
          background: #fff;
          border-radius: 14px;
          padding: 22px;
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
          text-align: center;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .why-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 14px 30px rgba(79, 70, 229, 0.15);
        }

        .icon-circle {
          display: inline-flex;
          width: 72px;
          height: 72px;
          border-radius: 999px;
          background: linear-gradient(180deg,#eef2ff, #e9eefc);
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          color: #4f46e5;
        }

        .card-title {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin: 8px 0;
        }

        .card-desc {
          color: #575f6a;
          font-size: 14px;
          line-height: 1.6;
        }

        .cta-wrap {
          margin-top: 50px;
          border-radius: 16px;
          padding: 32px;
          background: linear-gradient(90deg,#4f46e5,#6366f1);
          color: #fff;
          text-align: center;
          box-shadow: 0 20px 40px rgba(99,102,241,0.14);
        }

        .cta-title {
          font-size: 22px;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .cta-text {
          color: rgba(255,255,255,0.9);
          margin-bottom: 16px;
        }

        .cta-actions {
          display:flex;
          gap:12px;
          justify-content:center;
          flex-wrap:wrap;
        }

        .cta-btn {
          display:inline-block;
          background: #fff;
          color:#3f3ccf;
          padding: 10px 18px;
          border-radius: 999px;
          font-weight:700;
          text-decoration:none;
          box-shadow: 0 8px 18px rgba(79,70,229,0.12);
          transition: transform .18s ease, background .18s ease;
        }

        .cta-btn:hover {
          transform: translateY(-3px);
          background:#f7f7ff;
        }
      `}</style>

      <div className="why-container">
        <header className="why-header">
          <h1 className="why-title">
            Why Choose <span>GigConnect?</span>
          </h1>
          <p className="why-sub">
            We’re building a better way for local communities and skilled professionals to connect and collaborate — fast, secure and reliable.
          </p>
        </header>

        <section className="why-grid">
          <article className="why-card">
            <div className="icon-circle">
              <BriefcaseIcon />
            </div>
            <h3 className="card-title">Find Local Opportunities</h3>
            <p className="card-desc">
              Discover projects and talent near you. Filter by location, skills and availability to quickly match with people in your area.
            </p>
          </article>

          <article className="why-card">
            <div className="icon-circle">
              <MessageSquareIcon />
            </div>
            <h3 className="card-title">Real-time Communication</h3>
            <p className="card-desc">
              Built-in chat keeps conversations and files in one place — no juggling apps. Discuss scope, timelines, and deliverables instantly.
            </p>
          </article>

          <article className="why-card">
            <div className="icon-circle">
              <ShieldIcon />
            </div>
            <h3 className="card-title">Trust & Transparency</h3>
            <p className="card-desc">
              Ratings, verified profiles and secure payments help you hire and work with confidence — every time.
            </p>
          </article>
        </section>

        {!currentUser && (
          <div className="cta-wrap">
            <h2 className="cta-title">Ready to get started?</h2>
            <p className="cta-text">Join GigConnect and start hiring or landing local gigs today.</p>
            <div className="cta-actions">
              <Link to="/auth" className="cta-btn">Get Started</Link>
              <Link to="/auth" className="cta-btn" style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.18)" }}>
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
