import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { Search } from 'lucide-react';

const FindTalentPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loginMessage, setLoginMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { currentUser } = useContext(AuthContext);

  const popularCategories = [
    'All',
    'Graphic Designer',
    'Web Developer',
    'Content Writer',
    'Digital Marketer',
    'Video Editor',
  ];

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users/freelancers');
        setProfiles(response.data);
        setFilteredProfiles(response.data);
      } catch (err) {
        setError('Could not fetch freelancers.');
      } finally {
        setLoading(false);
      }
    };
    fetchFreelancers();
  }, []);

  useEffect(() => {
    let updated = profiles;

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      updated = updated.filter(
        (p) =>
          p.user.username.toLowerCase().includes(term) ||
          p.skills.some((skill) => skill.toLowerCase().includes(term))
      );
    }

    if (selectedCategory && selectedCategory !== 'All') {
      updated = updated.filter((p) =>
        p.skills.some((skill) =>
          skill.toLowerCase().includes(selectedCategory.toLowerCase())
        )
      );
    }

    setFilteredProfiles(updated);
  }, [searchTerm, selectedCategory, profiles]);

  const handleProfileClick = (e) => {
    if (!currentUser) {
      e.preventDefault();
      setLoginMessage("You must be logged in to view a freelancer's profile.");
      setTimeout(() => setLoginMessage(''), 3000);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setSearchTerm('');
    } else {
      setSearchTerm(category);
    }
  };

  const showSearchBar =
    !currentUser || (currentUser && currentUser.role === 'Client');

  if (loading) return <p style={textCenterStyles}>Loading talent...</p>;
  if (error) return <p style={errorTextStyles}>{error}</p>;

  return (
    <main
      className="main-container"
      style={{
        backgroundColor: '#f8faff',
        minHeight: '100vh',
        paddingTop: '40px', // Reduced space under navbar (was larger before)
        paddingBottom: '50px',
      }}
    >
      <style>{`
        .category-tag {
          background: #eef2ff;
          color: #4f46e5;
          border: none;
          border-radius: 9999px;
          padding: 0.5rem 1rem;
          margin: 0.25rem 0.5rem;
          cursor: pointer;
          transition: all 0.25s ease-in-out;
          font-size: 0.9rem;
        }
        .category-tag:hover {
          transform: translateY(-4px);
          background: #e0e7ff;
        }
        .category-tag.active {
          background: #4f46e5;
          color: white;
          transform: translateY(-4px);
        }
        .profile-card-hover {
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }
        .profile-card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                      0 4px 6px -4px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      {loginMessage && <div style={messageStyles}>{loginMessage}</div>}

      {/* --- HERO SECTION --- */}
      <section className="hero-section">
        <div className="container text-center" style={{ marginTop: '0' }}>
          <h1 className="hero-title" style={{ fontSize: '2.5rem', fontWeight: '700' }}>
            Find Local Talent, <span style={{ color: '#4f46e5' }}>On-Demand.</span>
          </h1>
          <p className="hero-subtitle" style={{ marginTop: '0.75rem', color: '#4b5563' }}>
            Connect with skilled freelancers in your city. From web design to dog
            walking, GigConnect is your hyperlocal marketplace for professional
            services.
          </p>

          {showSearchBar && (
            <form
              onSubmit={handleSearchSubmit}
              className="search-container"
              style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}
            >
              <div className="search-input-wrapper" style={{ position: 'relative', width: '400px' }}>
                <div
                  className="search-icon"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '10px',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <Search size={20} color="#9ca3af" />
                </div>
                <input
                  type="search"
                  placeholder="e.g., 'Graphic Designer in Kolkata'"
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 2.5rem',
                    borderRadius: '999px',
                    border: '1px solid #d1d5db',
                    outline: 'none',
                    fontSize: '1rem',
                  }}
                />
              </div>
              <button
                type="submit"
                className="search-button"
                style={{
                  background: '#4f46e5',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease',
                }}
              >
                Search
              </button>
            </form>
          )}

          {/* --- POPULAR CATEGORIES --- */}
          <div className="popular-categories" style={{ marginTop: '1.25rem' }}>
            <span style={{ marginRight: '0.5rem', color: '#4b5563' }}>Popular:</span>
            {popularCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`category-tag ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- TALENT GRID (NO “Available Freelancers” TITLE) --- */}
      <section className="section" style={{ marginTop: '3rem' }}>
        <div className="container">
          {filteredProfiles.length > 0 ? (
            <div style={gridStyles}>
              {filteredProfiles.map((profile) => (
                <Link
                  to={`/user/${profile.user._id}`}
                  key={profile._id}
                  style={cardLinkStyles}
                  onClick={handleProfileClick}
                >
                  <div style={cardStyles} className="profile-card-hover">
                    <h3 style={cardTitleStyles}>{profile.user.username}</h3>
                    <p style={cardHeadlineStyles}>
                      {profile.headline || 'Professional Freelancer'}
                    </p>
                    <div style={skillsContainerStyles}>
                      {profile.skills.slice(0, 3).map((skill) => (
                        <span key={skill} style={skillTagStyles}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p style={textCenterStyles}>No freelancers found.</p>
          )}
        </div>
      </section>
    </main>
  );
};

// --- STYLES ---
const gridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '2.5rem',
};
const cardLinkStyles = { textDecoration: 'none', color: 'inherit' };
const cardStyles = {
  display: 'flex',
  flexDirection: 'column',
  background: 'white',
  border: '1px solid #e5e7eb',
  borderRadius: '0.75rem',
  padding: '1.5rem',
  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
  textAlign: 'center',
  cursor: 'pointer',
  height: '100%',
};
const cardTitleStyles = {
  fontSize: '1.25rem',
  fontWeight: '600',
  marginBottom: '0.25rem',
};
const cardHeadlineStyles = {
  color: '#6b7280',
  marginBottom: '1.5rem',
  flexGrow: 1,
};
const skillsContainerStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  justifyContent: 'center',
  marginBottom: '1.5rem',
  minHeight: '30px',
};
const skillTagStyles = {
  background: '#eef2ff',
  color: '#4f46e5',
  padding: '0.25rem 0.75rem',
  borderRadius: '9999px',
  fontSize: '0.75rem',
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
const textCenterStyles = { textAlign: 'center' };
const errorTextStyles = { textAlign: 'center', color: '#ef4444' };

export default FindTalentPage;