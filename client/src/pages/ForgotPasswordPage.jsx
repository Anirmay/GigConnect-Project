import React, { useState } from 'react';
import axios from 'axios';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');
        try {
            const response = await axios.post('http://localhost:8000/api/auth/forgot-password', { email });
            setMessage(response.data.message);
        } catch (err) {
            setError(err.response.data.message);
        }
        setLoading(false);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <div style={{ padding: '40px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px', background: 'white', textAlign: 'center' }}>
                <h2>Forgot Password</h2>
                <p>Enter your email address and we will send you a link to reset your password.</p>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    <button type="submit" disabled={loading} style={{ padding: '10px', borderRadius: '5px', border: 'none', background: '#FF4B2B', color: 'white', cursor: 'pointer' }}>
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
                {message && <p style={{ color: 'green', marginTop: '15px' }}>{message}</p>}
                {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
            </div>
        </div>
    );
};

export default ForgotPasswordPage;