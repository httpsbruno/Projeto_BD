const express = require('express');
const crudMovies = require("./CRUD/Movies");

const app = express();

app.get("/activemovies", crudMovies.activeMovies);
app.get("/deletedmovies", crudMovies.deletedMovies);
app.get("/:id", validation,  crudMovies.getMovie);
app.post("/", validation, crudMovies.postMovie);
app.put("/:id", validation, crudMovies.putMovie);
app.delete(":id", validation, crudMovies.deleteMovie);


function validation(req, res, next){
    const param = req.params;
    const body = req.body;
  
    if( JSON.stringify(param) !== "{}"){
      if (isNaN(param.id)) return res.status(400).json("Não é um número");
    }
  
    if( JSON.stringify(body) !== "{}"){
    
        //validações Movies
      
    }
    console.log(param, body);
  
    next();
  }
  
 module.exports = app;
  