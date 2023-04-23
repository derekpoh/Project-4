import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { RecipeDetails } from '../../utilities/type-declaration';
import type { UserState } from '../../utilities/type-declaration';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import "./RecipeDetailsPage.css"

const blue = {
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
};

const grey = {
  100: '#eaeef2',
  300: '#afb8c1',
  900: '#24292f',
};

const theme = createTheme(
  {
  breakpoints: {
    values: {
      sm: 600,
    },
  },
});



const RecipeDetailsPage = ( {user}:{user:UserState} ) => {
  const [recipe, setRecipe] = useState<RecipeDetails>({
    owner: "",
    recipe: "",
    cuisine: "",
    ingredients: [{ name: '', quantity: '' }],
    instructions: [],
    views: 0,
  });
  const [rating, setRating] = useState<number|null>(5);
  const [hover, setHover] = useState(-1);
  const [averageRating, setAverageRating] = useState<number|"No Rating">("No Rating");
  const [comment, setComment] = useState("");
  const [reversedComment, setReversedComment] = useState([{
    name: "",
    content: "",
    createdAt: "",
  }])
  const  { id }  = useParams();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
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
      <ThemeProvider theme={theme}>
      <img className="book-image" src={recipe?.imagefile || recipe?.imageurl} alt="Recipe image" />

    {!isMobile && !user ? (
      <div className="recipeName" style={{ marginTop: '100px' }}>{recipe?.recipe}</div>
        ) : isMobile && !user ? (
      <div className="recipeName" style={{ marginTop: '0px' }}>{recipe?.recipe}</div>
        ) : !isMobile && user ? (
      <div className="recipeName" style={{ marginTop: '45px' }}>{recipe?.recipe}</div>
        ) : (
      <div className="recipeName" style={{ marginTop: '0px' }}>{recipe?.recipe}</div>
        )}

<div className="authorName">Views: {recipe.views} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Rating: {averageRating}</div>

<div className="e-copies2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
<span>{hover !== -1 ? hover : rating}</span>
  <div style={{ display: 'flex', alignItems: 'center' }}>
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

  </div>
  <button onClick={(event)=>handleRating(event)} style={{ marginTop: '10px' }}>
    Submit Rating
  </button> 
</div>


<hr className="hr-line" />

<div className="summary">
          <h3>Description</h3>
          {recipe.description || "No description"} <p/>
        </div>
        <hr className="hr-line" />

        <div className="summary">
          <h3>Ingredients</h3>
        <ul>
        {recipe?.ingredients?.map((ingredient, index) => (
          <li key={index}>
            {ingredient.quantity} {ingredient.measurement} {ingredient.name}
            </li>
        )
        )}
        </ul>
        </div>

        <div className="summary">
          <h3>Instructions</h3>
        <ul>
        {recipe?.instructions?.map((instruction, index) => (
          <li key={index}>
            Step {index+1}: {instruction}
            </li>
        )
        )}
        </ul>
        </div>
  <div className="parent">
  <div className="textarea-container">
    <textarea 
      style={{ whiteSpace: 'pre-wrap' }}
      className="textarea"
      name="comment"
      value={comment}
      onChange={(event) => setComment(event.target.value)}
      placeholder="Leave a comment"
      rows={4}
    />
  </div>
  <button  onClick={(event)=>handleComment(event)}>
    Submit Comment
  </button>
</div>
<div className="parent2">
  <div className="textarea-container">
    <div className="commenttitle">
      {recipe?.comments?.length} Comment(s)
    </div> <br/>
      <ul className='commentlist'>
        {reversedComment.map((comment, index) => (
          <li className='commentpoint' key={index}>
          <span className='commentname'> 
            {comment.name} ( {comment.createdAt && new Date(comment.createdAt).toLocaleString()} )
            </span> <br/><br/>
           <span style={{ whiteSpace: 'pre-wrap' }}>{comment.content}</span>  
            </li>
        )
        )}
        </ul>
        </div>
        </div>
        
      </ThemeProvider>
    )
}

export default RecipeDetailsPage