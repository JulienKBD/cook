import './css/App.css';
import { useEffect, useState } from 'react';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import Home from './Home';
import { jwtDecode } from 'jwt-decode';
import { Connexion, Inscription } from './Connexion';
import RecipePage from './RecipePage';
import SettingsPage from './SettingsPage';

function App(req, res) {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [userFirstName, setUserFirstName] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userPicture, setPicture] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = jwtDecode(token);
            setIsLoggedIn(true);
            setUserFirstName(decodedToken.firstname);
        }

        const getAuthStatus = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/sessions/auth-status', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    const result = await response.json();

                    console.log('user:', result);

                    if (result.isAuthenticated) {
                        setIsLoggedIn(true);
                        setUserFirstName(result.name);
                        if (result.picture) {
                            setPicture(result.picture);
                        }
                    }
                }
            } catch (error) {
                console.log('Error getAuthStatus():', error);
            }
        };

        getAuthStatus();
    }, []);

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:3001/api/sessions/logout', {
                method: 'POST',
                credentials: 'include',
            });
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            setUserFirstName('');
            setPicture('');
            window.location.reload();
        } catch (error) {
            console.log('Error during logout:', error);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="App">
            <header>
                <nav className="navbar">
                    <div className="container">
                        <Link to="/" className="logo">Cook</Link>
                        {(location.pathname !== '/connexion' && location.pathname !== '/inscription') && (
                            <ul className="nav-links">
                                <li>
                                    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
                                        <input
                                            type="text"
                                            placeholder="Trouver une recette"
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                            className="search-input"
                                        />
                                        <button type="submit" className="search-button">Chercher</button>
                                    </form>
                                </li>
                                {!isLoggedIn && (
                                    <li id="loginButton"><Link to="/connexion">Connexion</Link></li>
                                )}
                            </ul>
                        )}

                        {isLoggedIn && (
                            <ul className="nav-links">
                                <h4 className='hello'>Bonjour {userFirstName} !</h4>
                                <li id="userAvatar" onClick={toggleMenu}>
                                    <span className='avatarLogo'>
                                        {userPicture ? (
                                            <img src={userPicture} alt="User Avatar" className="user-avatar" />
                                        ) : ('👤')}
                                    </span>
                                    {isMenuOpen && (
                                        <ul className="dropdown-menu">
                                            <li><Link to="/settings" className="settingsButton">Paramètres</Link></li>
                                            <li><button className="logoutButton" onClick={handleLogout}>Se déconnecter</button></li>
                                        </ul>
                                    )}
                                </li>
                            </ul>
                        )}
                        {(location.pathname === '/connexion' || location.pathname === '/inscription') && (
                            <ul className="nav-links">
                                <li><Link to="/">Retour au site</Link></li>
                            </ul>
                        )}
                    </div>
                </nav>
            </header>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/connexion" element={<Connexion />} />
                <Route path="/inscription" element={<Inscription />} />
                <Route path="/recipe/:id" element={<RecipePage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Routes>

            <footer>
                <section className="footer-links">
                    <a href="/about">À propos</a>
                    <a href="/privacy-policy">Politique de confidentialité</a>
                    <a href="/terms">Conditions d'utilisation</a>
                    <a href="/faq">FAQ</a>
                </section>

                <section className="contact-info">
                    <p>Email: contact@cook.com</p>
                    <p>Téléphone: +262 693 467 068</p>
                    <p>Adresse: 184 chemin de la Pente Sassy, Saint-André, Réunion</p>
                </section>

                <section className="social-icons">
                    <a href="https://www.facebook.com" target="_blank" rel='noreferrer'><i className="fab fa-facebook-f"></i></a>
                    <a href="https://www.instagram.com" target="_blank" rel='noreferrer'><i className="fab fa-instagram"></i></a>
                    <a href="https://www.pinterest.com" target="_blank" rel='noreferrer'><i className="fab fa-pinterest"></i></a>
                    <a href="https://www.youtube.com" target="_blank" rel='noreferrer'><i className="fab fa-youtube"></i></a>
                    <p>&copy; 2024 Cook. Tous droits réservés.</p>
                </section>
            </footer>
        </div>
    );
}

export default App;
