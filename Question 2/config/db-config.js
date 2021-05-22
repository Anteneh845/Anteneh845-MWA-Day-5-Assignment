const {connect, connection} = require("mongoose");
const DB_NAME = "GamesAssignment";
const DB_URL = `mongodb://localhost:27017/${DB_NAME}`;

// Get the schema definition
require("../schemas/game.schema");

// Connect to MongoDB
connect(DB_URL, {useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true}, (err) => {
        if (err)
            console.log(err);
        console.log("Connection to database successful")
    }
)
process.on('SIGINT', () => {
    connection.close(() => console.log("Disconnected to database successfully"))
    process.exit(0)
})

process.on('SIGTERM', () => {
    connection.close(() => console.log("Disconnected to database successfully"))
    process.exit(0)
})


process.once('SIGUSR2', () => {
    connection.close(() => console.log("Disconnected to database successfully"))
    process.kill(process.pid, "SIGUSR2")
})
