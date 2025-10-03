import React, { useContext } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom'; // Import NavLink
import { AuthContext } from '../context/AuthContext';

// SVG Logo Component
const LogoIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="8" fill="#4f46e5"/>
        <path d="M12 20L16 12L20 20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const Header = () => {
    const { currentUser, logout, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };
    
    // Style component now includes an 'active' class style
    const HeaderStyles = () => (
        <style>{`
            .nav-link {
                color: #6b7280; /* Default text color */
                padding: 8px 16px;
                border-radius: 6px;
                transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
            }
            .nav-link:hover {
                color: #4f46e5; /* Primary accent color on hover */
                background-color: #eef2ff; /* Light indigo background on hover */
            }
            /* This style is automatically applied by NavLink to the active page link */
            .nav-link.active {
                color: #4f46e5;
                font-weight: 600; /* Make the active link bold */
            }
        `}</style>
    );

    return (
        <header style={headerStyles}>
            <HeaderStyles />
            <div style={containerStyles}>
                <Link to="/" style={logoStyles}>
                    <LogoIcon />
                    <span>GigConnect</span>
                </Link>
                <nav style={navStyles}>
                    <NavLink to="/" style={navLinkStyles} className="nav-link" end>Home</NavLink>
                    
                    {/* --- NEW CONDITIONAL NAVIGATION --- */}
                    {!currentUser && (
                        <>
                            <NavLink to="/find-talent" style={navLinkStyles} className="nav-link">Find Talent</NavLink>
                            <NavLink to="/find-work" style={navLinkStyles} className="nav-link">Find Work</NavLink>
                        </>
                    )}
                    {currentUser && currentUser.role === 'Client' && (
                        <NavLink to="/find-talent" style={navLinkStyles} className="nav-link">Find Talent</NavLink>
                    )}
                    {currentUser && currentUser.role === 'Freelancer' && (
                        <NavLink to="/find-work" style={navLinkStyles} className="nav-link">Find Work</NavLink>
                    )}
                    
                    <NavLink to="/why-gigconnect" style={navLinkStyles} className="nav-link">Why GigConnect</NavLink>
                </nav>
                <div style={authStyles}>
                    {!loading && (
                        currentUser ? (
                            <>
                                {currentUser.role === 'Client' && (
                                    <Link to="/post-gig" style={signUpButtonStyles}>Post a Gig</Link>
                                )}
                                <Link to="/dashboard" style={loginLinkStyles}>Dashboard</Link>
                                <Link to="/messages" style={loginLinkStyles}>Messages</Link>
                                <button onClick={handleLogout} style={logoutButtonStyles}>Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/auth" style={loginLinkStyles}>Log In</Link>
                                <Link to="/auth" style={signUpButtonStyles}>Sign Up</Link>
                            </>
                        )
                    )}
                </div>
            </div>
        </header>
    );
};


// --- Styles ---
const headerStyles = { background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '1rem 2rem' };
const containerStyles = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1280px', margin: '0 auto' };
const logoStyles = { display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none', color: '#333' };
const navStyles = { display: 'flex', gap: '1rem' };
const navLinkStyles = { textDecoration: 'none', fontWeight: '500' };
const authStyles = { display: 'flex', alignItems: 'center', gap: '1rem' };
const loginLinkStyles = { textDecoration: 'none', color: '#333', fontWeight: '500' };
const signUpButtonStyles = { textDecoration: 'none', background: '#4f46e5', color: '#fff', padding: '0.5rem 1rem', borderRadius: '0.375rem', fontWeight: '500' };
const logoutButtonStyles = { background: 'transparent', border: 'none', color: '#333', fontWeight: '500', cursor: 'pointer', fontSize: '1rem' };

export default Header;

