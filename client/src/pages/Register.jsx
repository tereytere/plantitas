import React, { useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();
    const formRef = useRef(null);
    const [message, setMessage] = useState("");

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        if (!name || !surname || !username || !email || !password || !image) {
            setMessage("Por favor, completa todos los campos y selecciona una imagen.");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("surname", surname);
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("image", image);

        try {
            const response = await fetch("http://localhost:5000/add", {
                method: "POST",
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(`${data.message}`);
                login(data.token);
                navigate('/house');

                setName('');
                setSurname('');
                setUsername('');
                setEmail('');
                setPassword('');
                setImage(null);
                if (formRef.current) {
                    formRef.current.reset();
                }
            } else {
                setMessage(`Error en el registro: ${data.message}`);
            }
        } catch (error) {
            setMessage("Error al realizar la solicitud: " + error.message);
            console.error('Error en Registro', error);
        }
    };

    return (
        <>
            <h1 className='flex'>Registro</h1>
            <div className="flex">
                <div className="component login">
                    <Form ref={formRef} onSubmit={handleRegister}>
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
                            <Form.Label className="labels" htmlFor="surname">Apellidos</Form.Label>
                            <Form.Control
                                type="text"
                                className="text input"
                                name="surname"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="labels" htmlFor="username">Alias</Form.Label>
                            <Form.Control
                                type="text"
                                className="text input"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="labels" htmlFor="email">Email</Form.Label>
                            <Form.Control
                                type="email"
                                className="text input"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="labels" htmlFor="password">Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                className="text input"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="labels" htmlFor="image">Imagen</Form.Label>
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
                            <Button variant="success" type="submit">Register</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
}