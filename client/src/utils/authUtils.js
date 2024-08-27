import { jwtDecode } from 'jwt-decode';

export const decodeToken = (token) => {
    if (!token) return null;
    try {
        return jwtDecode(token);
    } catch (error) {
        console.error('Token erroneo', error);
        return null;
    }
};

export const fetchWithAuth = async (url, method = 'GET', body = null) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No hay token');

        const decodedToken = decodeToken(token);
        if (!decodedToken) throw new Error('Token inválido');

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
            if (body instanceof FormData) {
            } else if (body) {
                headers['Content-Type'] = 'application/json';
                body = JSON.stringify(body);
            }
        }

        const fetchOptions = {
            method,
            headers,
        };

        if (body && (method === 'POST' || method === 'PUT' || method === 'DELETE')) {
            fetchOptions.body = body;
        }

        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            const errorDetails = await response.text();
            throw new Error(`Failed to fetch data: ${errorDetails}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};
