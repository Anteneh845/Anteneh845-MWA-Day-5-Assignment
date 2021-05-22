const express = require("express");
const app = express();
const PORT = 4000;

require("./config/db-config");

app.use(express.json());
const gameRoutes = require("./routes/game.route");
app.use("/api", gameRoutes);


app.listen(PORT, () => {
    console.log("App started at " + PORT)
})