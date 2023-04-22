import RecipeForm from "../../components/RecipeForm/RecipeForm"
import { UserState } from "../../utilities/type-declaration"



const CreateRecipeForm = ( {user}:{user:UserState} ) => {
  
  const method = "POST"
  const url = "create"
  const initialValues= {
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
        }

  return (
    <RecipeForm initialValues={initialValues} method={method} url={url} />
  )
}

export default CreateRecipeForm