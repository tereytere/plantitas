import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
    const { user } = useAuth();

    return (
        <Navbar className="navbar" collapseOnSelect expand="lg">
            <Navbar.Brand href="/">
                <img src="logo.png" width="65" height="65" alt="PlantitasApp" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav>
                    <Nav.Link href="/">Inicio</Nav.Link>
                    <Nav.Link href="/greenhouse">Invernadero</Nav.Link>

                    {user && user.role === 'user' && (
                        <>
                            <Nav.Link href="/house">Casita</Nav.Link>
                            <Nav.Link href="/houseplants">Plantitas</Nav.Link>
                            <Nav.Link href="/nursery">UCI</Nav.Link>
                            <Nav.Link href="/graveyard">Cementerio</Nav.Link>
                            <Nav.Link href="/wishlist">Ojalá</Nav.Link>
                        </>
                    )}

                    {user && user.role === 'admin' && (
                        <>
                            <Nav.Link href="/plant">Añadir</Nav.Link>
                            <Nav.Link href="/users">Usuarios</Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
