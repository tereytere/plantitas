import { useState, useEffect } from 'react';
import useFetchUserData from './useFetchUserData';

const useFetchAndFilterPlants = () => {
    const { user, error } = useFetchUserData();
    const [plants, setPlants] = useState([]);

    useEffect(() => {
        console.log('useFetchAndFilterPlants: User data', user);
        if (user && user.plants) {
            console.log('Setting plants:', user.plants);
            setPlants(user.plants);
        } else {
            console.log('useFetchAndFilterPlants: No plants found or user not available');
        }
    }, [user]);

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
