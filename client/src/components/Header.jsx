import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

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

    return (
        <header style={headerStyles}>
            <div style={containerStyles}>
                <Link to="/" style={logoStyles}>
                    <LogoIcon />
                    <span>GigConnect</span>
                </Link>
                <nav style={navStyles}>
                    <Link to="/" style={navLinkStyles}>Home</Link>
                    <Link to="/find-talent" style={navLinkStyles}>Find Talent</Link>
                    <Link to="/find-work" style={navLinkStyles}>Find Work</Link>
                    <Link to="/why-gigconnect" style={navLinkStyles}>Why GigConnect</Link>
                </nav>
                <div style={authStyles}>
                    {/* Don't show anything while initially checking auth status */}
                    {!loading && (
                        currentUser ? (
                            <>
                                {currentUser.role === 'Client' && (
                                    <Link to="/post-gig" style={signUpButtonStyles}>Post a Gig</Link>
                                )}
                                {/* --- NEW: MESSAGES LINK --- */}
                                <Link to="/dashboard" style={loginLinkStyles}>Dashboard</Link>
                                <Link to="/messages" style={loginLinkStyles}>Messages</Link>
                                <Link to="/profile" style={loginLinkStyles}>Profile</Link>
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
const navStyles = { display: 'flex', gap: '2rem' };
const navLinkStyles = { textDecoration: 'none', color: '#6b7280', fontWeight: '500' };
const authStyles = { display: 'flex', alignItems: 'center', gap: '1rem' };
const loginLinkStyles = { textDecoration: 'none', color: '#333', fontWeight: '500' };
const signUpButtonStyles = { textDecoration: 'none', background: '#4f46e5', color: '#fff', padding: '0.5rem 1rem', borderRadius: '0.375rem', fontWeight: '500' };
const logoutButtonStyles = { background: 'transparent', border: 'none', color: '#333', fontWeight: '500', cursor: 'pointer', fontSize: '1rem' };


export default Header;

