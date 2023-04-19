import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { UserState } from '../../utilities/type-declaration';

function CreateRecipeForm( {user}:{user:UserState} ) {

  const [recipe, setRecipe] = useState({
    owner: user,
    recipe: "",
    cuisine: "",
    description: "",
    ingredients: [{
      name: "",
      quantity: "",
      measurement: "",
    }],
    instructions: [""]
  });
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    quantity: "",
    measurement: "",
  });
  const [newInstruction, setNewInstruction] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleAddIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, newIngredient],
    });
    setNewIngredient({
      name: "",
      quantity: "",
      measurement: "",
    });
  };

  const handleDeleteIngredient = (index: number) => {
    setRecipe({
      ...recipe,
      ingredients: [
        ...recipe.ingredients.slice(0, index),
        ...recipe.ingredients.slice(index + 1),
      ],
    });
  };


  const handleUpdateIngredient = (index: number, field: string, value: string | number) => {
    setRecipe(prevRecipe => {
      const updatedIngredients = [...prevRecipe.ingredients];
      updatedIngredients[index] = {
        ...updatedIngredients[index],
        [field]: value
      };
      return {
        ...prevRecipe,
        ingredients: updatedIngredients
      };
    });
  };

const handleAddInstruction = () => {
  setRecipe({
    ...recipe,
    instructions: [...recipe.instructions, newInstruction],
  });
  setNewInstruction("");
};

const handleDeleteInstruction = (index: number) => {
  setRecipe({
    ...recipe,
    instructions: [
      ...recipe.instructions.slice(0, index),
      ...recipe.instructions.slice(index + 1),
    ],
  });
};

const handleUpdateInstruction = (index: number, newValue: string) => {
  setRecipe({
    ...recipe,
    instructions: [
      ...recipe.instructions.slice(0, index),
      newValue,
      ...recipe.instructions.slice(index + 1),
    ],
  });
};


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try{
      const response = await fetch("/api/recipes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe), 
      });
      const data = await response.json();
      if (response.ok) {
        navigate(`/recipes/${data._id}`)
      } else {
        throw new Error("Failed to create recipe")
      }
    } catch (error) {
      setError(error.message)
    }
  }

  

  return (
        <Box component="form" onSubmit={handleSubmit} autoComplete="off"  sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="recipe"
          label="Recipe Name"
          name="recipe"
          value={recipe.recipe}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="cuisine"
          value={recipe.cuisine}
          onChange={handleChange}
          label="Cuisine"
          id="cuisine"
        />
         <TextField
          margin="normal"
          fullWidth
          name="description"
          value={recipe.description}
          onChange={handleChange}
          label="No long-winded stories (Max 100 words)"
          id="description"
        />
      <label>
        Ingredients:
        <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} style={{listStyleType: "none"}}>
          <TextField
            margin="normal"
            value={ingredient.name}
            onChange={(event) =>
              handleUpdateIngredient(index, "name", event.target.value)
            }
          />
          <TextField
              margin="normal"
                value={ingredient.quantity}
                onChange={(event) =>
                  handleUpdateIngredient(index, "quantity" , event.target.value)
                }
              />
          <TextField
              margin="normal"
                value={ingredient.measurement}
                onChange={(event) =>
                  handleUpdateIngredient(index, "measurement" ,event.target.value)
                }
              />
              <Button onClick={() => handleDeleteIngredient(index)}>
                Delete
              </Button>
            </li>
          ))}
          <li style={{listStyleType: "none"}}>
          <TextField      
              margin="normal"
              label="Name"
              value={newIngredient.name}
              onChange={(event) => setNewIngredient({
                ...newIngredient,
                name: event.target.value
              })}
            />
            <TextField
              margin="normal"
              label="Quantity"
              value={newIngredient.quantity}
              onChange={(event) => setNewIngredient({
                ...newIngredient,
                quantity: event.target.value
              })}
            />
            <TextField
              margin="normal"
              label="Measurement"
              value={newIngredient.measurement}
              onChange={(event) => setNewIngredient({
                ...newIngredient,
                measurement: event.target.value
              })}
            />
            <br/>
            <Button 
            onClick={handleAddIngredient}>
              Add Ingredient
            </Button>
          </li>
        </ul>
      </label>
      <label>
        Instructions:
        <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>
          <TextField
            margin="normal"
            value={instruction}
            onChange={(event) =>
            handleUpdateInstruction(index, event.target.value)
                }
              />
              <Button 
              onClick={() => handleDeleteInstruction(index)}>
                Delete
              </Button>
            </li>
          ))}
          <li>
          <TextField
            margin="normal"
            value={newInstruction}
            onChange={(event) => setNewInstruction(event.target.value)}
            />
            <Button onClick={handleAddInstruction}>
              Add Instruction
            </Button>
          </li>
        </ul>
      </label>
      <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create Recipe
        </Button>
        <Typography
        variant="body2"
        color="error"
        align="center"
        sx={{ marginTop: 5 }}
      >
        {error}
      </Typography>
      </Box>
  );
}

export default CreateRecipeForm;
