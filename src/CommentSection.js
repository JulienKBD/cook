import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import './css/CommentSection.css';

function CommentSection({ recipeId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [rating, setRating] = useState(5);
    const [userId, setUserId] = useState(null);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [updatedContent, setUpdatedContent] = useState('');
    const [updatedRating, setUpdatedRating] = useState(5);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setUserId(decoded.id);
        }

        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:3001/comments/${recipeId}`);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                const data = await response.json();
                setComments(data);
            } catch (error) {
                console.error('Erreur lors de la requête:', error);
            }
        };

        fetchComments();
    }, [recipeId]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (newComment.trim() === '' || userId === null) return;

        const token = localStorage.getItem('token');

        const commentData = {
            recipe_id: recipeId,
            user_id: userId,
            content: newComment,
            rating: rating,
        };

        try {
            const response = await fetch(`http://localhost:3001/comments/${recipeId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(commentData),
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const newCommentResponse = await response.json();
            setComments((prevComments) => [...prevComments, newCommentResponse]);
            setNewComment('');
            setRating(5);
        } catch (error) {
            console.error('Erreur lors de l\'ajout du commentaire:', error);
        }
    };

    const handleEditComment = async (commentId) => {
        const token = localStorage.getItem('token');
        if (!token || updatedContent.trim() === '') return;

        try {
            const response = await fetch(`http://localhost:3001/comments/${commentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    content: updatedContent,
                    rating: updatedRating
                })
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const updatedComment = await response.json();

            setComments(prevComments =>
                prevComments.map(comment =>
                    comment.id === commentId ? updatedComment : comment
                )
            );
            setEditingCommentId(null);
        } catch (error) {
            console.error('Erreur lors de la modification du commentaire:', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await fetch(`http://localhost:3001/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
        } catch (error) {
            console.error('Erreur lors de la suppression du commentaire:', error);
        }
    };

    const startEditingComment = (comment) => {
        setEditingCommentId(comment.id);
        setUpdatedContent(comment.content);
        setUpdatedRating(comment.rating);
    };

    const cancelEditing = () => {
        setEditingCommentId(null);
        setUpdatedContent('');
        setUpdatedRating(5);
    };

    return (
        <div className="comment-section">
            <h3>Commentaires</h3>

            <form className='comments-form' onSubmit={handleCommentSubmit}>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Écrivez votre commentaire ici..."
                    rows="6"
                    required
                ></textarea>
                <button className='btn-send' type="submit">Envoyer mon avis</button>
            </form>

            <div className="comment-list">
                {comments.length > 0 ? (
                    comments.map(comment => (
                        <div key={comment.id} className="comment-item">
                            <div className="comment-header">
                                <p className="comment-author"><strong>{comment.firstname}</strong></p>
                                <p className="comment-rating">Note : {comment.rating}/5</p>
                            </div>

                            <div className="comment-body">
                                {editingCommentId === comment.id ? (
                                    <div>
                                        <textarea
                                            value={updatedContent}
                                            onChange={(e) => setUpdatedContent(e.target.value)}
                                        ></textarea>
                                        <input
                                            type="number"
                                            value={updatedRating}
                                            min="1"
                                            max="5"
                                            onChange={(e) => setUpdatedRating(e.target.value)}
                                        />
                                        <button onClick={() => handleEditComment(comment.id)}>
                                            Sauvegarder
                                        </button>
                                        <button onClick={cancelEditing}>Annuler</button>
                                    </div>
                                ) : (
                                    <p>{comment.content}</p>
                                )}
                            </div>

                            <div className="comment-footer">
                                <small className="comment-date">
                                    {new Date(comment.created_at).toLocaleDateString()} à {new Date(comment.created_at).toLocaleTimeString()}
                                </small>

                                <div className="comment-actions">
                                    {editingCommentId === comment.id ? null : (
                                        <button onClick={() => startEditingComment(comment)} className="btn-edit">
                                            Modifier
                                        </button>
                                    )}
                                    <button onClick={() => handleDeleteComment(comment.id)} className="btn-delete">Supprimer</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Soyez le premier à commenter !</p>
                )}
            </div>
        </div>
    );
}

export default CommentSection;
