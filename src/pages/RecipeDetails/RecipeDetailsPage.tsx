import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import { RecipeDetails } from '../../utilities/type-declaration';
import type { UserState } from '../../utilities/type-declaration';



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
  const [averageRating, setAverageRating] = useState<number|"No Rating">("No Rating");
  const [comment, setComment] = useState("");
  const [reversedComment, setReversedComment] = useState([{
    name: "",
    content: "",
    createdAt: "",
  }])

  const  { id }  = useParams();
  
  useEffect(() => {
        const fetchRecipe = async () => {
        try {
          const response = await fetch(`/api/recipes/${id}`);
          const res = await response.json();
          setRecipe(res.recipe)
          setAverageRating(res.averageRating)
          const reversedArray = res.recipe.comments.reverse()
          setReversedComment(reversedArray)
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

  const handleComment = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try{
      const response = await fetch(`/api/recipes/${id}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( {comment, user} ), 
      });
      const updatedRecipe = await response.json();
      if (response.ok) {
        setRecipe(updatedRecipe)
        const reversedArray = updatedRecipe.comments.reverse()
        setReversedComment(reversedArray)
        setComment("")
      } else {
        throw new Error("Failed to submit comment")
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
      </button> <br/>
      Leave a comment: <br/>
      <TextField 
          margin="normal"
          required
          fullWidth
          autoComplete="off"
          name="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}/> <br/>
      <button onClick={(event)=>handleComment(event)}>
        Submit Comment
      </button> <br/>
      {recipe?.comments?.length} Comments
      <ul>
        {reversedComment.map((comment, index) => (
          <li key={index}>
            {comment.name}: {comment.content} ( {comment.createdAt && new Date(comment.createdAt).toLocaleString()} )
            </li>
        )
        )}
        </ul>
        </Box>
    )
}

export default RecipeDetailsPage