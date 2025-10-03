import React from 'react';

// --- Icon Components ---
const BriefcaseIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={iconStyles}> <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect> <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path> </svg> );
const ShieldIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={iconStyles}> <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path> </svg> );
const MessageSquareIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={iconStyles}> <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path> </svg> );

const WhyGigConnectPage = () => {
    return (
        <div style={pageStyles}>
            <div style={containerStyles}>
                <h1 style={titleStyles}>Why Choose GigConnect?</h1>
                <p style={subtitleStyles}>
                    We're building a better way for local communities and skilled professionals to connect and collaborate.
                </p>

                <div style={gridStyles}>
                    {/* Feature 1 */}
                    <div style={cardStyles}>
                        <div style={iconWrapperStyles}><BriefcaseIcon /></div>
                        <h3 style={cardTitleStyles}>Find Local Opportunities</h3>
                        <p style={cardDescriptionStyles}>
                            Our platform is built for hyperlocal connections. Whether you're a client looking for nearby talent or a freelancer seeking local projects, GigConnect makes it easy to find what you need right in your city.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div style={cardStyles}>
                        <div style={iconWrapperStyles}><MessageSquareIcon /></div>
                        <h3 style={cardTitleStyles}>Direct & Real-time Communication</h3>
                        <p style={cardDescriptionStyles}>
                            Our integrated real-time chat system allows for seamless communication. Discuss project details, share files, and collaborate directly with clients or freelancers without ever leaving the platform.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div style={cardStyles}>
                        <div style={iconWrapperStyles}><ShieldIcon /></div>
                        <h3 style={cardTitleStyles}>Trust & Transparency</h3>
                        <p style={cardDescriptionStyles}>
                            With our comprehensive review and rating system, you can hire with confidence. See feedback from previous projects to ensure you're working with reliable and skilled professionals.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Styles ---
const pageStyles = { padding: '4rem 2rem', background: '#f9fafb' };
const containerStyles = { maxWidth: '1280px', margin: '0 auto' };
const titleStyles = { fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem' };
const subtitleStyles = { fontSize: '1.125rem', color: '#6b7280', textAlign: 'center', marginBottom: '4rem' };
const gridStyles = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' };
const cardStyles = { background: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', textAlign: 'center' };
const iconWrapperStyles = { display: 'inline-flex', background: '#eef2ff', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem' };
const iconStyles = { height: '2rem', width: '2rem', color: '#4f46e5' };
const cardTitleStyles = { fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' };
const cardDescriptionStyles = { color: '#6b7280', lineHeight: '1.6' };

export default WhyGigConnectPage;

