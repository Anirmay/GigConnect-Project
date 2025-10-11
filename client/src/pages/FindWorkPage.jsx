import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Search } from 'lucide-react'; // 🔹 Make sure you installed: npm install lucide-react

// --- Hover styles for gig cards and category buttons ---
const PageStyles = () => (
  <style>{`
      .gig-card-hover {
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
      }
      .gig-card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
      }
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
  `}</style>
);

const FindWorkPage = () => {
  const { currentUser } = useContext(AuthContext);
  const [gigs, setGigs] = useState([]);
  const [filteredGigs, setFilteredGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const popularCategories = [
    'All',
    'Web Development',
    'Graphic Design',
    'Writing',
    'Video & Animation',
    'Digital Marketing',
  ];

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:8000/api/gig');
        setGigs(res.data);
        setFilteredGigs(res.data);
      } catch (err) {
        setError('Failed to fetch gigs.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGigs();
  }, []);

  // --- Filter gigs when search term or category changes ---
  useEffect(() => {
    let updated = gigs;

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      updated = updated.filter(
        (gig) =>
          gig.title.toLowerCase().includes(term) ||
          gig.category.toLowerCase().includes(term)
      );
    }

    if (selectedCategory !== 'All') {
      updated = updated.filter(
        (gig) =>
          gig.category &&
          gig.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    setFilteredGigs(updated);
  }, [searchTerm, selectedCategory, gigs]);

  const handleSearchSubmit = (e) => e.preventDefault();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setSearchTerm('');
    } else {
      setSearchTerm(category);
    }
  };

  const handleGigClick = (e) => {
    if (!currentUser) {
      e.preventDefault();
      setLoginMessage('You must be logged in to view gig details.');
      setTimeout(() => setLoginMessage(''), 3000);
    }
  };

  if (loading) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading gigs...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>{error}</p>;

  return (
    <div style={pageStyles}>
      <PageStyles />

      {loginMessage && <div style={messageStyles}>{loginMessage}</div>}

      {/* --- Hero Section with Search Bar --- */}
      <div style={headerStyles}>
        <h1 style={titleStyles}>Find Your Next Opportunity</h1>
        <p style={subtitleStyles}>Browse all available gigs and apply for the one that fits your skills.</p>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} style={searchContainer}>
          <div style={searchInputWrapper}>
            <Search size={20} color="#9ca3af" />
            <input
              type="search"
              placeholder="e.g., 'Web Developer jobs in Delhi'"
              style={searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button type="submit" style={searchButton}>Search</button>
        </form>

        {/* --- Popular Categories --- */}
        <div style={popularContainer}>
          <span style={{ marginRight: '0.5rem', color: '#6b7280' }}>Popular:</span>
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

      {/* --- Gig Grid --- */}
      <div style={gridStyles}>
        {filteredGigs.map((gig) => (
          <Link
            to={`/gig/${gig._id}`}
            key={gig._id}
            style={cardLinkStyles}
            onClick={handleGigClick}
          >
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
const subtitleStyles = { color: '#6b7280', marginTop: '0.5rem', marginBottom: '1.5rem' };

const searchContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '1.5rem',
};
const searchInputWrapper = {
  display: 'flex',
  alignItems: 'center',
  background: 'white',
  borderRadius: '9999px',
  border: '1px solid #d1d5db',
  padding: '0.5rem 1rem',
  width: '350px',
};
const searchInput = {
  border: 'none',
  outline: 'none',
  flexGrow: 1,
  marginLeft: '0.5rem',
};
const searchButton = {
  marginLeft: '0.75rem',
  background: '#4f46e5',
  color: 'white',
  border: 'none',
  borderRadius: '9999px',
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  transition: 'background 0.2s',
};
const popularContainer = { marginTop: '1rem' };

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