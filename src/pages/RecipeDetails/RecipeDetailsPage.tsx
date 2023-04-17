import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetailsPage = () => {
    const recipeId = useParams()
    
    useEffect(() => {
        const fetchRecipe = async () => {
        try {
          const response = await fetch(`/api/recipes/${recipeId}`);
          const recipe = await response.json();
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecipe();
  }, [recipeId]);

    return(
        <h1>Details</h1>
    )
}

export default RecipeDetailsPage