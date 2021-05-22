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
    if (req.params.gameId && req.body.name && req.body.review)
        Game.findById(req.params.gameId, (err, game) => {
                if (err)
                    res.status(500).send({message: err})
                else if (game)
                    saveReview(req, res, game)
            }
        );
    else
        res.status(400).json("Game ID not specified in URL");
}

module.exports.updateReview = (req, res) => {
    if (req.params.gameId && req.params.reviewId && req.body.name && req.body.review) {
        Game.findById(req.params.gameId, (err, game) => {
            if (err) {
                res.status(500).send({message: err})
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
    } else
        res.status(400).json("Game ID not specified in URL");
}

module.exports.deleteReview = (req, res) => {
    if (req.params.gameId && req.params.reviewId) {
        Game.findById(req.params.gameId,
            (err, game) => {
                if (err) {
                    res.status(500).json({message: err});
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
    } else
        res.status(400).json("Game ID not specified in URL");
}


module.exports.getReviewList = (req, res) => {
    if (req.params.gameId) {
        Game.findById(req.params.gameId, (err, game) => {
            if (err)
                res.status(500).send({message: err})
            else if (game)
                res.status(200).send(game.reviews)
        })
    } else
        res.status(400).json("Game ID not specified in URL");
}


module.exports.getReviewById = (req, res) => {
    if (req.params.gameId && req.params.reviewId) {
        Game.findById(req.params.gameId, (err, game) => {
                if (err) {
                    res.status(500).json({message: err});
                } else if (!game)
                    res.status(404).json({message: "Game not found"});
                else if (game) {
                    const review = game.reviews.find(g => g._id.toString() === req.params.reviewId);
                    if (review)
                        res.status(200).json(review);
                    else
                        res.status(404).json({message: "Review not found"});
                }
            }
        )
    } else
        res.status(400).json("Game ID not specified in URL");
}