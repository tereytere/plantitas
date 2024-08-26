import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { fetchWithAuth } from '../utils/authUtils';

export default function PlantForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');

    const formRef = useRef(null);

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleChange = (setter, event) => {
        setter(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("image", image);

        try {
            const response = await fetchWithAuth("http://localhost:5000/addplant", "POST", formData);

            if (response.message) {
                setMessage(response.message);
                setName('');
                setDescription('');
                setImage(null);

                if (formRef.current) {
                    formRef.current.reset();
                }
            } else {
                setMessage('Error en el registro');
            }
        } catch (error) {
            setMessage("Error al realizar la solicitud: " + error.message);
            console.error('Error', error);
        }
    };

    return (
        <div className="flex">
            <div className="component formulario">
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className="labels" htmlFor="name">Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            className="text input"
                            name="name"
                            value={name}
                            onChange={(e) => handleChange(setName, e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="labels" htmlFor="description">Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            className="textarea input"
                            name="description"
                            value={description}
                            onChange={(e) => handleChange(setDescription, e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="labels" htmlFor="image">Imagen</Form.Label>
                        <Form.Control
                            type="file"
                            name="image"
                            className="file"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </Form.Group>
                    <div className="buttons">
                        <Button variant="success" type="submit">Añadir</Button>
                    </div>
                </Form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}
