import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({
        headline: '',
        bio: '',
        skills: '',
        portfolioLinks: '',
        hourlyRate: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // If no user is logged in, redirect them to the auth page
        if (!currentUser) {
            navigate('/auth');
            return;
        }

        const fetchProfile = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/profile/me', { withCredentials: true });
                // The API sends back arrays, but we want comma-separated strings for the input fields
                setProfileData({
                    ...res.data,
                    skills: res.data.skills.join(', '),
                    portfolioLinks: res.data.portfolioLinks.join(', ')
                });
            } catch (err) {
                // A 404 error is okay, it just means a new user hasn't created a profile yet.
                if (err.response && err.response.status === 404) {
                    console.log("No profile found for this user. They can create one.");
                } else {
                    setError('Failed to fetch profile data.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [currentUser, navigate]);

    const handleChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await axios.post('http://localhost:8000/api/profile', profileData, { withCredentials: true });
            console.log("Profile saved:", res.data);
            alert("Profile saved successfully!");
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save profile.');
        } finally {
            setLoading(false);
        }
    };
    
    if (loading) return <p style={{textAlign: 'center', marginTop: '2rem'}}>Loading...</p>;

    return (
        <div style={pageStyles}>
            <div style={formContainerStyles}>
                <h1 style={titleStyles}>Manage Your Profile</h1>
                <p style={subtitleStyles}>This information will be visible to potential clients.</p>
                
                {/* Only show the form to users with the 'Freelancer' role */}
                {currentUser.role === 'freelancer' ? (
                    <form onSubmit={handleSubmit} style={formStyles}>
                        <input type="text" name="headline" placeholder="Your Professional Headline (e.g., 'Senior React Developer')" value={profileData.headline || ''} onChange={handleChange} style={inputStyles} />
                        <textarea name="bio" placeholder="Write a short bio about your skills and experience..." value={profileData.bio || ''} onChange={handleChange} style={{...inputStyles, height: '120px'}} />
                        <input type="text" name="skills" placeholder="Your Skills (comma separated, e.g., 'React, Node.js, CSS')" value={profileData.skills || ''} onChange={handleChange} style={inputStyles} />
                        <input type="text" name="portfolioLinks" placeholder="Links to your portfolio (comma separated)" value={profileData.portfolioLinks || ''} onChange={handleChange} style={inputStyles} />
                        <input type="number" name="hourlyRate" placeholder="Your Desired Hourly Rate (in USD)" value={profileData.hourlyRate || ''} onChange={handleChange} style={inputStyles} />
                        {error && <p style={errorStyles}>{error}</p>}
                        <button type="submit" style={buttonStyles} disabled={loading}>{loading ? 'Saving...' : 'Save Profile'}</button>
                    </form>
                ) : (
                    <p style={{textAlign: 'center'}}>Profile management is only for users with the "Freelancer" role. You are currently logged in as a Client.</p>
                )}
            </div>
        </div>
    );
};

// --- Styles ---
const pageStyles = { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '4rem 2rem', background: '#f9fafb' };
const formContainerStyles = { background: 'white', padding: '2.5rem', borderRadius: '0.75rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', width: '100%', maxWidth: '700px' };
const titleStyles = { fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '0.5rem' };
const subtitleStyles = { color: '#6b7280', textAlign: 'center', marginBottom: '2rem' };
const formStyles = { display: 'flex', flexDirection: 'column', gap: '1rem' };
const inputStyles = { padding: '0.75rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', fontSize: '1rem' };
const buttonStyles = { padding: '0.75rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '0.375rem', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' };
const errorStyles = { color: '#ef4444', textAlign: 'center', fontSize: '0.875rem' };

export default ProfilePage;