import React from 'react';
import useFetchAndFilterPlants from '../hooks/useFetchAndFilterPlants';
import PlantHome from '../components/PlantHome';

export default function Graveyard() {
    const {
        graveyardPlants,
        error
    } = useFetchAndFilterPlants();

    if (error) return <p>Error: {error}</p>;

    const createListItems = (graveyardPlants) =>
        graveyardPlants.map(plant =>
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
        <div className='grid graveyard'>
            {createListItems(graveyardPlants)}
        </div>
    );
}