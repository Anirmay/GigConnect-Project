import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const { currentUser, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userGigs, setUserGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!currentUser) {
      navigate('/auth');
      return;
    }

    if (currentUser.role?.toLowerCase() === 'client') {
      const fetchUserGigs = async () => {
        try {
          const res = await axios.get('http://localhost:8000/api/gig/user/my-gigs', { withCredentials: true });
          setUserGigs(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
          console.error("Failed to fetch user's gigs", error);
          setUserGigs([]); // fallback to empty
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
    if (window.confirm('Are you sure you want to delete this gig?')) {
      try {
        await axios.delete(`http://localhost:8000/api/gig/delete/${gigId}`, { withCredentials: true });
        setUserGigs(prev => prev.filter(gig => gig._id !== gigId));
      } catch (error) {
        console.error('Failed to delete gig:', error);
        alert('Failed to delete gig.');
      }
    }
  };

  if (authLoading || loading) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading dashboard...</p>;
  }

  return (
    <div style={{ padding: '2rem', background: '#f9fafb' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Welcome, {currentUser?.username || "User"}
        </h1>

        {currentUser?.role?.toLowerCase() === 'client' && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
              Your Posted Gigs
            </h2>
            {userGigs.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {userGigs.map(gig => (
                  <div key={gig._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '1rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <span>{gig.title}</span>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Link to={`/edit-gig/${gig._id}`} style={{ background: '#4f46e5', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.375rem', textDecoration: 'none' }}>Edit</Link>
                      <button onClick={() => handleDeleteGig(gig._id)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.375rem', cursor: 'pointer' }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>You haven't posted any gigs yet. <Link to="/post-gig">Post one now!</Link></p>
            )}
          </div>
        )}

        {currentUser?.role?.toLowerCase() === 'freelancer' && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
              Your Freelancer Profile
            </h2>
            <p>Manage your professional profile to attract clients.</p>
            <Link to="/profile" style={{ padding: '0.75rem 1.5rem', background: '#4f46e5', color: 'white', borderRadius: '0.375rem', textDecoration: 'none' }}>
              Edit Your Profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}