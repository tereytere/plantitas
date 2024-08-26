import React, { useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    const formRef = useRef(null);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Error en Login');
            }

            const data = await response.json();
            login(data.token);
            navigate('/house');

            setEmail('');
            setPassword('');

            if (formRef.current) {
                formRef.current.reset();
            }
        } catch (error) {
            console.error('Error en Login', error);
        }
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <>
            <h1 className='flex'>Login</h1>
            <div className="flex">
                <div className="component login">
                    <Form ref={formRef} onSubmit={handleLogin}>
                        <Form.Group className="mb-3">
                            <Form.Label className="labels" htmlFor="email">Email</Form.Label>
                            <Form.Control
                                type="text"
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
                        <div className="flex">
                            <Button variant="success" type="submit">Login</Button>
                        </div>
                    </Form>
                </div>
            </div>
            <div className='claim'>
                <p>¿Todavía no tienes tu casita con plantas? <Button variant="outline-primary" onClick={handleRegister}>Regístrate</Button></p>
            </div>
        </>
    );
}

export default Login;
