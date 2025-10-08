// src/components/Header.jsx
import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // adjust if your path is different

// logo svg
const LogoIcon = () => (
  <svg width="34" height="34" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect width="32" height="32" rx="8" fill="#4f46e5" />
    <path d="M12 20L16 12L20 20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Header = () => {
  const { currentUser, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      // ignore - keep UX smooth
      console.error(e);
    }
    navigate("/");
  };

  const toggleMobile = () => setMobileOpen((s) => !s);

  // className generator for NavLink active style
  const navClass = ({ isActive }) => (isActive ? "gc-nav-link active" : "gc-nav-link");

  return (
    <header className="gc-header">
      <style>{`
        /* Header base */
        .gc-header {
          background: #fff;
          border-bottom: 1px solid #e5e7eb;
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        .gc-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 10px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        /* Logo */
        .gc-logo { display:flex; align-items:center; gap:10px; text-decoration:none; color:#111827; font-weight:700; font-size:1.15rem; }
        .gc-logo svg { display:block; }

        /* Desktop nav */
        .gc-nav { display:flex; gap:18px; align-items:center; }
        .gc-nav-link {
          color: #6b7280;
          text-decoration: none;
          padding: 6px 10px;
          border-radius: 8px;
          font-weight: 500;
          transition: background-color .15s ease, color .15s ease, transform .15s ease;
        }
        .gc-nav-link:hover { color: #4f46e5; background: #a5acc1ff; transform: translateY(-1px); }
        .gc-nav-link.active { color: #4f46e5; font-weight: 600; background: transparent; }

        /* Auth area */
        .gc-auth { display:flex; gap:12px; align-items:center; }
        .btn-primary {
          background:#4f46e5; color:#fff; padding:8px 14px; border-radius:10px; text-decoration:none; font-weight:600; border: none; cursor: pointer;
          box-shadow: 0 6px 12px rgba(79,70,229,0.12);
        }
        .btn-primary:hover { background:#4338ca; transform: translateY(-2px); }
        .btn-link { color:#111827; text-decoration:none; font-weight:500; padding:6px 8px; }

        /* Mobile */
        .gc-mobile-toggle { display:none; background:transparent; border:none; font-size:20px; cursor:pointer; }
        .gc-mobile-menu { display:none; }

        /* Responsive */
        @media (max-width: 880px) {
          .gc-nav { display:none; }
          .gc-mobile-toggle { display:block; }
          .gc-mobile-menu { display: block; background: #fff; border-top: 1px solid #eaeef6; padding: 12px 20px; }
          .gc-mobile-menu a { display:block; padding:10px 0; color:#374151; text-decoration:none; }
          .gc-mobile-row { display:flex; gap:12px; align-items:center; margin-top:8px; flex-wrap:wrap; }
        }
      `}</style>

      <div className="gc-container">
        {/* Logo */}
        <Link to="/" className="gc-logo" onClick={() => setMobileOpen(false)}>
          <LogoIcon />
          <span>GigConnect</span>
        </Link>

        {/* Desktop nav */}
        <nav className="gc-nav" aria-label="Primary navigation">
          <NavLink to="/" end className={navClass}>
            Home
          </NavLink>

          {/* role-based nav links */}
          {!currentUser && (
            <>
              <NavLink to="/find-talent" className={navClass}>
                Find Talent
              </NavLink>
              <NavLink to="/find-work" className={navClass}>
                Find Work
              </NavLink>
            </>
          )}

          {currentUser?.role === "Client" && (
            <NavLink to="/find-talent" className={navClass}>
              Find Talent
            </NavLink>
          )}
          {currentUser?.role === "Freelancer" && (
            <NavLink to="/find-work" className={navClass}>
              Find Work
            </NavLink>
          )}

          <NavLink to="/why-gigconnect" className={navClass}>
            Why GigConnect
          </NavLink>
        </nav>

        {/* Auth / actions */}
        <div className="gc-auth">
          {/* mobile toggle */}
          <button className="gc-mobile-toggle" aria-label="Toggle menu" onClick={toggleMobile}>
            ☰
          </button>

          {!loading && (
            <>
              {currentUser ? (
                <>
                  {currentUser.role === "Client" && (
                    <Link to="/post-gig" className="btn-primary" onClick={() => setMobileOpen(false)}>
                      Post a Gig
                    </Link>
                  )}
                  <Link to="/dashboard" className="btn-link" onClick={() => setMobileOpen(false)}>
                    Dashboard
                  </Link>
                  <Link to="/messages" className="btn-link" onClick={() => setMobileOpen(false)}>
                    Messages
                  </Link>
                  <button onClick={handleLogout} className="btn-link" style={{ border: "none", background: "transparent", cursor: "pointer" }}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/auth" className="btn-link" onClick={() => setMobileOpen(false)}>
                    Log In
                  </Link>
                  <Link to="/auth" className="btn-primary" onClick={() => setMobileOpen(false)}>
                    Sign Up
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile menu (renders on small screens when toggled) */}
      {mobileOpen && (
        <div className="gc-mobile-menu" role="dialog" aria-label="Mobile menu">
          <div>
            <Link to="/" onClick={() => setMobileOpen(false)} style={{ display: "block", padding: "8px 0" }}>
              Home
            </Link>

            {!currentUser && (
              <>
                <Link to="/find-talent" onClick={() => setMobileOpen(false)} style={{ display: "block", padding: "8px 0" }}>
                  Find Talent
                </Link>
                <Link to="/find-work" onClick={() => setMobileOpen(false)} style={{ display: "block", padding: "8px 0" }}>
                  Find Work
                </Link>
              </>
            )}

            {currentUser?.role === "Client" && (
              <Link to="/find-talent" onClick={() => setMobileOpen(false)} style={{ display: "block", padding: "8px 0" }}>
                Find Talent
              </Link>
            )}
            {currentUser?.role === "Freelancer" && (
              <Link to="/find-work" onClick={() => setMobileOpen(false)} style={{ display: "block", padding: "8px 0" }}>
                Find Work
              </Link>
            )}

            <Link to="/why-gigconnect" onClick={() => setMobileOpen(false)} style={{ display: "block", padding: "8px 0" }}>
              Why GigConnect
            </Link>

            <div className="gc-mobile-row">
              {!loading && (
                <>
                  {currentUser ? (
                    <>
                      {currentUser.role === "Client" && (
                        <Link to="/post-gig" className="btn-primary" onClick={() => setMobileOpen(false)}>
                          Post a Gig
                        </Link>
                      )}
                      <Link to="/dashboard" className="btn-link" onClick={() => setMobileOpen(false)}>
                        Dashboard
                      </Link>
                      <Link to="/messages" className="btn-link" onClick={() => setMobileOpen(false)}>
                        Messages
                      </Link>
                      <button onClick={() => { setMobileOpen(false); handleLogout(); }} className="btn-link" style={{ border: "none", background: "transparent", cursor: "pointer" }}>
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/auth" className="btn-link" onClick={() => setMobileOpen(false)}>
                        Log In
                      </Link>
                      <Link to="/auth" className="btn-primary" onClick={() => setMobileOpen(false)}>
                        Sign Up
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
