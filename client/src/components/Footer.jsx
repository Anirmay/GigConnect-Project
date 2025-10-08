import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={footerStyles}>
            <div style={containerStyles}>
                <div style={gridStyles}>
                    {/* About Section */}
                    <div>
                        <h3 style={titleStyles}>GigConnect</h3>
                        <p style={descriptionStyles}>
                            Your hyperlocal marketplace to find skilled freelancers and get your projects done efficiently.
                        </p>
                    </div>

                    {/* Quick Links Section */}
                    <div>
                        <h3 style={titleStyles}>Quick Links</h3>
                        <ul style={listStyles}>
                            <li><Link to="/" style={linkStyles}>Home</Link></li>
                            <li><Link to="/find-work" style={linkStyles}>Find Work</Link></li>
                            <li><Link to="/post-gig" style={linkStyles}>Post a Gig</Link></li>
                            <li><Link to="/about" style={linkStyles}>About Us</Link></li>
                        </ul>
                    </div>

                    {/* Legal Section */}
                    <div>
                        <h3 style={titleStyles}>Legal</h3>
                        <ul style={listStyles}>
                            <li><Link to="/privacy-policy" style={linkStyles}>Privacy Policy</Link></li>
                            <li><Link to="/terms-of-service" style={linkStyles}>Terms of Service</Link></li>
                            <li><Link to="/contact" style={linkStyles}>Contact</Link></li>
                        </ul>
                    </div>

                    {/* Social Media Section */}
                    <div>
                        <h3 style={titleStyles}>Follow Us</h3>
                        {/* In a real app, these would be links to your social media pages */}
                        <div style={{ display: 'flex', gap: '1rem' }}>
                           <p style={linkStyles}>Facebook</p>
                           <p style={linkStyles}>Twitter</p>
                           <p style={linkStyles}>LinkedIn</p>
                        </div>
                    </div>
                </div>

                <div style={bottomBarStyles}>
                    <p>&copy; {new Date().getFullYear()} GigConnect. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

// --- Styles ---
const footerStyles = {
    backgroundColor: '#111827', // Dark background
    color: '#9ca3af',
    padding: '4rem 2rem 0',
};
const containerStyles = {
    maxWidth: '1280px',
    margin: '0 auto',
};
const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
    paddingBottom: '2rem'
};
const titleStyles = {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: '1rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
};
const descriptionStyles = {
    lineHeight: '1.6',
};
const listStyles = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
};
const linkStyles = {
    color: '#9ca3af',
    textDecoration: 'none',
    transition: 'color 0.2s',
};
const bottomBarStyles = {
    borderTop: '1px solid #374151',
    padding: '2rem 0',
    textAlign: 'center',
    fontSize: '0.875rem',
};

export default Footer;