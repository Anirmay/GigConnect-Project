import React, { createContext, useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { AuthContext } from './AuthContext';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser) {
            const newSocket = io('https://gigconnect-project.onrender.com', {
                query: {
                    userId: currentUser._id,
                },
            });
            setSocket(newSocket);

            // NEW: Listen for the 'getOnlineUsers' event from the server
            newSocket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            // Cleanup function to close the socket
            return () => newSocket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [currentUser]);

    return (
        // NEW: Provide onlineUsers to the rest of the app
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};