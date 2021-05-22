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
const {
    updateReview,
    deleteReview,
    getReviewList,
    getReviewById,
    addReview
} = require("../controllers/review.controller");

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

// Review related routes
router
    .put("/games/:gameId/reviews/:reviewId", updateReview)
    .delete("/games/:gameId/reviews/:reviewId", deleteReview)
    .get("/games/:gameId/reviews", getReviewList)
    .get("/games/:gameId/reviews/:reviewId", getReviewById)
    .post("/games/:gameId/reviews", addReview)


module.exports = router;