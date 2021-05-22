const {model} = require("mongoose");
const Game = model("Game");

module.exports.getGamesList = (req, res) => {
    const callBackHandler = (err, gameList) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal server error")
        }
        res.status(200).json(gameList);
    }
    if (req.query && req.query.offset && req.query.count) {
        let {offset, count} = [parseInt(req.query.offset), parseInt(req.query.count)];
        count = count > 5 ? 5 : count;
        Game
            .find()
            .skip(offset)
            .limit(count)
            .exec((err, resp) => callBackHandler(err, resp))
    } else
        Game
            .find()
            .exec((err, resp) => callBackHandler(err, resp))
}

module.exports.getGameById = (req, res) => {
    if (req.params._id) {
        const gameId = req.params._id;
        Game.findById(gameId).exec((err, game) => {
            if (err) {
                console.log(err)
                res.status(500).send("Internal server error");
            }
            res.status(200).json(game);
        })
    } else {
        res.status(400).send("Game id is required")
    }
}

module.exports.deleteGameById = (req, res) => {
    if (req.params && req.params._id)
        Game.findByIdAndDelete(req.params._id, {useFindAndModify: true}, (err, doc) => {
            if (err)
                res.status(500).json({message: err})
            else {
                res.status(204).send()
            }
        })
    else
        res.status(400).send({message: "Game id is required"})

}

module.exports.updateGame = (req, res) => {
    if (req.params && req.params._id)
        Game.findByIdAndUpdate(req.params._id, req.body, {useFindAndModify: true}, (err) => {
            if (err)
                res.status(500).json({message: err})
            else
                res.status(204).send()
        })
    else
        res.status(400).send({message: "Game id is required"})

}


module.exports.createNewGame = (req, res) => {
    // Checks the required fields
    if (req.body && req.body.title && req.body.price && req.body.year && req.body.designers && req.body.minAge) {
        Game.create(req.body, (err, doc) => {
            if (err)
                res.status(500).json({message: err})
            else
                res.status(200).send(doc)
        });
    } else {
        res.status(400).json({message: "Please input all game attributes"})
    }
}