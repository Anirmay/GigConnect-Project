import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';

// --- ICONS ---
const SearchIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{height: '1.25rem', width: '1.25rem', color: '#9ca3af'}}> <circle cx="11" cy="11" r="8"></circle> <line x1="21" y1="21" x2="16.65" y2="16.65"></line> </svg> );
const BriefcaseIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{height: '2rem', width: '2rem', color: '#4f46e5'}}> <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect> <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path> </svg> );
const UsersIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{height: '2rem', width: '2rem', color: '#4f46e5'}}> <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path> <circle cx="8.5" cy="7" r="4"></circle> <polyline points="17 11 19 13 23 9"></polyline> </svg> );
const CreditCardIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{height: '2rem', width: '2rem', color: '#4f46e5'}}> <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect> <line x1="1" y1="10" x2="23" y2="10"></line> </svg> );

const HomePage = () => {
    // NEW: Added "All" to the beginning of the categories array
    const popularCategories = ["All", "Web Development", "Graphic Design", "Writing & Translation", "Video & Animation", "Digital Marketing"];
    const navigate = useNavigate();
    const location = useLocation();

    const [gigs, setGigs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm') || '';
        setSearchTerm(searchTermFromUrl);

        const fetchGigs = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8000/api/gig${location.search}`);
                setGigs(response.data);
                setError(null);
            } catch (err) {
                setError('Could not fetch gigs.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchGigs();
    }, [location.search]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', searchTerm);
        navigate(`/?${urlParams.toString()}`);
    };

    // NEW: Updated function to handle the "All" case
    const handleCategoryClick = (category) => {
        if (category === 'All') {
            // If "All" is clicked, navigate to the base URL to clear all filters
            navigate('/');
        } else {
            const urlParams = new URLSearchParams();
            urlParams.set('category', category);
            navigate(`/?${urlParams.toString()}`);
        }
    };

    return (
        <main className="main-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container text-center">
                    <h1 className="hero-title"> Find Local Talent, <span className="highlight">On-Demand.</span> </h1>
                    <p className="hero-subtitle"> Connect with skilled freelancers in your city. From web design to dog walking, GigConnect is your hyperlocal marketplace for professional services. </p>
                    <form onSubmit={handleSearchSubmit} className="search-container">
                        <div className="search-input-wrapper">
                            <div className="search-icon"> <SearchIcon/> </div>
                            <input
                                type="search"
                                placeholder="e.g., 'Graphic Designer in New York'"
                                className="search-input"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="search-button"> Search </button>
                    </form>
                    <div className="popular-categories">
                        <span>Popular:</span>
                        {/* This will now include the "All" button */}
                        {popularCategories.map(cat => (
                            <button key={cat} onClick={() => handleCategoryClick(cat)} className="category-tag">
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recently Posted Gigs Section */}
            <section className="section">
                <div className="container">
                    <h2 className="section-title text-center">Available Gigs</h2>
                    {loading && <p className="text-center">Loading gigs...</p>}
                    {error && <p className="text-center" style={{color: 'red'}}>{error}</p>}
                    {!loading && !error && (
                        <div className="gigs-grid">
                            {gigs.length > 0 ? (
                                gigs.map(gig => (
                                    <Link to={`/gig/${gig._id}`} key={gig._id} className="gig-card-link">
                                        <div className="gig-card">
                                            <h3 className="gig-title">{gig.title}</h3>
                                            <p className="gig-category">{gig.category}</p>
                                            <p className="gig-description">{gig.description.substring(0, 100)}...</p>
                                            <div className="gig-footer">
                                                <span className="gig-budget">${gig.budget}</span>
                                                <span className="gig-location">{gig.location}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p className="text-center">No gigs found matching your criteria. Try a different search!</p>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* How It Works Section */}
            <section className="section">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-title">How It Works</h2>
                        <p className="section-subtitle">Get your project done in just a few simple steps.</p>
                    </div>
                    <div className="how-it-works-grid">
                        <div className="how-it-works-card">
                            <div className="icon-wrapper"> <BriefcaseIcon /> </div>
                            <h3 className="card-title">1. Post a Job</h3>
                            <p className="card-description">Tell us about your project. Our platform will connect you with the right freelancers for the job.</p>
                        </div>
                        <div className="how-it-works-card">
                            <div className="icon-wrapper"> <UsersIcon /> </div>
                            <h3 className="card-title">2. Hire Talent</h3>
                            <p className="card-description">Browse profiles, read reviews, and hire the best fit. Chat and collaborate directly.</p>
                        </div>
                        <div className="how-it-works-card">
                            <div className="icon-wrapper"> <CreditCardIcon/> </div>
                            <h3 className="card-title">3. Pay Securely</h3>
                            <p className="card-description">Pay through our secure platform only when the work is approved. It's simple and safe.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default HomePage;

