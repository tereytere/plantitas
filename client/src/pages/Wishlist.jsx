import React from 'react';
import useFetchAndFilterPlants from '../hooks/useFetchAndFilterPlants';
import PlantHome from '../components/PlantHome';

export default function Wishlist() {
    const {
        wishlistPlants,
        error
    } = useFetchAndFilterPlants();

    if (error) return <p>Error: {error}</p>;

    const createListItems = (wishlistPlants) =>
        wishlistPlants.map(plant =>
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
        <div className='grid wishlist'>
            {createListItems(wishlistPlants)}
        </div>
    );
}