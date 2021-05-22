const {model} = require("mongoose");
const Game = model("Game");

const savePublisher = (req, res, game) => {
    game.publisher = {
        name: req.body.name,
        country: req.body.country
    }
    game.save((err, game) => {
        if (err) {
            res.status(500).json({message: "Internal server error"})
        }
        res.status(200).json(game);
    });
}

module.exports.updatePublisher = (req, res) => {
    const response = {
        status: 200,
        message: ""
    };

    if (req.params._id && req.body.name && req.body.country) {
        Game.findById(req.params._id, (err, game) => {
            if (err) {
                response.status = 500;
                response.message = "Internal server error";
            } else if (game) {
                savePublisher(req, res, game)
            }
        })
    } else {
        response.status = 400;
        response.message = "Game ID not specified in URL";
    }
}

module.exports.deletePublisher = (req, res) => {
    const response = {
        status: 200,
        message: ""
    };
    if (req.params._id) {
        Game.findById(req.params._id, (err, game) => {
            if (err) {
                response.status = 500;
                response.message = "Internal server error";
            } else if (game) {
                game.publisher = {};
                game.save((err) => res.status(500).json({message: "Internal server error" + err}));
            }
        })
    } else {
        response.status = 400;
        response.message = "Game ID not specified in URL";
    }
}

module.exports.getPublisher = (req, res) => {
    const response = {
        status: 200,
        message: ""
    };
    if (req.params._id) {
        Game.findById(req.params._id, (err, game) => {
            if (err) {
                response.status = 500;
                response.message = "Internal server error";
            } else if (game) {
                response.status = 200;
                response.message = game.publisher;
            }
            res.status(response.status).json(response.message);
        })
    } else {
        response.status = 400;
        response.message = "Game ID not specified in URL";
    }
}