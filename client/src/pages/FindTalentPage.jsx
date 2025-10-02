import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FindTalentPage = () => {
    const [freelancers, setFreelancers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFreelancers = async () => {
            try {
                // Fetch the list of freelancers from your new backend endpoint
                const response = await axios.get('http://localhost:8000/api/users/freelancers');
                setFreelancers(response.data);
            } catch (err) {
                setError('Could not fetch freelancers.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchFreelancers();
    }, []);

    return (
        <div style={pageStyles}>
            <div style={containerStyles}>
                <h1 style={titleStyles}>Find Local Talent</h1>
                <p style={subtitleStyles}>Browse our community of skilled freelancers ready to help with your next project.</p>

                {loading && <p style={textCenterStyles}>Loading talent...</p>}
                {error && <p style={errorTextStyles}>{error}</p>}
                {!loading && !error && (
                    <div style={gridStyles}>
                        {freelancers.length > 0 ? (
                            freelancers.map(freelancer => (
                                <div key={freelancer._id} style={cardStyles}>
                                    <h3 style={cardTitleStyles}>{freelancer.username}</h3>
                                    {/* In a future step, we would fetch and display the freelancer's headline from their profile */}
                                    <p style={cardDescriptionStyles}>Professional {freelancer.role}</p>
                                    {/* This link is a placeholder for now, as we haven't built public profile pages yet */}
                                    <Link to={`/profile/${freelancer._id}`} style={buttonStyles}>View Profile</Link>
                                </div>
                            ))
                        ) : (
                            <p style={textCenterStyles}>No freelancers have signed up yet.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Styles ---
const pageStyles = { padding: '4rem 2rem', background: '#f9fafb' };
const containerStyles = { maxWidth: '1280px', margin: '0 auto' };
const titleStyles = { fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem' };
const subtitleStyles = { fontSize: '1.125rem', color: '#6b7280', textAlign: 'center', marginBottom: '3rem' };
const textCenterStyles = { textAlign: 'center' };
const errorTextStyles = { textAlign: 'center', color: 'red' };
const gridStyles = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' };
const cardStyles = { background: 'white', border: '1px solid #e5e7eb', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', textAlign: 'center' };
const cardTitleStyles = { fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' };
const cardDescriptionStyles = { color: '#6b7280', marginBottom: '1.5rem' };
const buttonStyles = { display: 'inline-block', textDecoration: 'none', background: '#4f46e5', color: '#fff', padding: '0.5rem 1rem', borderRadius: '0.375rem', fontWeight: '500' };

export default FindTalentPage;

