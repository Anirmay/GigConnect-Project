import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import UserSidebar from '../components/UserSidebar';
import MessageContainer from '../components/MessageContainer';

const ChatPage = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const location = useLocation();


    useEffect(() => {

        if (location.state && location.state.userToChat) {
            setSelectedUser(location.state.userToChat);
        }
    }, [location.state]);

    return (
        <div style={pageStyles}>
            <UserSidebar onSelectUser={setSelectedUser} />
            <MessageContainer selectedUser={selectedUser} />
        </div>
    );
};

const pageStyles = {
    display: 'flex',
    height: 'calc(100vh - 65px)',
};

export default ChatPage;