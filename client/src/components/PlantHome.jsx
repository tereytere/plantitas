import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

export default function PlantHome({ idP, image, name, description, size }) {
    const [status, setStatus] = useState('');

    const handleStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const id = decodedToken.id;

            const response = await fetch(`http://localhost:5000/user/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ plants: { id: idP, status } })
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el estado de la planta');
            }

            console.log('Estado de la planta actualizado con éxito');
        } catch (error) {
            console.error('Error al actualizar el estado de la planta', error);
        }
    };

    return (
        <Card className={size} id={idP}>
            <Card.Img variant="top" src={image} alt={name} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Form.Select name='status' value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">¿Cómo se encuentra tu planta?</option>
                    <option value="good">Bien</option>
                    <option value="plague">Enferma</option>
                    <option value="dead">Muerta</option>
                </Form.Select>
                <div className="buttons">
                    <Button variant="success" onClick={handleStatus}>Actualizar</Button>
                </div>
            </Card.Body>
        </Card>
    );
}
