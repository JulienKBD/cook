import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import {useNavigate} from 'react-router-dom';
import './css/SettingsPage.css';

const SettingsPage = () => {
    const [firstname, setFirstName] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
        const decodedToken = jwtDecode(token);
        setFirstName(decodedToken.firstname);
        setName(decodedToken.name);
        setEmail(decodedToken.email);
        }
    }, []);

    const handleSaveChanges = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;

            const updatedData = {
                firstname,
                name,
                email,
                password,
            };

            const response = await fetch(`http://localhost:3001/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            alert('Modifications enregistrées avec succès !\nReconnectez-vous.');
            localStorage.removeItem('token');
            navigate('/');
            window.location.reload();
        } catch (error) {
            console.error('Erreur lors de la mise à jour des informations utilisateur:', error);
            alert('Une erreur est survenue lors de l\'enregistrement des modifications.');
        }
    };

    const handleDeleteAccount = async () => {
        const token = localStorage.getItem('token');

        if (!token) return;

        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;

            const response = await fetch(`http://localhost:3001/user/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            alert('Compte supprimé.');
            localStorage.removeItem('token');
            navigate('/');
            window.location.reload();
        } catch (error) {
            console.error('Erreur lors de la suppression du compte:', error);
            alert('Une erreur est survenue lors de la suppression de votre compte.');
        }
    };

    return (
        <div className="settings-page">
            <h2>Paramètres du compte</h2>
            <form onSubmit={handleSaveChanges} className="settings-form">
                <div className="form-group">
                    <label htmlFor="firstname">Prénom</label>
                    <input
                        type="text"
                        id="firstname"
                        value={firstname}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Nom</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="save-button" onClick={handleSaveChanges}>
                    Enregistrer les modifications
                </button>
            </form>

            <button className="delete-account-button" onClick={handleDeleteAccount}>
                Supprimer le compte
            </button>
        </div>
    );
};

export default SettingsPage;
