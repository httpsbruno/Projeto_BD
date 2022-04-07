const express = require("express");
const cors = require("cors");
const routesUser = require("./routesUser");

const app = express();

app.use(cors());
app.use(express.json());

//app.use("/user/", )

app.get("/user/:id", routesUser.getUser);
app.post("/user/", routesUser.postUser);
app.put("/user/:id", routesUser.putUser);
app.delete("/user/:id", routesUser.deleteUser);
app.get("/activeusers", routesUser.activeUsers);
app.get("/deletedusers", routesUser.deletedUsers);

app.listen(3333, () => {
  console.log("Server is running!");
});
