const express = require("express");
const router = express.Router();
const {
    getGameById,
    getGamesList,
    createNewGame,
    deleteGameById,
    updateGame
} = require("../controllers/game.controller")


router.get("/games", getGamesList)
    .post("/games", createNewGame);

router.get("/games/:_id", getGameById)
    .delete("/games/:_id", deleteGameById)
    .put("/games/:_id", updateGame);

module.exports = router;