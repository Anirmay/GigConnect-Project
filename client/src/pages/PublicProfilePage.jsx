import React, { useState, useEffect, useContext } from 'react'; // Import useContext
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const PublicProfilePage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext); // Get the current logged-in user

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/profile/${userId}`);
                setProfile(res.data);
            } catch (err) {
                setError('Could not load profile. This user may not have a profile yet.');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [userId]);

    const handleContact = () => {
        if (profile && profile.user) {
            navigate('/messages', { state: { userToChat: profile.user } });
        }
    };

    if (loading) return <p style={textCenterStyles}>Loading profile...</p>;
    if (error) return <p style={errorTextStyles}>{error}</p>;
    if (!profile || !profile.user) return <p style={textCenterStyles}>Profile not found.</p>;

    return (
        <div style={pageStyles}>
            <div style={containerStyles}>
                <h1 style={titleStyles}>{profile.user.username}</h1>
                <h2 style={headlineStyles}>{profile.headline || 'No headline provided.'}</h2>
                
                <div style={cardStyles}>
                    <h3>About Me</h3>
                    <p>{profile.bio || 'No bio provided.'}</p>
                </div>
                
                <div style={cardStyles}>
                    <h3>Skills</h3>
                    <div style={skillsContainerStyles}>
                        {profile.skills && profile.skills.length > 0 ? (
                            profile.skills.map(skill => <span key={skill} style={skillTagStyles}>{skill}</span>)
                        ) : <p>No skills listed.</p>}
                    </div>
                </div>

                <div style={cardStyles}>
                    <h3>Contact</h3>
                    <p>Hourly Rate: ₹{profile.hourlyRate || 'Not specified'}</p>
                    {/* --- THIS IS THE FIX --- */}
                    {/* Only show the button if a user is logged in AND they are not viewing their own profile */}
                    {currentUser && currentUser._id !== profile.user._id && (
                        <button onClick={handleContact} style={buttonStyles}>Contact {profile.user.username}</button>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Styles ---
const pageStyles = { padding: '4rem 2rem', background: '#f9fafb' };
const containerStyles = { maxWidth: '800px', margin: '0 auto' };
const titleStyles = { fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center' };
const headlineStyles = { fontSize: '1.25rem', color: '#6b7280', textAlign: 'center', marginBottom: '3rem' };
const cardStyles = { background: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', marginBottom: '2rem' };
const skillsContainerStyles = { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' };
const skillTagStyles = { background: '#eef2ff', color: '#4f46e5', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem' };
const buttonStyles = { padding: '0.75rem 1.5rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', marginTop: '1rem' };
const textCenterStyles = { textAlign: 'center', marginTop: '2rem' };
const errorTextStyles = { ...textCenterStyles, color: 'red' };

export default PublicProfilePage;

