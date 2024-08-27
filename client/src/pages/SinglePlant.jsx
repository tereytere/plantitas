import React, { useState, useRef, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import useFetchPlantData from '../hooks/useFetchPlantData';
import { decodeToken } from '../utils/authUtils';

export default function SinglePlant() {
    const { plantId } = useParams();
    const { plant, error } = useFetchPlantData(plantId);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const formRef = useRef(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (plant) {
            setName(plant.name || '');
            setDescription(plant.description || '');
            setImage(plant.image || '');
        }
    }, [plant]);

    useEffect(() => {
        const checkRole = () => {
            try {
                const token = localStorage.getItem('token');
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

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        const decodedToken = decodeToken(token);
        if (!decodedToken) {
            throw new Error('Invalid token');
        }

        if (!name || !description || !image) {
            setMessage("Por favor, completa todos los campos.");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("image", image);
        try {
            const response = await fetch(`http://localhost:5000/plant/${plantId}`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(`${data.message}`);
                navigate('/greenhouse');

                setName('');
                setDescription('');
                setImage(null);
                if (formRef.current) {
                    formRef.current.reset();
                }
            } else {
                setMessage(`Error en la actualización: ${data.message}`);
            }
        } catch (error) {
            setMessage("Error al realizar la solicitud: " + error.message);
            console.error('Error en la actualización', error);
        }
    };

    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <h1 className='flex'>{name}</h1>
            <div className="flex">
                <div className="component login">
                    <Form ref={formRef} onSubmit={handleUpdate}>
                        <Form.Group className="mb-3">
                            <Form.Label className="labels" htmlFor="name">Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                className="text input"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="labels" htmlFor="description">Descripción</Form.Label>
                            <Form.Control
                                type="text"
                                className="text input"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="labels" htmlFor="image">Imagen</Form.Label>
                            {image && <img src={typeof image === 'string' ? image : URL.createObjectURL(image)} alt={name} />}
                            <Form.Control
                                type="file"
                                className="text input"
                                name="image"
                                onChange={handleFileChange}
                                accept="image/*"
                                required
                            />
                        </Form.Group>
                        <p>{message}</p>
                        <div className="flex">
                            <Button variant="primary" type="submit">Actualizar</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
}
