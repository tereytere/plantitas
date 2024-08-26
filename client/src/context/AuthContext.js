import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { getToken, decodeToken } from '../utils/authUtils';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const login = (token) => {
        const decodedToken = decodeToken(token);
        if (decodedToken) {
            setUser({
                id: decodedToken.id,
                email: decodedToken.email,
                role: decodedToken.role,
            });
            localStorage.setItem('token', token);
        }
    };

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('token');
        navigate('/login');
    }, [navigate]);

    useEffect(() => {
        const token = getToken();
        //console.log('Token:', token);
        const decodedToken = decodeToken(token);
        //console.log('Decoded Token:', decodedToken);
        if (decodedToken) {
            setUser({
                id: decodedToken.id,
                email: decodedToken.email,
                role: decodedToken.role,
            });
        } else {
            setUser(null);
        }
        setLoading(false);
    }, [navigate]);

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
