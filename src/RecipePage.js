import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StarRating from './StarRating';
import './css/RecipePage.css';
import CommentSection from './CommentSection';
import RecipeDetails from './RecipeDetails';

function RecipePage() {
    const { id } = useParams();
    const [recipeDetails, setRecipeDetails] = useState(null);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3001/recipe/${id}`);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                const data = await response.json();
                setRecipeDetails(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des détails de la recette :', error);
            }
        };

        fetchRecipeDetails();
    }, [id]);

    if (!recipeDetails) {
        return <p>Chargement des détails de la recette...</p>;
    }

    return (
        <div className="RecipePage">
            <h1>{recipeDetails.title}</h1>
            <img src={recipeDetails.image_url} alt={recipeDetails.title} className="recipe-image" />
            <p>{recipeDetails.description}</p>

            <h3>_____________________________________________________________________________</h3>
            <RecipeDetails recipeDetails={recipeDetails} />
            <h3>_____________________________________________________________________________</h3>

            <section className="commentaires">
                <h2>Donnez-nous votre avis !</h2>
                <div className="rating">
                    <StarRating onRatingChange={(value) => setRating(value)} />
                    <p>|</p>
                    <p>Comment était la recette ?</p>
                </div>

                <p>Note donnée : {rating}/5</p>

                <CommentSection recipeId={id}/>
            </section>
        </div>
    );
}

export default RecipePage;
