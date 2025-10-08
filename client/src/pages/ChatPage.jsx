import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // NEW: Import useLocation
import UserSidebar from '../components/UserSidebar';
import MessageContainer from '../components/MessageContainer';

const ChatPage = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const location = useLocation(); // NEW: Get location object to access navigation state

    // NEW: This useEffect hook checks if we arrived at this page with a pre-selected user
    useEffect(() => {
        // If the navigation state from GigDetailPage exists, set the selected user
        if (location.state && location.state.userToChat) {
            setSelectedUser(location.state.userToChat);
        }
    }, [location.state]); // Re-run this effect if the navigation state changes

    return (
        <div style={pageStyles}>
            <UserSidebar onSelectUser={setSelectedUser} />
            <MessageContainer selectedUser={selectedUser} />
        </div>
    );
};

const pageStyles = {
    display: 'flex',
    height: 'calc(100vh - 65px)', // Full height minus header
};

export default ChatPage;