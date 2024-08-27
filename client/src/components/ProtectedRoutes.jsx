import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoutes({ children, role }) {
    const { user, loading } = useAuth();

    if (loading) {
        console.log('ProtectedRoutes: Loading state true');
        return <div>Loading...</div>;
    }

    if (!user) {
        console.log('ProtectedRoutes: User not authenticated');
        return <Navigate to="/login" />;
    }

    if (role && user.role !== role) {
        console.log('ProtectedRoutes: User role does not match required role');
        return <Navigate to="/404" />;
    }

    console.log('ProtectedRoutes: User', user);
    return children;
}

export default ProtectedRoutes;
