import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const EditGigPage = () => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        budget: '',
        location: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch the existing gig data when the page loads
        const fetchGig = async () => {
            try {
                const res = await axios.get(`https://gigconnect-project.onrender.com/api/gig/${id}`);
                setFormData(res.data);
            } catch (err) {
                setError("Could not fetch gig data.");
                console.error(err);
            }
        };
        fetchGig();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await axios.put(`https://gigconnect-project.onrender.com/api/gig/update/${id}`, formData, { withCredentials: true });
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update gig.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={pageStyles}>
            <div style={formContainerStyles}>
                <h1 style={titleStyles}>Edit Your Gig</h1>
                <form onSubmit={handleSubmit} style={formStyles}>
                    <input type="text" name="title" placeholder="Gig Title" value={formData.title} onChange={handleChange} style={inputStyles} required />
                    <textarea name="description" placeholder="Describe your project..." value={formData.description} onChange={handleChange} style={{...inputStyles, height: '120px'}} required />
                    <select name="category" value={formData.category} onChange={handleChange} style={inputStyles} required>
                        <option value="Web Development">Web Development</option>
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="Writing & Translation">Writing & Translation</option>
                        <option value="Video & Animation">Video & Animation</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                    </select>
                    <input type="number" name="budget" placeholder="Budget (in INR)" value={formData.budget} onChange={handleChange} style={inputStyles} required />
                     <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} style={inputStyles} required />
                    {error && <p style={errorStyles}>{error}</p>}
                    <button type="submit" style={buttonStyles} disabled={loading}>
                        {loading ? 'Updating...' : 'Update Gig'}
                    </button>
                </form>
            </div>
        </div>
    );
};

// --- Styles ---
const pageStyles = { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '4rem 2rem', background: '#f9fafb' };
const formContainerStyles = { background: 'white', padding: '2.5rem', borderRadius: '0.75rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', width: '100%', maxWidth: '600px' };
const titleStyles = { fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem' };
const formStyles = { display: 'flex', flexDirection: 'column', gap: '1rem' };
const inputStyles = { padding: '0.75rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', fontSize: '1rem' };
const buttonStyles = { padding: '0.75rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '0.375rem', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' };
const errorStyles = { color: '#ef4444', textAlign: 'center', fontSize: '0.875rem' };

export default EditGigPage;