import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { decodeToken } from '../utils/authUtils';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const login = (token) => {
        try {
            const decodedToken = decodeToken(token);
            if (decodedToken) {
                setUser({
                    id: decodedToken.id,
                    email: decodedToken.email,
                    role: decodedToken.role,
                });
                localStorage.setItem('token', token);
            } else {
                console.error('Invalid token');
            }
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    };

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('token');
        navigate('/login');
    }, [navigate]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = decodeToken(token);
                if (decodedToken) {
                    setUser({
                        id: decodedToken.id,
                        email: decodedToken.email,
                        role: decodedToken.role,
                    });
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                setUser(null);
            }
        } else {
            setUser(null);
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
