const express = require('express');
const pool = require('../../config/db.js').promise();
const router = express.Router();
const {getUsers, getUser, putUser, deleteUser} = require('./user.query.js');

router.get('/users', async (req, res) => {
    try {
        const [rows] = await pool.query(getUsers);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Aucun utilisateur.' });
        }

        res.status(200).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur.' });
    }
});

router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const [rows] = await pool.query(getUser, [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Utilisateur non trouvé.' });
        }

        res.status(200).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur.' });
    }
});

router.put('/user/:userId', async (req, res) => {
    const { userId } = req.params;
    const { firstname, name, email, password } = req.body;

    if (!firstname || !name || !email || !password) {
        return res.status(400).json({ error: 'Le prénom, le nom de famille, l\'email et le mdp sont requis.' });
    }

    try {
        const [result] = await pool.query(putUser, [firstname, name, email, userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Utilisateur non trouvé.' });
        }

        res.status(200).json({
            message: 'Utilisateur mis à jour avec succès !',
            userId,
            firstname,
            name,
            email,
            password
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur.' });
    }
});

router.delete('/user/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const [result] = await pool.query(deleteUser, [userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Utilisateur non trouvé.' });
        }

        res.status(200).json({
            message: 'Utilisateur supprimé avec succès !',
            userId
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur.' });
    }
});

module.exports = router;
