import React from 'react';
import useFetchUsers from '../hooks/useFetchUsers';
import Buttons from '../components/Buttons';

export default function UserList() {
    const { users, error } = useFetchUsers();

    if (error) return <p>Error: {error}</p>;

    const handleModify = () => { };

    const handleDelete = () => { };


    const listItems = users.map(user => (
        <li key={user.id}>{user.username} <Buttons action={handleModify} variant={'warning'} text={'Modificar'} /> <Buttons action={handleDelete} variant={'danger'} text={'Borrar'} /></li>
    ));

    return (
        <ul className='userlist'>{listItems}</ul>
    );
}