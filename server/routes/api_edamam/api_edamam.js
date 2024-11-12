const express = require('express');
const router = express.Router();
require('dotenv').config();

router.get('/recipe/macro-nutrients/:query', async (req, res) => {
    try {
        const response = await fetch(
            `https://api.edamam.com/api/nutrition-data?app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEYS}&nutrition-type=cooking&ingr=1%20${req.params.query}`, {
            method: 'Get',
            headers: {
                'accept': 'application/json'
            }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des informations nutritionnelles.' });
    }
});

module.exports = router;
