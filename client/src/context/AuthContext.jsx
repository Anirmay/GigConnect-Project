import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true); // To handle initial check

    useEffect(() => {
        const verifyUser = async () => {
            try {
                // This call checks with the backend if the user is still logged in
                const res = await axios.get('http://localhost:8000/api/auth/verify', { withCredentials: true });
                 console.log("User data from backend:", res.data);
                setCurrentUser(res.data);
            } catch (error) {
                // If there's an error (e.g., token expired), the user is logged out
                setCurrentUser(null);
            } finally {
                setLoading(false);
            }
        };
        verifyUser();
    }, []);

    const logout = async () => {
        try {
            await axios.post('http://localhost:8000/api/auth/logout', {}, { withCredentials: true });
            setCurrentUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

