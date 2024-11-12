const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../../config/db.js').promise();
const router = express.Router();
const {createUser, getUserByEmail} = require('./auth.query.js');

router.post('/inscription', async (req, res) => {
    const {email, password, name, firstname} = req.body;

    if (!email || !password || !name || !firstname)
        return res.status(400).json({msg: 'Bad parameter'});

    try {
        const hash = await bcrypt.hash(password, 10);
        await pool.query(createUser, [email, hash, name, firstname]);
        const [results] = await pool.query(getUserByEmail, [email]);

        const user = results[0];
        const token = jwt.sign({id: user.id, firstname: user.firstname}, process.env.SECRET);

        console.log('New user:', user);
        console.log('Token of the newly registered user:', token);
        return res.status(201).json({token: token});
    } catch (err) {
        console.error('Internal server error:', err);
        if (err.code === 'ER_DUP_ENTRY')
            return res.status(409).json({msg: 'Account already exists'});
        return res.status(500).json({msg: 'Internal server error'});
    }
});

router.post('/connexion', async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password)
        return res.status(400).json({msg: 'Bad parameter'});

    try {
        const [results] = await pool.query(getUserByEmail, [email]);

        if (results.length === 0) {
            console.log('Not found');
            return res.status(404).json({msg: 'Not found'});
        }

        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            const token = jwt.sign({id: user.id, firstname: user.firstname}, process.env.SECRET);
            console.log('Token generated:', token);
            return res.status(200).json({token: token});
        } else {
            console.log('Invalid credentials');
            return res.status(401).json({msg: 'Invalid credentials'});
        }
    } catch (err) {
        console.error('Internal server error:', err);
        return res.status(500).json({msg: 'Internal server error'});
    }
});

module.exports = router;
