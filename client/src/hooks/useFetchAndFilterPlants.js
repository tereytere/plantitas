import { useState, useEffect } from 'react';
import { fetchWithAuth, getToken } from '../utils/authUtils';
import { useAuth } from '../context/AuthContext';

const useFetchAndFilterPlants = () => {
    const { loading } = useAuth();
    const [plants, setPlants] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (loading) {
            console.log('Loading, skipping fetch');
            return;
        }
        const token = getToken();
        console.log('Token in useFetchAndFilterPlants:', token);
        if (!token) {
            setError('No token found');
            return;
        }

        const fetchData = async () => {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const userId = decodedToken.id;

                const response = await fetchWithAuth(`http://localhost:5000/user/${userId}`, 'GET');
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Error fetching plants');
                }

                setPlants(data.plants);
                console.log(data.plants);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, [loading]);

    const filterPlantsByStatus = (status) => plants.filter(plant => plant.status === status);

    return {
        housePlants: filterPlantsByStatus('good'),
        nurseryPlants: filterPlantsByStatus('plague'),
        graveyardPlants: filterPlantsByStatus('dead'),
        wishlistPlants: filterPlantsByStatus('wish'),
        error,
    };
};

export default useFetchAndFilterPlants;
