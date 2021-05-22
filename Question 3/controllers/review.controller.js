const {model} = require("mongoose");
const Game = model("Game");


const saveReview = (req, res, game) => {
    let review = {
        name: req.body.name,
        review: req.body.review
    }
    game.reviews.push(review);
    game.save((err, game) => {
        if (err) {
            res.status(500).json({message: "Internal server error " + err})
        }
        res.status(200).json(game);
    });
}

module.exports.addReview = (req, res) => {
    const response = {
        status: 200,
        message: ""
    }
    if (req.params.gameId && req.body.name && req.body.review) {
        Game.findById(req.params.gameId, (err, game) => {
            if (err) {
                response.status = 500;
                response.message = "Internal server error";
            } else if (game) {
                saveReview(req, res, game)
            }
        });
    } else {
        response.status = 400;
        response.message = "Game ID not specified in URL";
    }
}

module.exports.updateReview = (req, res) => {
    const response = {
        status: 200,
        message: ""
    };
    if (req.params.gameId && req.params.reviewId && req.body.name && req.body.review) {
        Game.findById(req.params.gameId, (err, game) => {
            if (err) {
                response.status = 500;
                response.message = "Internal server error";
            } else if (game) {
                let reviewIndex = game.reviews.findIndex(r => r._id.toString() === req.params.reviewId);
                if (reviewIndex !== -1) {
                    game.reviews[reviewIndex] = {
                        name: req.body.name,
                        review: req.body.review
                    };
                    game.save((err) => {
                        if (err) {
                            res.status(500).json({message: "Internal server error " + err})
                        }
                        res.status(200).json(game);
                    });
                }
            }
        })
    } else {
        response.status = 400;
        response.message = "Game ID not specified in URL";
    }
}

module.exports.deleteReview = (req, res) => {
    const response = {
        status: 200,
        message: ""
    };
    if (req.params.gameId && req.params.reviewId) {
        Game.findById(req.params.gameId,
            (err, game) => {
                if (err) {
                    response.status = 500;
                    response.message = "Internal server error";
                    res.status(response.status).json(response.message);
                } else if (game) {
                    const reviewIndex = game.reviews.findIndex(g => g._id.toString() === req.params.reviewId);
                    if (reviewIndex !== -1) {
                        game.reviews.splice(reviewIndex, 1);
                        game.save((err, doc) => {
                            if (err)
                                res.status(500).send({message: `Internal server error ${err}`})
                            else
                                res.status(204).send();
                        })
                    } else
                        game.save((err) => res.status(404).json({message: "Review not found " + err}));
                }
            })
    } else {
        response.status = 400;
        response.message = "Game ID not specified in URL";
        res.status(response.status).json(response.message);
    }
}


module.exports.getReviewList = (req, res) => {
    const response = {
        status: 200,
        message: ""
    };
    if (req.params.gameId) {
        Game.findById(req.params.gameId, (err, game) => {
            if (err) {
                response.status = 500;
                response.message = "Internal server error";
            } else if (game) {
                response.status = 200;
                response.message = game.reviews;
            }
            res.status(response.status).json(response.message);
        })
    } else {
        response.status = 400;
        response.message = "Game ID not specified in URL";
    }
}

module.exports.getReviewById = (req, res) => {
    const response = {
        status: 200,
        message: ""
    };
    if (req.params.gameId && req.params.reviewId) {
        Game.findById(req.params.gameId, (err, game) => {
            if (err) {
                response.status = 500;
                response.message = "Internal server error";
            } else if (game) {
                const review = game.reviews.find(g => g._id.toString() === req.params.reviewId);
                if (review) {
                    response.status = 200;
                    response.message = review;
                } else {
                    response.status = 404;
                    response.message = "Review not found";
                }
            }
            res.status(response.status).json(response.message);
        })
    } else {
        response.status = 400;
        response.message = "Game ID not specified in URL";
    }
}
