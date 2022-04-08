const Client = require('../configDb');

class Movies {
  
  async postMovie(req, res) {
    const newMovie = req.body;
    const client = Client();
    await client.connect();
    try {
      const query = `INSERT INTO movies(name, year, duration, sinopse, director, purchase_price, rent_price, rate)
                     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`;
      const values = [newMovie.name, newMovie.year, 
                     newMovie.duration,newMovie.sinopse, 
                     newMovie.director, newMovie.purchase_price,
                     newMovie.rent_price, newMovie.rate];
      await client.query(query, values);

      console.log(newMovie);

      res.json("OK");
    } catch (e) {
      console.log(e.detail);
      if (e.code == "23505") return res.status(400).json("Erro");
    } finally {
      await client.end();
    }

  }

  async getMovie(req, res) {
    const id = req.params.id;
    console.log(id);
    const client = Client();
    await client.connect();
    try {
      const query = `SELECT * FROM movies WHERE id = $1 AND deleted_at IS NULL`;
      const values = [id];
      const movie = await client.query(query, values);

      if (movie.rowCount == 0) return res.status(400).json("ID não encontrado");
      res.json(movie.rows);

    } catch (e) {
      if (e.code == "22P02") return res.status(400).json("ID incorreto!");
      return res.status(400).json(e.code);
    } finally {
      await client.end();
    }

  }

  async putMovie(req, res) {
    const id = req.params.id;
    const updateMovie = req.body;
    const client = Client();
    await client.connect();
    try {
      const query = `UPDATE movies SET name = $1, 
                                       year = $2, 
                                       duration = $3, 
                                       sinopse = $4, 
                                       director = $5, 
                                       purchase_price = $6, 
                                       rent_price = $7, 
                                       rate = $8
                                       updated_at = CURRENT_TIMESTAMP 
                                    WHERE id = $4`;
      const values = [updateMovie.name, updateMovie.year, 
                     updateMovie.duration,updateMovie.sinopse, 
                     updateMovie.director, updateMovie.purchase_price,
                     updateMovie.rent_price, updateMovie.rate, id];
      const movie = await client.query(query, values);
      console.log(movie);
      if (movie.rowCount == 0) return res.status(400).json("ID não encontrado");
      res.json('User atualizado com sucesso!');
    } catch (e) {
      console.log(e);
      if (e.code == "23505") return res.status(400).json("Email já existente");
      if (e.code == "22P02") return res.status(400).json("ID incorreto!");
     
      return res.status(400).json(e.code);
    } finally {
      await client.end();
    }
  }

  async deleteMovie(req, res) {
    const id = req.params.id;
    const client = Client();
    await client.connect();
    try {
      const query = `UPDATE movies SET updated_at = CURRENT_TIMESTAMP, deleted_at = CURRENT_TIMESTAMP WHERE id = $1`;
      const values = [id];
      const movie = await client.query(query, values);
      //console.log(movie);
      if (movie.rowCount == 0) return res.status(400).json("ID não encontrado");
      res.json('Movie excluído com sucesso!');
    } catch (e) {
      console.log(e);
     // if( e.code == "23505") return res.status(400).json("Email já existente");
      if (e.code == "22P02") return res.status(400).json("ID incorreto!");
     
      return res.status(400).json(e.code);
    } finally {
      await client.end();
    }
  }
  async activeMovies(req, res) {
    const client = Client();
    await client.connect();
    try{
      const allUsers = await client.query("SELECT * FROM view_active_movies");
      console.log(allUsers);
      if(allUsers.rowCount == 0)  return res.status(400).json("Nenhum Movie encontrado");
      res.json(allUsers.rows);
    } catch(e){
      if (e.code == "42P01") return res.status(400).json("VIEW não existe!");
    } finally{
      await client.end();
    }
  }

  async deletedMovies(req, res) {
    const client = Client();
    await client.connect();
    try{
      const allUsers = await client.query("SELECT * FROM view_deleted_movies");
      console.log(allUsers);
      if(allUsers.rowCount == 0)  return res.status(400).json("Nenhum Movie encontrado");
      res.json(allUsers.rows);
    } catch(e){
      if (e.code == "42P01") return res.status(400).json("VIEW não existe!");
    } finally{
      await client.end();
   }
  }
}

const movies = new Movies();

module.exports = movies;
