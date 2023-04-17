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
    const recipe = await Recipe.findById(req.params.id)
}

module.exports = {
    create,
    show
}