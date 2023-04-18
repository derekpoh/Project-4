import { Link } from "react-router-dom"
import { RecipeDetails } from "../../utilities/type-declaration"


const MyRecipesCard = ( {recipe}:{recipe:RecipeDetails} ) => {
    return (
        <Link to={`/recipes/${recipe._id}`}>
        {recipe.recipe} <br/>
        Views: {recipe.views}<br/>
        Rating: {recipe.averagerating}
        </Link>
    )
}

export default MyRecipesCard