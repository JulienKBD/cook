import React, { useEffect, useState } from 'react';
import './css/RecipeDetails.css';

function RecipeDetails({ recipeDetails }) {
    const [recipeData, setRecipeData] = useState(null);

    const roundToDecimal = (value, decimals) => {
        if (value === undefined || value === null) return "N/A";
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    };

    useEffect(() => {
        async function analyzeRecipe(recipeDetails) {
            try {
                console.log(recipeDetails.tittle);
                console.log(JSON.parse(recipeDetails.ingredients));

                const response = await fetch(
                    `https://api.edamam.com/api/nutrition-details?app_id=9119bf10&app_key=6c7bfd3ec5a5f31ce1108f814286ccef`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            title: recipeDetails.title,
                            ingr: JSON.parse(recipeDetails.ingredients)
                        })
                    }
                );

                const data = await response.json();

                if (data.error) {
                    console.error("Erreur de l'API :", data.error);
                } else {
                    setRecipeData(data);
                    console.log("Valeurs nutritionnelles de la recette :", data);
                }
            } catch (error) {
                console.error("Erreur lors de l'analyse nutritionnelle de la recette :", error);
            }
        }

        analyzeRecipe(recipeDetails);
    }, [recipeDetails]);

    if (!recipeData) return <p>Chargement des données...</p>;

    const {
        calories,
        totalWeight,
        dietLabels,
        healthLabels,
        totalNutrients,
        totalDaily
    } = recipeData;

    return (
        <div className='center-containt'>
            <div className="recipe-details">
                <h2>Détails de la Recette</h2>
                <div className='ingredients'>
                    <h3>Ingrédients</h3>
                    <ul>
                        {JSON.parse(recipeDetails.ingredients).map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>

                <p><strong>Calories :</strong> {roundToDecimal(calories, 0)} kcal</p>
                <p><strong>Poids total :</strong> {roundToDecimal(totalWeight, 0)} g</p>

                <h3>Régime</h3>
                <p>{dietLabels?.join(', ') || "Non spécifié"}</p>

                <h3>Labels de Santé</h3>
                <p>{healthLabels?.join(', ') || "Non spécifié"}</p>

                <h3>Nutriments</h3>
                <ul>
                    <li><strong>Protéines :</strong> {roundToDecimal(totalNutrients?.PROCNT?.quantity, 2)} {totalNutrients?.PROCNT?.unit ?? ""}</li>
                    <li><strong>Glucides :</strong> {roundToDecimal(totalNutrients?.CHOCDF?.quantity, 2)} {totalNutrients?.CHOCDF?.unit ?? ""}</li>
                    <li><strong>Lipides :</strong> {roundToDecimal(totalNutrients?.FAT?.quantity, 2)} {totalNutrients?.FAT?.unit ?? ""}</li>
                    <li><strong>Fibres :</strong> {roundToDecimal(totalNutrients?.FIBTG?.quantity, 2)} {totalNutrients?.FIBTG?.unit ?? ""}</li>
                    <li><strong>Sucres :</strong> {roundToDecimal(totalNutrients?.SUGAR?.quantity, 2)} {totalNutrients?.SUGAR?.unit ?? ""}</li>
                    <li><strong>Sodium :</strong> {roundToDecimal(totalNutrients?.NA?.quantity, 2)} {totalNutrients?.NA?.unit ?? ""}</li>
                </ul>

                <h3>Apports Journaliers (%)</h3>
                <ul>
                    <li><strong>Protéines :</strong> {roundToDecimal(totalDaily?.PROCNT?.quantity, 0)}%</li>
                    <li><strong>Glucides :</strong> {roundToDecimal(totalDaily?.CHOCDF?.quantity, 0)}%</li>
                    <li><strong>Lipides :</strong> {roundToDecimal(totalDaily?.FAT?.quantity, 0)}%</li>
                    <li><strong>Fibres :</strong> {roundToDecimal(totalDaily?.FIBTG?.quantity, 0)}%</li>
                    <li><strong>Fer :</strong> {roundToDecimal(totalDaily?.FE?.quantity, 0)}%</li>
                    <li><strong>Sodium :</strong> {roundToDecimal(totalDaily?.NA?.quantity, 0)}%</li>
                </ul>
            </div>
        </div>
    );
}

export default RecipeDetails;
