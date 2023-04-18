import { useState, useEffect } from "react"
import type { UserState } from '../../utilities/type-declaration';
import MyRecipesCard from "./MyRecipesCard";


const MyRecipesPage = ( {user}:{user:UserState} ) => {

    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        const fetchRecipes = async () => {
        try {
          const response = await fetch(`/api/recipes/${user._id}/myrecipes`);
          const recipes = await response.json();
          setRecipes(recipes)
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecipes();
  }, [user._id]);

    return(
        <>
        {recipes.map((recipe,index) => (
            <MyRecipesCard key={index} recipe={recipe} />
        )
        )}
        </>
    )
}

export default MyRecipesPage