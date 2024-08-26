import React, { useContext } from 'react';
import NavBar from './NavBar';
import { AuthContext } from '../context/AuthContext';
import Buttons from './Buttons';
import useFetchUserData from '../hooks/useFetchUserData';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const { user: fetchedUser, error } = useFetchUserData();

    const handleUserProfile = () => {
        if (fetchedUser) {
            console.log(fetchedUser);
            navigate('/house');
        }
    };

    const handleLogin = () => {
        navigate('/login');
    };

    if (error) {
        console.log(error);
    }

    if (!user) {
        return (
            <header>
                <NavBar />
                <div className='flex headerdiv'>
                    <p>Casita de Tu Alias</p>
                    <img src='https://res.cloudinary.com/dk2lcfwx5/image/upload/v1724322871/users/ltcagpxild7fzreyw7o0.jpg' alt='Tu Nombre' />
                    <Buttons action={handleLogin} variant={'success'} text={'Entrar'} />
                </div>
            </header>
        );
    }

    return (
        <header>
            <NavBar />
            <div className='flex headerdiv'>
                <p>Casita de {fetchedUser ? fetchedUser.username : "Tu Alias"}</p>
                {fetchedUser && fetchedUser.image ? (
                    <img
                        src={fetchedUser.image}
                        alt={fetchedUser.name}
                        onClick={handleUserProfile}
                        style={{ cursor: 'pointer' }}
                    />
                ) : (
                    <img
                        src='https://res.cloudinary.com/dk2lcfwx5/image/upload/v1724322871/users/ltcagpxild7fzreyw7o0.jpg'
                        alt='Tu Nombre'
                        style={{ cursor: 'pointer' }}
                    />
                )}
                <Buttons action={logout} variant={'danger'} text={'Salir'} />
            </div>
        </header>
    );
}
