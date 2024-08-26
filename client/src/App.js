import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoutes from './components/ProtectedRoutes';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Greenhouse from './pages/Greenhouse';
import House from './pages/House';
import HousePlants from './pages/HousePlants';
import Nursery from './pages/Nursery';
import Graveyard from './pages/Graveyard';
import Wishlist from './pages/Wishlist';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import PlantForm from './pages/PlantForm';
import UserList from './pages/UserList';
import Register from './pages/Register';
import SinglePlant from './pages/SinglePlant';
import SingleUser from './pages/SingleUser';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header />
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/greenhouse" element={<Greenhouse />} />

            <Route element={<ProtectedRoutes role="user" />}>
              <Route path="/house" element={<House />} />
              <Route path="/houseplants" element={<HousePlants />} />
              <Route path="/nursery" element={<Nursery />} />
              <Route path="/graveyard" element={<Graveyard />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/user/:id" element={<SingleUser />} />
            </Route>

            <Route element={<ProtectedRoutes role="admin" />}>
              <Route path="/plant" element={<PlantForm />} />
              <Route path="/plant/:id" element={<SinglePlant />} />
              <Route path="/users" element={<UserList />} />
            </Route>

            <Route path="*" element={<NotFound />} />

          </Routes>
          <Footer />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
