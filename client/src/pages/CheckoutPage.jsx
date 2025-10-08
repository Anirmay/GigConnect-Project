import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const CheckoutPage = () => {
    const location = useLocation();
    const [gig, setGig] = useState(null);

    useEffect(() => {
        // Get the gig details passed from the previous page
        if (location.state && location.state.gig) {
            setGig(location.state.gig);
        }
    }, [location.state]);

    if (!gig) {
        return (
            <div style={pageStyles}>
                <div style={containerStyles}>
                    <h1 style={titleStyles}>Error</h1>
                    <p>No gig information was provided. Please go back to the <Link to="/">home page</Link> and select a gig to hire.</p>
                </div>
            </div>
        );
    }

    return (
        <div style={pageStyles}>
            <div style={containerStyles}>
                <h1 style={titleStyles}>Checkout</h1>
                <p style={subtitleStyles}>You are about to hire for the following gig:</p>

                <div style={cardStyles}>
                    <h2>{gig.title}</h2>
                    <p><strong>Category:</strong> {gig.category}</p>
                    <p><strong>Location:</strong> {gig.location}</p>
                    <div style={priceStyles}>
                        <span>Total Price:</span>
                        <span>₹{gig.budget}</span>
                    </div>
                </div>
                
                <div style={{textAlign: 'center', marginTop: '2rem'}}>
                    {/* In the future, a Stripe or Razorpay payment form would go here */}
                    <button style={buttonStyles}>Proceed to Payment (Placeholder)</button>
                </div>
            </div>
        </div>
    );
};

// --- Styles ---
const pageStyles = { padding: '4rem 2rem', background: '#f9fafb' };
const containerStyles = { maxWidth: '700px', margin: '0 auto' };
const titleStyles = { fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem' };
const subtitleStyles = { fontSize: '1.125rem', color: '#6b7280', textAlign: 'center', marginBottom: '2rem' };
const cardStyles = { background: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'};
const priceStyles = { display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.25rem', borderTop: '1px solid #e5e7eb', paddingTop: '1rem', marginTop: '1rem' };
const buttonStyles = { padding: '0.75rem 1.5rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', fontSize: '1rem' };

export default CheckoutPage;