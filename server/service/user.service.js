const qs = require('qs');
const pool = require('../config/db').promise();
require('dotenv').config();

async function getGoogleOAuthTokens({ code }) {
    const url = 'https://oauth2.googleapis.com/token';
    const values = {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code"
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: qs.stringify(values),
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors de la requête Google OAuth Tokens:', error);
        throw new Error(error.message);
    }
}

async function getGoogleUser({ id_token, access_token }) {
    try {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
            headers: {
                "Authorization": `Bearer ${id_token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors de la requête Google User:', error);
        throw new Error(error.message);
    }
}

async function findAndUpdateUser(query, update, options = {}) {
    try {
        const [field, value] = Object.entries(query)[0];

        if (!field || value === undefined) {
            throw new Error("Invalid query structure");
        }

        const updateFields = Object.keys(update)
            .map(key => `${key} = ?`)
            .join(', ');

        const sqlUpdate = `UPDATE googleUser SET ${updateFields} WHERE ${field} = ?`;

        const [result] = await pool.query(sqlUpdate, [...Object.values(update), value]);

        if (!result || typeof result.affectedRows === 'undefined') {
            const resultType = Object.prototype.toString.call(result);
            console.error("Unexpected result format. Type of result:", resultType);
            throw new Error("Unexpected result format");
        }

        if (result.affectedRows === 0 && options.upsert) {
            const fields = Object.keys(update).join(', ');
            const placeholders = Object.keys(update).map(() => '?').join(', ');
            const sqlInsert = `INSERT INTO googleUser (${fields}) VALUES (${placeholders})`;

            await pool.execute(sqlInsert, Object.values(update));

            const [newUserResult] = await pool.execute(`SELECT * FROM googleUser WHERE ${field} = ?`, [value]);
            return newUserResult[0];
        }

        if (options.new) {
            const [updatedUserResult] = await pool.execute(`SELECT * FROM googleUser WHERE ${field} = ?`, [value]);
            return updatedUserResult[0];
        }

        return true;
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
        throw error;
    }
}

module.exports = {
    getGoogleOAuthTokens,
    getGoogleUser,
    findAndUpdateUser
};
