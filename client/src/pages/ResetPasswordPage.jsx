import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setLoading(true);
        setMessage('');
        setError('');
        try {
            const response = await axios.post(`http://localhost:8000/api/auth/reset-password/${token}`, { password });
            setMessage(response.data.message);
            setTimeout(() => navigate('/auth'), 3000); // Redirect to login after 3 seconds
        } catch (err) {
            setError(err.response.data.message);
        }
        setLoading(false);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <div style={{ padding: '40px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px', background: 'white', textAlign: 'center' }}>
                <h2>Reset Your Password</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    <button type="submit" disabled={loading} style={{ padding: '10px', borderRadius: '5px', border: 'none', background: '#FF4B2B', color: 'white', cursor: 'pointer' }}>
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
                {message && <p style={{ color: 'green', marginTop: '15px' }}>{message}</p>}
                {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
            </div>
        </div>
    );
};

export default ResetPasswordPage;
