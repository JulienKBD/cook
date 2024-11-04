const express = require('express');
const pool = require('../../config/db.js').promise();
const router = express.Router();
const {getRecipe, createRecipe, putRecipe} = require('./recipes.query.js');

router.get('/recipe/:tittleId', async (req, res) => {
    const { tittleId } = req.params;

    try {
        const [rows] = await pool.query(getRecipe, [tittleId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Recette non trouvée.' });
        }

        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération de la recette.' });
    }
});

router.post('/recipe', async (req, res) => {
    const { title, description, image_url } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: 'Le titre et la description sont requis.' });
    }

    try {
        const [result] = await pool.query(createRecipe, [title, description, image_url || null]);

        res.status(201).json({
            message: 'Recette ajoutée avec succès !',
            recipeId: result.insertId,
            title,
            description,
            image_url
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de l\'ajout de la recette.' });
    }
});

router.put('/recipe/:recipeId', async (req, res) => {
    const { title, description, image_url } = req.body;
    const { recipeId } = req.params;

    if (!title || !description) {
        return res.status(400).json({ error: 'Le titre et la description sont requis.' });
    }

    try {
        const [result] = await pool.query(putRecipe, [title, description, image_url || null, recipeId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Recette non trouvée.' });
        }

        res.status(200).json({
            message: 'Recette modifiée avec succès !',
            recipeId,
            title,
            description,
            image_url
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la modification de la recette.' });
    }
});

router.delete('/recipe/:recipeId', async (req, res) => {
    const { recipeId } = req.params;

    try {
        const [result] = await pool.query(deleteRecipe, [recipeId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Recette non trouvée.' });
        }

        res.status(200).json({
            message: 'Recette supprimée avec succès !',
            recipeId
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la suppression de la recette.' });
    }
});

module.exports = router;
