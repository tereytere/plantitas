import { useState, useEffect } from 'react';

const useFetchPlantData = (plantId) => {
    const [plant, setPlant] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/plant/${plantId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch plant data');
                }
                const data = await response.json();
                setPlant(data.findPlant);
            } catch (error) {
                setError(error.message);
            }
        };

        if (plantId) {
            fetchData();
        }
    }, [plantId]);

    return { plant, error };
};

export default useFetchPlantData;
