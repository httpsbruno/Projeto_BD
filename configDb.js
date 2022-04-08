const { Client } = require("pg");

const client = () =>{
 return  new Client({
    user: "postgres",
    host: "localhost",
    database: "DB_Movies",
    password: "4286",
    port: "5432",
  });
} 

module.exports = client;
