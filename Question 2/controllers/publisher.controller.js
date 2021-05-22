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
    if (req.params._id && req.body.name && req.body.country) {
        Game.findById(req.params._id, (err, game) => {
            if (err) {
                res.status(500).send({message: err})
            } else if (game) {
                savePublisher(req, res, game)
            }
        })
    } else
        res.status(400).json("Game ID not specified in URL");

}

module.exports.deletePublisher = (req, res) => {
    if (req.params._id) {
        Game.findById(req.params._id, (err, game) => {
            if (err)
                res.status(500).send({message: err})
            else if (game) {
                game.publisher = {};
                game.save((err) => res.status(500).json({message: "Internal server error" + err}));
            }
        })
    } else
        res.status(400).json("Game ID not specified in URL");
}

module.exports.getPublisher = (req, res) => {
    if (req.params._id) {
        Game.findById(req.params._id, (err, game) => {
            if (err)
                res.status(500).json({message: err});
            else if (game)
                res.status(200).json(game.publisher);
        })
    } else
        res.status(400).json("Game ID not specified in URL");
}