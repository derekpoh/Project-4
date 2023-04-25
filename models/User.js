const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const userSchema = new Schema({
    username: { 
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxLength: 50,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    password: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 30,
        required: true
    },
    bookmarks: [{
        type: Schema.Types.ObjectId,
        ref: "Recipe"
    }],
}, {
    timestamps: true
})


userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    return next();
});

userSchema.pre('save', function(next) {
    this.username = capitalize(this.username);
    next();
  });
  
const capitalize = (str) => {
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

module.exports = mongoose.model('User', userSchema);