import React from 'react';
import useFetchAndFilterPlants from '../hooks/useFetchAndFilterPlants';
import Carousel from 'react-bootstrap/Carousel';
import Buttons from '../components/Buttons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function House() {
    console.log('House component mounted');
    const { loading } = useAuth();
    const navigate = useNavigate();
    const {
        housePlants,
        nurseryPlants,
        graveyardPlants,
        wishlistPlants,
        error
    } = useFetchAndFilterPlants();

    console.log('housePlants:', housePlants);
    console.log('wishlistPlants:', wishlistPlants);
    console.log('Error:', error);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const createListItems = (filteredPlants) =>
        filteredPlants.map(plant =>
            <Carousel.Item key={plant.id}>
                <img src={plant.image} alt={plant.name} />
                <Carousel.Caption>
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                </Carousel.Caption>
            </Carousel.Item>
        );

    const handleHouse = () => {
        navigate('/houseplants');
    }

    const handleWishlist = () => {
        navigate('/wishlist');
    }

    const handleNursery = () => {
        navigate('/nursery');
    }

    const handleGraveyard = () => {
        navigate('/graveyard');
    }


    return (
        <>
            <div className='flex'>
                <div className='house component'>
                    <Carousel>
                        {createListItems(housePlants)}
                    </Carousel>
                    <div className='flex'>
                        <Buttons onClick={handleHouse} variant='info' text='Ver todas' />
                    </div>
                </div>
                <div className='wishlist component'>
                    <Carousel>
                        {createListItems(wishlistPlants)}
                    </Carousel>
                    <div className='flex'>
                        <Buttons onClick={handleWishlist} variant='info' text='Ver todas' />
                    </div>
                </div>
            </div>
            <div className='flex'>
                <div className='nursery component'>
                    <Carousel>
                        {createListItems(nurseryPlants)}
                    </Carousel>
                    <div className='flex'>
                        <Buttons onClick={handleNursery} variant='info' text='Ver todas' />
                    </div>
                </div>
                <div className='graveyard component'>
                    <Carousel>
                        {createListItems(graveyardPlants)}
                    </Carousel>
                    <div className='flex'>
                        <Buttons onClick={handleGraveyard} variant='info' text='Ver todas' />
                    </div>
                </div>
            </div>
        </>
    );
}