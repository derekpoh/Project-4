import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import { RecipeDetails } from "../../utilities/type-declaration"


const UpdateRecipeButton = ( {recipe, checkbox}: {recipe: RecipeDetails, checkbox: boolean} ) => {
    return (
        <Link to={`/recipes/${recipe._id}/update`}>
        <Button
        disabled={!checkbox}
        >
            Update
        </Button>
        </Link>
    )
}

export default UpdateRecipeButton