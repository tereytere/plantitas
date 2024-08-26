import React, { useState, useRef, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useFetchUserData from '../hooks/useFetchUserData';

export default function SingleUser() {
    const { user, error } = useFetchUserData();
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

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setSurname(user.surname || '');
            setUsername(user.username || '');
            setEmail(user.email || '');
            setImage(user.image || '');
        }
    }, [user]);

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();

        if (!name || !surname || !username || !email || !password || !image) {
            setMessage("Por favor, completa todos los campos.");
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
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const id = decodedToken.id;

            const response = await fetch(`http://localhost:5000/user/${id}`, {
                method: "PUT",
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
            <h1 className='flex'>{username}</h1>
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
                            <img src={image} alt={name} />
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
