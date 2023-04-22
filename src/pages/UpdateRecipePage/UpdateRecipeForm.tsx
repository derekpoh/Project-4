import { useEffect, useState } from "react"
import RecipeForm from "../../components/RecipeForm/RecipeForm"
import { UserState } from "../../utilities/type-declaration"
import { useParams } from "react-router-dom"



const UpdateRecipeForm = ( {user}:{user:UserState} ) => {
  const { id } = useParams()
  const method = "PUT"
  const url = `${id}`
  const [initialValues, setInitialValues] = useState({
    owner: user,
    recipe: "",
    cuisine: "",
    description: "",
    ingredients: [{
      name: "",
      quantity: "",
      measurement: "",
    }],
    instructions: [""],
    imageurl: [""], 
    imagefile: "",
})

useEffect(() => {
  const fetchRecipe = async () => {
  try {
    const response = await fetch(`/api/recipes/${id}/edit`);
    const recipe = await response.json();
    setInitialValues(recipe)
  } catch (err) {
    console.error(err);
  }
};
fetchRecipe();
}, [id]);



  return (
    <RecipeForm initialValues={initialValues} method={method} url={url} />
  )
}

export default UpdateRecipeForm