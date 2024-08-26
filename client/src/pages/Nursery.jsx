import React from 'react';
import useFetchAndFilterPlants from '../hooks/useFetchAndFilterPlants';
import PlantHome from '../components/PlantHome';

export default function Nursery() {
    const {
        nurseryPlants,
        error
    } = useFetchAndFilterPlants();

    if (error) return <p>Error: {error}</p>;

    const createListItems = (nurseryPlants) =>
        nurseryPlants.map(plant =>
            <PlantHome
                key={plant.id}
                idP={plant.id}
                image={plant.image}
                name={plant.name}
                description={plant.description}
                size={plant.size}
            />
        );

    return (
        <div className='grid nursery'>
            {createListItems(nurseryPlants)}
        </div>
    );
}