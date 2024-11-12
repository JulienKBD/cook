const { getGoogleOAuthTokens, getGoogleUser, findAndUpdateUser } = require('../service/user.service');
const createSession = require('../service/session.service');
const { signJwt } = require('../utils/jwt.utils');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const accessTokenCookieOptions = {
    maxAge: 900000, // 15mins
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "lax",
    secure: false,
};

const refreshTokenCookieOptions = {
    ...accessTokenCookieOptions,
    maxAge: 3.154e10, // 1y
};

async function googleOAuthHandler(req, res) {
    // get the code from qs
    const code = req.query.code;

    if (!code) {
        console.log("Code not found in the query parameters.");
        return res.redirect("http://localhost:3000/connexion");
    }

    try {
        // get the id and access token with the code
        const { id_token, access_token } = await getGoogleOAuthTokens({ code });

        // get user with tokens
        const googleUser = await getGoogleUser({ id_token, access_token });
        console.log({googleUser});

        if (!googleUser.verified_email) {
            return res.status(403).send("Google account is not verified");
        }

        // upsert the user
        const user = await findAndUpdateUser(
            { email: googleUser.email },
            { email: googleUser.email, name: googleUser.name, picture: googleUser.picture },
            { upsert: true, new: true }
        );

        const session = createSession(user.id, req.get("user-agent") || "");

        const accessToken = signJwt(
            { ...user, session: session.id },
            { expiresIn:  process.env.ACCESS_TOKEN_TTL } // 15mins
        );

        const refreshToken = signJwt(
            { ...user, session: session.id },
            { expiresIn:  process.env.REFRESH_TOKEN_TTL } // 1y
        );

        res.cookie("accessToken", accessToken, accessTokenCookieOptions);
        res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
        res.redirect('http://localhost:3000/');
    } catch (error) {
        console.log('Failed to authorize Google user:', error);
        return res.redirect("http://localhost:3000/connexion");
    }
}

async function getAuthStatus(req, res) {
    const accessToken = req.cookies['accessToken'];

    if (!accessToken) {
        return res.status(200).json({ isAuthenticated: false });
    }

    jwt.verify(accessToken, process.env.PUBLIC_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ isAuthenticated: false });
        }

        res.status(200).json({
            isAuthenticated: true,
            name: user.name,
            picture: user.picture
        });
    });
};

async function deleteSession(req, res) {
    try {
        res.clearCookie('accessToken', {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
        });

        // Supprimer la session

        res.status(200).json({ message: 'Déconnexion réussie' });
    } catch (error) {
        console.log('Failed to clear cookie:', error);
        return res.status(500).json({msg: 'Internal server error'});
    }
};

module.exports = {
    googleOAuthHandler,
    getAuthStatus,
    deleteSession
};