import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { SocketContext } from '../context/SocketContext';

const MessageContainer = ({ selectedUser }) => {
    const { currentUser } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const fetchMessages = async () => {
            if (selectedUser) {
                try {
                    const res = await axios.get(`https://gigconnect-project.onrender.com/api/message/${selectedUser._id}`, { withCredentials: true });
                    setMessages(res.data);
                } catch (error) {
                    console.error("Failed to fetch messages", error);
                }
            }
        };
        fetchMessages();
    }, [selectedUser]);


    useEffect(() => {
        if (socket) {
            socket.on("newMessage", (newMessage) => {
                if (selectedUser && (newMessage.senderId === selectedUser._id || newMessage.receiverId === selectedUser._id)) {
                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                }
            });

            return () => socket.off("newMessage");
        }
    }, [socket, selectedUser]);

    // useEffect(() => {
    //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    // }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            const res = await axios.post(`https://gigconnect-project.onrender.com/api/message/send/${selectedUser._id}`, { message: newMessage }, { withCredentials: true });
            setMessages([...messages, res.data]);
            setNewMessage('');
        } catch (error) {
            console.error("Failed to send message", error);
        }
    };

    if (!selectedUser) {
        return <div style={noChatStyles}>Select a user to start a conversation</div>;
    }

    return (
        <div style={containerStyles}>
            <div style={headerStyles}>{selectedUser.username}</div>
            <div style={messagesAreaStyles}>
                {messages.map(msg => (
                    <div key={msg._id} style={msg.senderId === currentUser._id ? myMessageStyles : theirMessageStyles}>
                        {msg.message}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} style={formStyles}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    style={inputStyles}
                />
                <button type="submit" style={buttonStyles}>Send</button>
            </form>
        </div>
    );
};


const containerStyles = { flex: 1, display: 'flex', flexDirection: 'column' };
const headerStyles = { padding: '1rem', borderBottom: '1px solid #e5e7eb', fontWeight: 'bold' };
const messagesAreaStyles = { flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' };
const formStyles = { display: 'flex', padding: '1rem', borderTop: '1px solid #e5e7eb' };
const inputStyles = { flex: 1, padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' };
const buttonStyles = { padding: '0.75rem 1.5rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '0.375rem', marginLeft: '0.5rem' };
const noChatStyles = { flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#9ca3af' };
const messageBaseStyles = { padding: '0.5rem 1rem', borderRadius: '1rem', maxWidth: '60%' };
const myMessageStyles = { ...messageBaseStyles, background: '#4f46e5', color: 'white', alignSelf: 'flex-end' };
const theirMessageStyles = { ...messageBaseStyles, background: '#e5e7eb', color: '#333', alignSelf: 'flex-start' };

export default MessageContainer;