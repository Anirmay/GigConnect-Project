import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { SocketContext } from '../context/SocketContext';
import { Search } from 'lucide-react';

const UserSidebar = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { onlineUsers } = useContext(SocketContext);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('https://gigconnect-project.onrender.com/api/users', { withCredentials: true });
        setUsers(res.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAvatarColor = (role) => {
    switch (role?.toLowerCase()) {
      case 'freelancer':
        return '#0ea5e9'; // cyan-blue
      case 'client':
        return '#4f46e5'; // purple
      default:
        return '#6b7280'; // gray
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUserId(user._id);
    onSelectUser(user);
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.searchContainer}>
        <Search size={18} color="#6b7280" />
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {loading ? (
        <p style={styles.loadingText}>Loading users...</p>
      ) : (
        <ul style={styles.list}>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => {
              const isOnline = onlineUsers.includes(user._id);
              const isSelected = selectedUserId === user._id;
              return (
                <li
                  key={user._id}
                  onClick={() => handleSelectUser(user)}
                  style={{
                    ...styles.listItem,
                    backgroundColor: isSelected ? '#e0e7ff' : '#fff',
                  }}
                >
                  <div style={styles.profileContainer}>
                    <div style={styles.avatarWrapper}>
                      <div
                        style={{
                          ...styles.avatarCircle,
                          backgroundColor: getAvatarColor(user.role),
                        }}
                      >
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <span
                        style={{
                          ...styles.onlineDot,
                          backgroundColor: isOnline ? '#22c55e' : '#9ca3af',
                        }}
                      />
                    </div>

                    <div style={styles.userInfo}>
                      <div style={styles.username}>{user.username}</div>
                      <div style={styles.role}>{user.role}</div>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <p style={styles.loadingText}>No users found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

//  Styles
const styles = {
  sidebar: {
    width: '320px',
    borderRight: '1px solid #e5e7eb',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f9fafb',
    height: 'calc(100vh - 64px)',
    position: 'sticky',
    top: '64px',
    left: 0,
    overflow: 'hidden',
    zIndex: 99,
    boxShadow: '2px 0 4px rgba(0,0,0,0.05)',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    borderBottom: '1px solid #e5e7eb',
    backgroundColor: '#fff',
  },
  searchInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '14px',
    color: '#374151',
  },
  loadingText: {
    textAlign: 'center',
    padding: '1rem',
    color: '#6b7280',
  },
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    overflowY: 'auto',
    flex: 1,
  },
  listItem: {
    padding: '10px 16px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    borderBottom: '1px solid #f3f4f6',
    transition: 'background-color 0.2s ease',
  },
  profileContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarCircle: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    fontSize: '16px',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 3,
    right: 3,
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    border: '2px solid white',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  username: {
    fontWeight: 600,
    color: '#111827',
    fontSize: '15px',
  },
  role: {
    fontSize: '13px',
    color: '#6b7280',
  },
};


const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
  li:hover {
    background-color: #eef2ff !important;
  }
`;
document.head.appendChild(styleSheet);

export default UserSidebar;
