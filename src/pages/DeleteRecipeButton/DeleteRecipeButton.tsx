import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { RecipeDetails } from "../../utilities/type-declaration";


const DeleteRecipeButton = ( {recipe, checkbox}: {recipe: RecipeDetails, checkbox: boolean} ) => {
    const navigate = useNavigate();
    const handleDelete = async () => {
        try{
            const response = await fetch(`/api/recipes/${recipe._id}`, {
              method: "Delete",
            });
            const data = await response.json();
            if (response.ok) {
              navigate(`/`)
            } else {
              throw new Error("Failed to delete recipe")
            }
          } catch (error: any) {
            console.log(error.message)
          }
    }

    return (
        <Button
        onClick={handleDelete}
        disabled={!checkbox}
        >
            Delete
        </Button>
    )
}

export default DeleteRecipeButton