const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    commenter: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    content: {
        type: String,
    }
})

const ingredientSchema = new Schema ({
    name: { 
        type: String,
        required: true,
        trim: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    measurement: {
        type: String,
    }
})

const recipeSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    recipe: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String, 
        match: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, 
    },
    cuisine: {
        type: String
    },
    description: { 
        type: String,
        maxLength: 100, 
    },
    ingredients: [ingredientSchema],
    instructions: {
        type: [String],
        required: true
    },
    rating: {
        type: [Number]
    },
    views: {
        type: Number,
        default: 0
    },
    comments: [commentSchema]
}, {
    timestamps: true
})

module.exports = mongoose.model('Recipe', recipeSchema);