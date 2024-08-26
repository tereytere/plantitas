import React from 'react';
import PlantNew from '../components/PlantNew';
import useFetchPlants from '../hooks/useFetchPlants';

export default function Greenhouse() {
    const { plants, error } = useFetchPlants();

    if (error) return <p>Error: {error}</p>;

    const listItems = plants.map((plant, index) => (
        <PlantNew
            key={index}
            idP={plant.id}
            image={plant.image}
            name={plant.name}
            description={plant.description}
        />
    ));

    return (
        <div className='grid'>{listItems}</div>
    );
}