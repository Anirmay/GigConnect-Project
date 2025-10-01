import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const GigDetailPage = () => {
    const { id } = useParams(); // Get gig ID from the URL
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [gig, setGig] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // State for the new review form
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchGigAndReviews = async () => {
            try {
                // Fetch both gig details and reviews at the same time
                const gigRes = await axios.get(`http://localhost:8000/api/gig/${id}`);
                const reviewRes = await axios.get(`http://localhost:8000/api/review/${id}`);
                
                setGig(gigRes.data);
                setReviews(reviewRes.data);
            } catch (err) {
                setError('Could not fetch data for this gig.');
            } finally {
                setLoading(false);
            }
        };
        fetchGigAndReviews();
    }, [id]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            setError('You must be logged in to leave a review.');
            return;
        }
        try {
            const res = await axios.post('http://localhost:8000/api/review/create', 
                { gigId: id, rating, comment }, 
                { withCredentials: true }
            );
            // After submitting, fetch reviews again to include the username
            const reviewRes = await axios.get(`http://localhost:8000/api/review/${id}`);
            setReviews(reviewRes.data);
            setComment('');
            setRating(5);
        } catch (err) {
            setError('Failed to submit review.');
        }
    };

    const handleContact = () => {
        if (gig && gig.userRef) {
            // Navigate to the messages page and pass the user to chat with in the state
            navigate('/messages', { state: { userToChat: gig.userRef } });
        }
    };

    if (loading) return <p style={{textAlign: 'center', marginTop: '2rem'}}>Loading...</p>;
    if (error) return <p style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>{error}</p>;

    return (
        <div style={pageStyles}>
            {/* Gig Details Section */}
            {gig && (
                <div style={cardStyles}>
                    <h1 style={titleStyles}>{gig.title}</h1>
                    <p style={detailStyles}><strong>Posted by:</strong> {gig.userRef.username}</p>
                    <p style={detailStyles}><strong>Category:</strong> {gig.category}</p>
                    <p style={detailStyles}><strong>Location:</strong> {gig.location}</p>
                    <p style={detailStyles}><strong>Budget:</strong> ${gig.budget}</p>
                    <p style={{marginTop: '1rem'}}>{gig.description}</p>

                    {/* NEW: Add Contact Client button */}
                    {currentUser && currentUser._id !== gig.userRef._id && (
                        <button onClick={handleContact} style={{...buttonStyles, marginTop: '1rem'}}>
                            Contact Client
                        </button>
                    )}
                </div>
            )}

            {/* Reviews Section */}
            <div style={cardStyles}>
                <h2>Reviews</h2>
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <div key={review._id} style={reviewStyles}>
                            <p><strong>{review.userId ? review.userId.username : 'Anonymous'}</strong> - {'⭐'.repeat(review.rating)}</p>
                            <p>{review.comment}</p>
                        </div>
                    ))
                ) : <p>No reviews yet. Be the first to leave a review!</p>}
            </div>

            {/* Add Review Form */}
            {currentUser && (
                <div style={cardStyles}>
                    <h2>Leave a Review</h2>
                    <form onSubmit={handleReviewSubmit}>
                        <select value={rating} onChange={(e) => setRating(e.target.value)} style={inputStyles}>
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="1">1 Star</option>
                        </select>
                        <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write your comment..." style={{...inputStyles, height: '100px'}} required />
                        <button type="submit" style={buttonStyles}>Submit Review</button>
                    </form>
                </div>
            )}
        </div>
    );
};

// Styles
const pageStyles = { padding: '2rem', background: '#f9fafb', display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' };
const cardStyles = { background: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', width: '100%', maxWidth: '800px' };
const titleStyles = { fontSize: '2rem', fontWeight: 'bold', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem', marginBottom: '1rem' };
const detailStyles = { color: '#6b7280', fontSize: '1rem' };
const reviewStyles = { borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem', marginBottom: '1rem' };
const inputStyles = { width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', marginBottom: '1rem' };
const buttonStyles = { padding: '0.75rem 1.5rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' };

export default GigDetailPage;

