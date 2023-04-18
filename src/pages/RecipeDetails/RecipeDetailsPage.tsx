import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { RecipeDetails } from '../../utilities/type-declaration';
import type { UserState } from '../../utilities/type-declaration';

// const getLabelText = (rating: number) => {
//   return `${rating} Star${rating !== 1 ? 's' : ''}, ${rating}`;
// }

const RecipeDetailsPage = ( {user}:{user:UserState} ) => {
  const [recipe, setRecipe] = useState<RecipeDetails>({
    owner: "",
    recipe: "",
    cuisine: "",
    ingredients: [{ name: '', quantity: '' }],
    instructions: [],
    views: 0,
  });
  const [rating, setRating] = useState<number|null>(null);
  const [hover, setHover] = useState(-1);
  const [averageRating, setAverageRating] = useState<number|null>(null);

  const  { id }  = useParams()
  
  useEffect(() => {
        const fetchRecipe = async () => {
        try {
          const response = await fetch(`/api/recipes/${id}`);
          const res = await response.json();
          setRecipe(res.recipe)
          setAverageRating(res.averageRating)
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleRating = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try{
      const response = await fetch(`/api/recipes/${id}/rating`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( {rating, user} ), 
      });
      const averageRating = await response.json();
      if (response.ok) {
        setAverageRating(averageRating)
      } else {
        throw new Error("Failed to submit rating")
      }
    } catch (error) {
      console.error(error)
    }
  }


    return(
      <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
        {recipe?.recipe} <br/>
        {recipe?.cuisine} <br/>
        {recipe?.description} <br/>
        <ul>
        {recipe?.ingredients?.map((ingredient, index) => (
          <li key={index}>
            {ingredient.quantity} {ingredient.measurement} {ingredient.name}
            </li>
        )
        )}
        </ul>
        <ul>
        {recipe?.instructions?.map((instruction, index) => (
          <li key={index}>
            Step {index+1}: {instruction}
            </li>
        )
        )}
        </ul>
        Views: {recipe?.views} <br/>
        Average Rating: {averageRating} <br/>
        <Rating
        name="rating"
        value={rating}
        precision={0.5}
        //getLabelText={getLabelText}
        onChange={(event, newRating) => {
          setRating(newRating);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      <Box sx={{ ml: 2 }}>{hover !== -1 ? hover : rating}</Box>
      <button onClick={(event)=>handleRating(event)}>
        Submit Rating
      </button>
        </Box>
    )
}

export default RecipeDetailsPage