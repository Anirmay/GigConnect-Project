import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

// --- This component injects the hover style for our cards ---
const PageStyles = () => (
    <style>{`
        .profile-card-hover {
            transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }
        .profile-card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
        }
    `}</style>
);

const FindTalentPage = () => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loginMessage, setLoginMessage] = useState(''); // Using loginMessage for consistency

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchFreelancers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/users/freelancers');
                setProfiles(response.data);
            } catch (err) {
                setError('Could not fetch freelancers.');
            } finally {
                setLoading(false);
            }
        };
        fetchFreelancers();
    }, []);

    const handleProfileClick = (e) => {
        if (!currentUser) {
            e.preventDefault(); // Prevent navigation
            setLoginMessage("You must be logged in to view a freelancer's profile.");
            setTimeout(() => setLoginMessage(''), 3000); // Hide message after 3 seconds
        }
    };

    if (loading) return <p style={textCenterStyles}>Loading talent...</p>;
    if (error) return <p style={errorTextStyles}>{error}</p>;

    return (
        <div style={pageStyles}>
            <PageStyles /> {/* Injecting hover styles */}
            {loginMessage && <div style={messageStyles}>{loginMessage}</div>}

            <div style={containerStyles}>
                <h1 style={titleStyles}>Find Local Talent</h1>
                <p style={subtitleStyles}>Browse our community of skilled freelancers.</p>

                <div style={gridStyles}>
                    {profiles.length > 0 ? (
                        profiles.map(profile => (
                            <Link 
                                to={`/user/${profile.user._id}`} 
                                key={profile._id} 
                                style={cardLinkStyles} 
                                onClick={handleProfileClick}
                            >
                                <div style={cardStyles} className="profile-card-hover">
                                    <h3 style={cardTitleStyles}>{profile.user.username}</h3>
                                    <p style={cardHeadlineStyles}>
                                        {profile.headline || 'Professional Freelancer'}
                                    </p>
                                    <div style={skillsContainerStyles}>
                                        {profile.skills.slice(0, 3).map(skill => (
                                            <span key={skill} style={skillTagStyles}>{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p style={textCenterStyles}>No freelancers have created profiles yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Styles ---
const pageStyles = { padding: '4rem 2rem', background: '#f9fafb', minHeight: '100vh' };
const containerStyles = { maxWidth: '1280px', margin: '0 auto' };
const titleStyles = { fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem' };
const subtitleStyles = { fontSize: '1.125rem', color: '#6b7280', textAlign: 'center', marginBottom: '3rem' };
const textCenterStyles = { textAlign: 'center' };
const errorTextStyles = { textAlign: 'center', color: '#ef4444' };
const gridStyles = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2.5rem' };

const cardLinkStyles = { textDecoration: 'none', color: 'inherit' };
const cardStyles = {
    display: 'flex',
    flexDirection: 'column',
    background: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
    textAlign: 'center',
    cursor: 'pointer',
    height: '100%',
};
const messageStyles = {
    position: 'fixed',
    top: '90px', // Adjusted from 20px to move it down
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#ef4444',
    color: 'white',
    padding: '1rem 2rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    zIndex: 1000,
    fontSize: '1rem',
    fontWeight: '500',
};

const cardTitleStyles = { fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.25rem' };
const cardHeadlineStyles = { color: '#6b7280', marginBottom: '1.5rem', flexGrow: 1 };
const skillsContainerStyles = { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem', minHeight: '30px' };
const skillTagStyles = { background: '#eef2ff', color: '#4f46e5', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem' };

export default FindTalentPage;

