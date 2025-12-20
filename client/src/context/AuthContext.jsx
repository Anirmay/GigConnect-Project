import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            try {

                const res = await axios.get("https://gigconnect-project.onrender.com/api/auth/verify", { withCredentials: true });
                 console.log("User data from backend:", res.data);
                setCurrentUser(res.data);
            } catch (error) {
                setCurrentUser(null);
            } finally {
                setLoading(false);
            }
        };
        verifyUser();
    }, []);

    const logout = async () => {
        try {
            await axios.post('https://gigconnect-project.onrender.com/api/auth/logout', {}, { withCredentials: true });
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