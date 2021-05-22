const {Schema, model} = require("mongoose");

const publisherSchema = new Schema({
    name: String,
    country: String
})

const reviewSchema = new Schema({
    name: String,
    review: String
})

const gameSchema = new Schema({
    title: {type: String, required: true},
    price: {type: Number, required: true},
    year: {type: Number, required: true},
    rate: {type: Number, min: 1, max: 5, default: 1},
    minAge: {type: Number, required: true},
    minPlayer: {type: Number, min: 1, max: 10},
    minPlayers: Number,
    designers: String,
    reviews: [reviewSchema],
    publisher: publisherSchema

})
model("Game", gameSchema, "games");