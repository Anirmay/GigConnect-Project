import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { SocketContext } from '../context/SocketContext'; // Import SocketContext

const UserSidebar = ({ onSelectUser }) => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const { onlineUsers } = useContext(SocketContext); // NEW: Get online users from context

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/users', { withCredentials: true });
                setUsers(res.data);
            } catch (error) {
                console.error("Failed to fetch users", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={sidebarStyles}>
            <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={searchInputStyles}
            />
            {loading ? (
                <p style={{textAlign: 'center', padding: '1rem'}}>Loading users...</p>
            ) : (
                <ul style={listStyles}>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => {
                            // NEW: Check if the user is in the online list
                            const isOnline = onlineUsers.includes(user._id);
                            return (
                                <li key={user._id} onClick={() => onSelectUser(user)} style={listItemStyles}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        {/* NEW: Green dot for online status */}
                                        <span style={{...onlineIndicatorStyles, background: isOnline ? '#22c55e' : '#9ca3af'}}></span>
                                        {user.username} ({user.role})
                                    </div>
                                </li>
                            );
                        })
                    ) : (
                        <p style={{textAlign: 'center', padding: '1rem'}}>No users found.</p>
                    )}
                </ul>
            )}
        </div>
    );
};

// Styles
const sidebarStyles = { width: '300px', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', background: '#f9fafb' };
const searchInputStyles = { padding: '0.75rem', border: 'none', borderBottom: '1px solid #e5e7eb', background: '#fff' };
const listStyles = { listStyle: 'none', margin: 0, padding: 0, overflowY: 'auto' };
const listItemStyles = { padding: '1rem', borderBottom: '1px solid #e5e7eb', cursor: 'pointer' };
// NEW: Styles for the online indicator dot
const onlineIndicatorStyles = {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    marginRight: '10px',
};

export default UserSidebar;

