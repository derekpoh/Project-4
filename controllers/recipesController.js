const Recipe = require("../models/Recipe")



const create = async (req,res) => {
    try {
        await Recipe.create(req.body);
        res.status(201).json(req.body);
        console.log(req.body)
        } catch (error) {
            res.status(500).json(error);
        }
}

const show = async (req,res) => {
    try {
        const recipe = await Recipe.findById(req.params.id)
        res.status(201).json(recipe);
        console.log(req.body)
        } catch (error) {
            res.status(500).json(error);
        }
}

module.exports = {
    create,
    show
}