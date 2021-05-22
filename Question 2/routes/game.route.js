const express = require("express");
const router = express.Router();
const {
    getGameById,
    getGamesList,
    createNewGame,
    deleteGameById,
    updateGame
} = require("../controllers/game.controller")

const {deletePublisher, updatePublisher, getPublisher} = require("../controllers/publisher.controller");

router.get("/games", getGamesList)
    .post("/games", createNewGame);

router.get("/games/:_id", getGameById)
    .delete("/games/:_id", deleteGameById)
    .put("/games/:_id", updateGame)

// publisher related routes
router
    .put("/games/:_id/publishers", updatePublisher)
    .delete("/games/:_id/publishers", deletePublisher)
    .get("/games/:_id/publishers", getPublisher)
    .post("/games/:_id/publishers", updatePublisher)

module.exports = router;