const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    commenter: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
    },
    content: {
        type: String,
    },
    createdAt: { 
        type: Date, 
        default: Date.now}
}, {
    timestamps: true
})

const ratingSchema = new Schema({
    rater: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    rating: {
        type: Number,
    }
}, {
    timestamps: true
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
}, {
    timestamps: true
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
    rating: [ratingSchema],
    views: {
        type: Number,
        default: 0
    },
    comments: [commentSchema]
}, {
    timestamps: true
})

module.exports = mongoose.model('Recipe', recipeSchema);