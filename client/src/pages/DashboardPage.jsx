import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const { currentUser, loading: authLoading } = useContext(AuthContext); // Get auth loading state
    const navigate = useNavigate();
    const [userGigs, setUserGigs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Wait until the authentication check is complete
        if (authLoading) return;

        if (!currentUser) {
            navigate('/auth');
            return;
        }

        if (currentUser.role === 'Client') {
            const fetchUserGigs = async () => {
                try {
                    const res = await axios.get('http://localhost:8000/api/gig/user/my-gigs', { withCredentials: true });
                    setUserGigs(res.data);
                } catch (error) {
                    console.error("Failed to fetch user's gigs", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchUserGigs();
        } else {
            setLoading(false);
        }
    }, [currentUser, authLoading, navigate]);

    const handleDeleteGig = async (gigId) => {
        // Ask for confirmation before deleting
        if (window.confirm('Are you sure you want to delete this gig?')) {
            try {
                await axios.delete(`http://localhost:8000/api/gig/delete/${gigId}`, { withCredentials: true });
                // Update the state to remove the deleted gig from the list
                setUserGigs(userGigs.filter(gig => gig._id !== gigId));
            } catch (error) {
                console.error('Failed to delete gig:', error);
                alert('Failed to delete gig.');
            }
        }
    };

    if (authLoading || loading) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading dashboard...</p>;

    return (
        <div style={pageStyles}>
            <div style={containerStyles}>
                <h1 style={titleStyles}>Welcome, {currentUser.username}</h1>
                
                {currentUser.role === 'Client' && (
                    <div>
                        <h2 style={subtitleStyles}>Your Posted Gigs</h2>
                        {userGigs.length > 0 ? (
                            <div style={gigsListStyles}>
                                {userGigs.map(gig => (
                                    <div key={gig._id} style={gigItemStyles}>
                                        <span>{gig.title}</span>
                                        <div>
                                            <button onClick={() => handleDeleteGig(gig._id)} style={deleteButtonStyles}>Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>You haven't posted any gigs yet. <Link to="/post-gig">Post one now!</Link></p>
                        )}
                    </div>
                )}

                {currentUser.role === 'Freelancer' && (
                     <div>
                        <h2 style={subtitleStyles}>Your Freelancer Profile</h2>
                        <p>Manage your professional profile to attract clients.</p>
                        <Link to="/profile" style={buttonStyles}>Edit Your Profile</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Styles ---
const pageStyles = { padding: '2rem', background: '#f9fafb' };
const containerStyles = { maxWidth: '1000px', margin: '0 auto' };
const titleStyles = { fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' };
const subtitleStyles = { fontSize: '1.5rem', fontWeight: '600', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1.5rem' };
const gigsListStyles = { display: 'flex', flexDirection: 'column', gap: '1rem' };
const gigItemStyles = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '1rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' };
const buttonStyles = { padding: '0.75rem 1.5rem', background: '#4f46e5', color: 'white', textDecoration: 'none', border: 'none', borderRadius: '0.375rem' };
const deleteButtonStyles = { background: '#ef4444', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.375rem', cursor: 'pointer' };

export default DashboardPage;
