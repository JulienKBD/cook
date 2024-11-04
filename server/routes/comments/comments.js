const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../../config/db.js').promise();
const router = express.Router();
const {getComments, createComments, putCommentsById, deleteCommentsById} = require('./comments.query.js');

router.get('/comments/:recipeId', async (req, res) => {
    const { recipeId } = req.params;

    try {
        const [results] = await pool.query(getComments, [recipeId]);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des commentaires' });
    }
});

router.post('/comments/:recipeId', async (req, res) => {
    const { recipeId } = req.params;
    const { content, rating } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token non fourni.' });
    }

    const token = authHeader.split(' ')[1];
    let user_id;

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        user_id = decoded.id;
    } catch (err) {
        return res.status(403).json({ error: 'Token invalide ou expiré.' });
    }

    if (!content) {
        return res.status(400).json({ error: 'Le contenu du commentaire est requis.' });
    }

    if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'La note est invalide.' });
    }

    try {
        const newComment = {
            recipe_id: recipeId,
            user_id: user_id,
            content: content,
            rating: rating,
            created_at: new Date(),
        };

        const [result] = await pool.query(createComments, [
            newComment.recipe_id,
            newComment.user_id,
            newComment.content,
            newComment.rating,
            newComment.created_at,
        ]);

        res.status(201).json({ id: result.insertId, ...newComment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur lors de l'ajout du commentaire" });
    }
});

router.put('/comments/:commentId', async (req, res) => {
    const { commentId } = req.params;
    const { content, rating } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token non fourni.' });
    }

    const token = authHeader.split(' ')[1];
    let user_id;

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        user_id = decoded.id;
    } catch (err) {
        return res.status(403).json({ error: 'Token invalide ou expiré.' });
    }

    if (!content) {
        return res.status(400).json({ error: 'Le contenu du commentaire est requis.' });
    }

    if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'La note doit être comprise entre 1 et 5.' });
    }

    try {
        const [existingComment] = await pool.query('SELECT * FROM comments WHERE id = ? AND user_id = ?', [commentId, user_id]);
        if (existingComment.length === 0) {
            return res.status(404).json({ error: 'Commentaire non trouvé ou vous n\'êtes pas autorisé à le modifier.' });
        }

        const updatedComment = {
            content: content,
            rating: rating,
            updated_at: new Date(),
        };

        const [result] = await pool.query(putCommentsById, [
            updatedComment.content,
            updatedComment.rating,
            updatedComment.updated_at,
            commentId,
            user_id,
        ]);

        res.status(200).json({ message: 'Commentaire modifié avec succès', ...updatedComment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur lors de la modification du commentaire" });
    }
});


router.delete('/comments/:commentId', async (req, res) => {
    const {commentId} = req.params;

    pool.query(deleteCommentsById, [commentId], (err, results) => {
        if (err) {
            console.error('Internal server error:', err);
            return res.status(500).json({msg: 'Internal server error'});
        }
        if (results.affectedRows === 0) {
            console.error('Not found');
            return res.status(404).json({msg: 'Not found'});
        }
        console.log(`Successfully deleted record number: ${commentId}`);
        res.status(200).json({msg: `Successfully deleted record number: ${commentId}`});
    });
});

module.exports = router;
