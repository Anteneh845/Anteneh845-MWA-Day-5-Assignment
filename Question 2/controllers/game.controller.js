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
    const response = {
        status: 204,
        message: ""
    }
    if (req.params && req.params._id) {
        Game.findByIdAndDelete(req.params._id, {useFindAndModify: true}, (err, doc) => {
            if (err) {
                response.status = 500;
                response.message = "Internal server error";
            } else {
                response.status = 204;
                response.message = "Game deleted successfully";
            }
            res.status(response.status).send({message: response.message})
        })
    } else {
        response.status = 400;
        response.message = "Game id is required";
        res.status(response.status).send({message: response.message})
    }
}

module.exports.updateGame = (req, res) => {
    const response = {
        status: 204,
        message: ""
    }
    if (req.params && req.params._id) {
        Game.findByIdAndUpdate(req.params._id, req.body, {useFindAndModify: true}, (err) => {
            if (err) {
                response.status = 500;
                response.message = "Internal server error";
            } else {
                response.status = 204;
                response.message = "Game Updated successfully";
            }
            res.status(response.status).send({message: response.message})
        })
    } else {
        response.status = 400;
        response.message = "Game id is required";
        res.status(response.status).send({message: response.message})
    }
}


module.exports.createNewGame = (req, res) => {
    const response = {
        status: 200,
        message: ""
    };
    // Checks the required fields
    if (req.body && req.body.title && req.body.price && req.body.year && req.body.designers && req.body.minAge) {
        Game.create(req.body, (err, doc) => {
            if (err) {
                response.status = 500;
                response.message = "Internal server error";
            } else {
                response.status = 200;
                response.message = doc;
            }
            res.status(response.status).json({message: response.message})
        })
    } else {
        res.status(response.status).json({message: response.message})
    }
}