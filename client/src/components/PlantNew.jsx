import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { getToken, decodeToken, fetchWithAuth } from '../utils/authUtils';

export default function PlantNew({ idP, image, name, description }) {
    const [size, setSize] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkRole = async () => {
            try {
                const token = getToken();
                if (!token) return;

                const decodedToken = decodeToken(token);
                if (decodedToken && decodedToken.role === 'admin') {
                    setIsAdmin(true);
                }
            } catch (error) {
                console.error('Error checking user role:', error);
            }
        };

        checkRole();
    }, []);

    const handleAction = async (status) => {
        const token = getToken();
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const decodedToken = decodeToken(token);
            if (!decodedToken) {
                throw new Error('Invalid token');
            }
            const userId = decodedToken.id;

            await fetchWithAuth(`http://localhost:5000/user/${userId}/plant`, 'PUT', {
                plants: { id: idP, status, size }
            });


            console.log(`Planta añadida con éxito a la lista de ${decodedToken.email}`);
        } catch (error) {
            console.error('Error al añadir la planta', error);
        }
    };

    const handleAdd = () => handleAction('good');
    const handleWish = () => handleAction('wish');

    const handleEdit = () => {
        navigate(`/plant/${idP}`);
    };

    return (
        <Card className='good mini' id={idP}>
            <Card.Img variant="top" src={image} alt={name} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Form.Select name="size" value={size} onChange={(e) => setSize(e.target.value)}>
                    <option value="">Elige un tamaño</option>
                    <option value="mini">Mini</option>
                    <option value="medium">Mediana</option>
                    <option value="maxi">Grande</option>
                </Form.Select>
                <div className="flex">
                    <Button variant="outline-success" onClick={handleAdd}>Adoptar</Button>
                    <Button variant="outline-info" onClick={handleWish}>La quiero</Button>
                    {isAdmin && (
                        <Button variant="outline-warning" onClick={handleEdit}>Editar</Button>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}
