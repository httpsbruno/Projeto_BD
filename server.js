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

/*app.get("/user/:id", validation,  routesUser.getUser);
app.post("/user/", validation, routesUser.postUser);
app.put("/user/:id", validation, routesUser.putUser);
app.delete("/user/:id", validation, routesUser.deleteUser);
app.get("/activeusers", routesUser.activeUsers);
app.get("/deletedusers", routesUser.deletedUsers);*/

app.listen(3333, () => {
  console.log("Server is running!");
});
