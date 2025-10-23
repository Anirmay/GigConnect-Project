import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const CreateGigPage = () => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Web Development',
        budget: '',
        location: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    if (!currentUser || currentUser.role !== 'Client') {
        // You can also show a "Not Authorized" message
        navigate('/');
        return null;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:8000/api/gig/create', formData, { withCredentials: true });
            console.log('Gig created successfully:', response.data);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create gig.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={pageStyles}>
            <div style={formContainerStyles}>
                <h1 style={titleStyles}>Post a New Gig</h1>
                <p style={subtitleStyles}>Describe your project to attract the best local talent.</p>
                <form onSubmit={handleSubmit} style={formStyles}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Gig Title (e.g., 'Build a Modern Website')"
                        onChange={handleChange}
                        style={inputStyles}
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Describe your project in detail..."
                        onChange={handleChange}
                        style={{...inputStyles, height: '120px', resize: 'vertical'}}
                        required
                    />
                    <select name="category" onChange={handleChange} style={inputStyles} required>
                        <option value="Web Development">Web Development</option>
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="Writing & Translation">Writing & Translation</option>
                        <option value="Video & Animation">Video & Animation</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                    </select>
                    <input
                        type="number"
                        name="budget"
                        placeholder="Budget (in INR)"
                        onChange={handleChange}
                        style={inputStyles}
                        required
                    />
                     <input
                        type="text"
                        name="location"
                        placeholder="Location (e.g., 'KOLKATA, KL')"
                        onChange={handleChange}
                        style={inputStyles}
                        required
                    />
                    {error && <p style={errorStyles}>{error}</p>}
                    <button type="submit" style={buttonStyles} disabled={loading}>
                        {loading ? 'Posting...' : 'Post Gig'}
                    </button>
                </form>
            </div>
        </div>
    );
};

// --- Styles ---
const pageStyles = { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '4rem 2rem', background: '#f9fafb' };
const formContainerStyles = { background: 'white', padding: '2.5rem', borderRadius: '0.75rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', width: '100%', maxWidth: '600px' };
const titleStyles = { fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '0.5rem' };
const subtitleStyles = { color: '#6b7280', textAlign: 'center', marginBottom: '2rem' };
const formStyles = { display: 'flex', flexDirection: 'column', gap: '1rem' };
const inputStyles = { padding: '0.75rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', fontSize: '1rem' };
const buttonStyles = { padding: '0.75rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '0.375rem', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' };
const errorStyles = { color: '#ef4444', textAlign: 'center', fontSize: '0.875rem' };


export default CreateGigPage;