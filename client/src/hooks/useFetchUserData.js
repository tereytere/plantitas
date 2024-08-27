import { useState, useEffect } from 'react';
import { fetchWithAuth } from '../utils/authUtils';

const useFetchUserData = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No hay token');
                return;
            }

            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const userId = decodedToken.id;

                const data = await fetchWithAuth(`http://localhost:5000/user/${userId}`, 'GET');
                console.log('Fetched user data:', data);
                if (data && data.findUser) {
                    setUser(data.findUser);
                } else {
                    setError('Failed to fetch user data');
                }
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    return { user, error };
};

export default useFetchUserData;
