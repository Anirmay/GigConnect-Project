import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// --- This component injects the hover style for our cards ---
const PageStyles = () => (
    <style>{`
        .gig-card-hover {
            transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }
        .gig-card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
        }
    `}</style>
);

const FindWorkPage = () => {
    const { currentUser } = useContext(AuthContext);
    const [gigs, setGigs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [loginMessage, setLoginMessage] = useState(''); // State for the login prompt

    useEffect(() => {
        const fetchGigs = async () => {
            try {
                setLoading(true);
                const res = await axios.get('http://localhost:8000/api/gig');
                setGigs(res.data);
            } catch (err) {
                setError('Failed to fetch gigs.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchGigs();
    }, []);

    const handleGigClick = (e) => {
        if (!currentUser) {
            e.preventDefault(); // Prevent navigation
            setLoginMessage('You must be logged in to view gig details.');
            setTimeout(() => {
                setLoginMessage('');
            }, 3000); // Hide message after 3 seconds
        }
    };

    if (loading) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading gigs...</p>;
    if (error) return <p style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>{error}</p>;

    return (
        <div style={pageStyles}>
            <PageStyles /> {/* Injecting our hover styles */}
            {loginMessage && (
                <div style={messageStyles}>
                    {loginMessage}
                </div>
            )}

            <div style={headerStyles}>
                <h1 style={titleStyles}>Find Your Next Opportunity</h1>
                <p style={subtitleStyles}>Browse all available gigs and apply for the one that fits your skills.</p>
            </div>
            <div style={gridStyles}>
                {gigs.map(gig => (
                    <Link to={`/gig/${gig._id}`} key={gig._id} style={cardLinkStyles} onClick={handleGigClick}>
                        {/* Added the 'gig-card-hover' className to enable the effect */}
                        <div style={cardStyles} className="gig-card-hover">
                            {currentUser && gig.userRef === currentUser._id && (
                                <div style={myGigBadgeStyles}>My Gig</div>
                            )}
                            <h3 style={cardTitleStyles}>{gig.title}</h3>
                            <p style={cardCategoryStyles}>{gig.category}</p>
                            <p style={cardDescriptionStyles}>{gig.description.substring(0, 70)}...</p>
                            <div style={cardFooterStyles}>
                                <span style={cardBudgetStyles}>₹{gig.budget}</span>
                                <span style={cardLocationStyles}>{gig.location}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

// --- Styles ---
const pageStyles = { padding: '2rem', background: '#f9fafb', minHeight: '100vh' };
const headerStyles = { textAlign: 'center', marginBottom: '3rem' };
const titleStyles = { fontSize: '2.5rem', fontWeight: 'bold' };
const subtitleStyles = { color: '#6b7280', marginTop: '0.5rem' };
const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    columnGap: '2rem',
    rowGap: '5rem',
};
const cardLinkStyles = { textDecoration: 'none', color: 'inherit' };
const cardStyles = {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
};
const cardTitleStyles = { fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' };
const cardCategoryStyles = { color: '#4f46e5', fontSize: '0.875rem', marginBottom: '1rem', fontWeight: '500' };
const cardDescriptionStyles = { color: '#6b7280', flexGrow: 1, marginBottom: '1rem' };
const cardFooterStyles = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px solid #e5e7eb', paddingTop: '1rem' };
const cardBudgetStyles = { fontWeight: 'bold', color: '#10B981' };
const cardLocationStyles = { color: '#6b7280', fontSize: '0.875rem' };
const myGigBadgeStyles = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: '#10B981',
    color: 'white',
    padding: '0.25rem 0.6rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
};
const messageStyles = {
    position: 'fixed',
    top: '90px',
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

export default FindWorkPage;

