import { useState, useEffect } from "react";

const useFetchPlants = () => {
    const [plants, setPlants] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/plants", {
                    method: "GET",
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                setPlants(data);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, []);

    return { plants, error };
};

export default useFetchPlants;
