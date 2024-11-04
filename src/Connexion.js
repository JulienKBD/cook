import './css/Connexion.css';
import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import getGoogleOAuthURL from './utils/getGoogleUrl';

export function Connexion() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const data = {
            email,
            password
        };

        try {
            const response = await fetch("http://localhost:3001/connexion", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!result.token) {
                setError(result.msg);
            } else {
                window.localStorage.setItem('token', result.token);
                console.log('Success:', result.token);
                navigate('/');
                window.location.reload();
            }
        } catch (error) {
            console.error('Error:', error);
            setError("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="connexion-page">
            <h2>Connexion</h2>
            <h5>Accéder gratuitement à de nombreux avantages sur Cook avec un seul compte.</h5>
            {error && <p className="error-message">{error}</p>}
            <ul>
                <li><Link to="/inscription" className='switch_button'>Je n'ai pas de compte, je m'inscris.</Link></li>
            </ul>

            <div className='Google_button'>
                <svg xmlns="https://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 40 48" aria-hidden="true" jsname="jjf7Ff"><path fill="#4285F4" d="M39.2 24.45c0-1.55-.16-3.04-.43-4.45H20v8h10.73c-.45 2.53-1.86 4.68-4 6.11v5.05h6.5c3.78-3.48 5.97-8.62 5.97-14.71z"></path><path fill="#34A853" d="M20 44c5.4 0 9.92-1.79 13.24-4.84l-6.5-5.05C24.95 35.3 22.67 36 20 36c-5.19 0-9.59-3.51-11.15-8.23h-6.7v5.2C5.43 39.51 12.18 44 20 44z"></path><path fill="#FABB05" d="M8.85 27.77c-.4-1.19-.62-2.46-.62-3.77s.22-2.58.62-3.77v-5.2h-6.7C.78 17.73 0 20.77 0 24s.78 6.27 2.14 8.97l6.71-5.2z"></path><path fill="#E94235" d="M20 12c2.93 0 5.55 1.01 7.62 2.98l5.76-5.76C29.92 5.98 25.39 4 20 4 12.18 4 5.43 8.49 2.14 15.03l6.7 5.2C10.41 15.51 14.81 12 20 12z"></path></svg>
                <a href={getGoogleOAuthURL()}>Se connecter avec Google</a>
            </div>

            <h5>ou</h5>

            <form onSubmit={handleLogin}>
                <div>
                    <label>Email :</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Votre email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Mot de passe :</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Votre mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}

export function Inscription() {
    const [firstname, setFirstname] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        const data = {
            firstname,
            name,
            email,
            password
        };

        try {
            const response = await fetch('http://localhost:3001/inscription', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!result.token) {
                showError(result.msg);
            } else {
                console.log('Success:', result.token);
                navigate('/');
                window.location.reload();
            }
        } catch (error) {
            console.error('Error:', error);
            showError("An error occurred. Please try again later.");
        }
    };

    const showError = (error) => {
        setError('Error: ' + error);
        setTimeout(() => {
            setError('');
        }, 6000);
    };

    return (
        <div className="connexion-page">
            <h2>Inscription</h2>
            {error && <p className="error-message">{error}</p>}
            <ul>
                <li><Link to="/connexion" className='switch_button'>J'ai déjà un compte, je me connecte.</Link></li>
            </ul>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Nom :</label>
                    <input
                        type="name"
                        id="name"
                        placeholder="Votre nom"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Prénom :</label>
                    <input
                        type="firstname"
                        id="firstname"
                        placeholder="Votre prénom"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email :</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Votre email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Mot de passe :</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Votre mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
}
