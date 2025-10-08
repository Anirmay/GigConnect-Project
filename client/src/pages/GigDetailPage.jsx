import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import PaymentButton from "../components/PaymentButton";

const GigDetailPage = () => {
    const { id } = useParams();
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [gig, setGig] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchGigAndReviews = async () => {
            try {
                setLoading(true);
                const [gigRes, reviewRes] = await Promise.all([
                    axios.get(`http://localhost:8000/api/gig/${id}`),
                    axios.get(`http://localhost:8000/api/review/${id}`)
                ]);
                setGig(gigRes.data);
                setReviews(reviewRes.data);
            } catch (err) {
                setError('Could not fetch data for this gig.');
                console.error(err);
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
            await axios.post(
                'http://localhost:8000/api/review/create',
                { gigId: id, rating, comment },
                { withCredentials: true }
            );
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
            navigate('/messages', { state: { userToChat: gig.userRef } });
        }
    };

    const handleEdit = () => {
        navigate(`/edit-gig/${id}`);
    };

    if (loading) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading gig details...</p>;
    if (error) return <p style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>{error}</p>;
    if (!gig) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Gig not found.</p>;

    const isOwnGig = currentUser && gig.userRef && currentUser._id === gig.userRef._id;

    return (
        <div style={pageStyles}>
            <div style={cardStyles}>
                <h1 style={titleStyles}>{gig.title}</h1>
                {gig.userRef && <p style={detailStyles}><strong>Posted by:</strong> {gig.userRef.username}</p>}
                <p style={detailStyles}><strong>Category:</strong> {gig.category}</p>
                <p style={detailStyles}><strong>Location:</strong> {gig.location}</p>
                <p style={detailStyles}><strong>Budget:</strong> ₹{gig.budget}</p>
                <p style={{ marginTop: '1rem' }}>{gig.description}</p>

                {/* Buttons for users who are NOT the owner */}
                {!isOwnGig && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem', marginTop: '1rem' }}>
                        {/* Show Pay button only if user is a client */}
                        {currentUser?.role === "client" && (
                            <PaymentButton amount={gig.budget} style={actionButtonStyles} />
                        )}
                        <button onClick={handleContact} style={actionButtonStyles}>
                            Contact Client
                        </button>
                    </div>
                )}

                {/* Button for the user who IS the owner */}
                {isOwnGig && (
                    <div style={{ marginTop: '1rem' }}>
                        <button onClick={handleEdit} style={editButtonStyles}>
                            Edit Gig
                        </button>
                    </div>
                )}
            </div>

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
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Write your comment..."
                            style={{ ...inputStyles, height: '100px' }}
                            required
                        />
                        <button type="submit" style={buttonStyles}>Submit Review</button>
                    </form>
                </div>
            )}
        </div>
    );
};

// --- Styles ---
const pageStyles = { padding: '2rem', background: '#f9fafb', display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' };
const cardStyles = { background: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', width: '100%', maxWidth: '800px' };
const titleStyles = { fontSize: '2rem', fontWeight: 'bold', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem', marginBottom: '1rem' };
const detailStyles = { color: '#6b7280', fontSize: '1rem' };
const reviewStyles = { borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem', marginBottom: '1rem' };
const inputStyles = { width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', marginBottom: '1rem' };
const buttonStyles = { padding: '0.75rem 1.5rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' };

const actionButtonStyles = {
    ...buttonStyles,
    width: '200px',
    height: '45px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const editButtonStyles = {
    ...actionButtonStyles,
    background: '#10B981', // Green
};

export default GigDetailPage;
