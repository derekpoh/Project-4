const Recipe = require("../models/Recipe")
const VIEWINCREASE = 0.5


const calculateAverageRating = (ratings) => {
        let total = 0;
        ratings.forEach((r) => {
          total += r.rating;
        });
        const averageRating = (total / ratings.length).toFixed(2);
        if (isNaN(averageRating) || !averageRating ) return "No Rating"
        return parseFloat(averageRating);
      };

      
const show = async (req,res) => {
    try {
        const recipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: VIEWINCREASE } },
            { new: true }
          ).populate("owner");
          const averageRating = calculateAverageRating(recipe.rating)
        res.status(201).json({ recipe , averageRating });
        } catch (error) {
            res.status(500).json(error);
        }
}

const myRecipes = async (req,res) => {
  try {
    const recipes = await Recipe.find({ "owner": req.params.id })
    const recipeArray = []
    recipes.forEach(recipe => {
      const averageRating = calculateAverageRating(recipe.rating)
      recipeArray.push({
        ...recipe.toJSON(),
        averagerating: averageRating
      })
  })
    res.status(201).json(recipeArray);
    } catch (error) {
        res.status(500).json(error);
      }
    }

const setRating = async (req,res) => {
  try {
    const {rating,user} = req.body
    const updatedRecipe = await Recipe.findOneAndUpdate(
        { _id: req.params.id, 'rating.rater': user._id },
        { $set: { 'rating.$.rating': rating } },
        { new: true }
        );
      if (updatedRecipe) {
        const averageRating = calculateAverageRating(updatedRecipe.rating)
        res.status(201).json(averageRating);
      } else {
        const newUpdatedRecipe = await Recipe.findOneAndUpdate(
            { _id: req.params.id, 'rating.rater': { $ne: user._id } },
            { $push: { rating: { rater: user._id, rating: rating } } },
            { new: true }
            );
            const averageRating = calculateAverageRating(newUpdatedRecipe.rating)
            res.status(201).json(averageRating);
          }
    } catch (error) {
        res.status(500).json(error);
    }
  }
  
const cuisine = async (req,res) => {
  try {
    const recipes = await Recipe.find({ "cuisine": req.params.cuisine }).populate("owner");
    const recipeArray = []
    recipes.forEach(recipe => {
      const averageRating = calculateAverageRating(recipe.rating)
      recipeArray.push({
        ...recipe.toJSON(),
        averagerating: averageRating
      })
  })
    res.status(201).json(recipeArray);
    } catch (error) {
        res.status(500).json(error);
      }
}

const setComment = async (req,res) => {
    try {
        const { comment , user } = req.body
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            { _id: req.params.id},
            { $push: {"comments":[{ 
                "commenter": user._id, 
                "name": user.username, 
                "content": comment,
             }]} 
            },
            { new: true }
            );
              res.status(201).json(updatedRecipe);
          }
          catch (error) {
            res.status(500).json(error);
        }
    }

const create = async (req,res) => {
    try {
      console.log(req.body)
        const recipe = await Recipe.create(req.body);
        res.status(201).json(recipe);
        } catch (error) {
            res.status(500).json(error);
        }
  }

const update = async (req,res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("owner");
    res.status(201).json(recipe);
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteRecipe = async (req,res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    res.status(201).json(recipe);
    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports = {
    create,
    show,
    setRating,
    setComment,
    myRecipes,
    cuisine,
    update,
    delete: deleteRecipe
}