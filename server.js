const express = require("express");
const cors = require("cors");
//const routesUser = require("./classRoutesUser");
const routesUser = require("./routesUser");
const routesMovies = require("./routesMovies");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/user/", routesUser);
app.use("/movies/", routesMovies)


app.listen(3333, () => {
  console.log("Server is running!");
});
