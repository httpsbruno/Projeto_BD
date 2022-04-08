const express = require('express');
const crudUser = require("./CRUD/Users");

const app = express();

app.get("/activeusers", crudUser.activeUsers);
app.get("/deletedusers", crudUser.deletedUsers);
app.get("/:id", validation,  crudUser.getUser);
app.post("/", validation, crudUser.postUser);
app.put("/:id", validation, crudUser.putUser);
app.delete(":id", validation, crudUser.deleteUser);


function validation(req, res, next){
    const param = req.params;
    const body = req.body;
  
    if( JSON.stringify(param) !== "{}"){
      if (isNaN(param.id)) return res.status(400).json("Não é um número");
    }
  
    if( JSON.stringify(body) !== "{}"){
      const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
      const nameRegex = /[A-Z][a-z]* [A-Z][a-z]*/;
      const passwordRegex = /^(?=.\d)(?=.*[a-z])(?=.*[A-Z])(?:([0-9a-zA-Z])(?!\1)){8,}$/;
      
      if (body.email == "" || body.email == undefined) return res.status(400).json("E-mail vazio");
      if (!emailRegex.test(body.email)) return res.status(400).json("E-mail inválido");
  
      if (body.username == "" || body.username == undefined) return res.status(400).json("Nome vazio");
      if (!nameRegex.test(body.username)) return res.status(400).json("Nome inválido");
  
      console.log(body.password);
      console.log(passwordRegex.test(body.password));
      if (body.password == "" || body.password == undefined) return res.status(400).json("Senha vazia");
      if (!passwordRegex.test(body.password)) return res.status(400).json("Senha inválida");
      
    }
    console.log(param, body);
  
    next();
  }
  
 module.exports = app;
  