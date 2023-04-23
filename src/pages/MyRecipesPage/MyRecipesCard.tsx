import { Link } from "react-router-dom"
import { RecipeDetails } from "../../utilities/type-declaration"
import DeleteRecipeButton from "../DeleteRecipeButton/DeleteRecipeButton"
import { Checkbox } from "@mui/material"
import { useState } from "react"
import UpdateRecipeButton from "../UpdateRecipePage/UpdateRecipeButton"



const MyRecipesCard = ( {recipe}:{recipe:RecipeDetails} ) => {
    const [checkbox, setCheckbox] = useState(false)
    return (
        <>
        <Checkbox 
        onClick={() => setCheckbox(!checkbox)}
        />
        <Link to={`/recipes/${recipe._id}`}>
        {recipe.recipe} <br/>
        Views: {recipe.views}<br/>
        Rating: {recipe.averagerating}
        </Link>
        <UpdateRecipeButton recipe={recipe} checkbox={checkbox} />
        <DeleteRecipeButton recipe={recipe} checkbox={checkbox} />
        </>
    )
}

export default MyRecipesCard