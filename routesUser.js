const pool = require("./configDb");

class Routes {

  async postUser(req, res) {
    const newUser = req.body;
    // let error = false;
    //await pool.connect();
    //await pool.query(`BEGIN TRANSACTION`);
  
    try {
      const query = `INSERT INTO users(username, email, password)
                     VALUES ($1,$2,$3)`;
      const values = [newUser.username, newUser.email, newUser.password];
      await pool.query(query, values);

      console.log(newUser);

      res.json("OK");
    } catch (e) {
     // error = true;
      console.log(e.detail);
      if (e.code == "23505") return res.status(400).json("Email já existente");
    }

   /* if(error){
      await pool.query(`ROLLBACK TRANSACTION`);
    } else {
      await pool.query(`COMMIT TRANSACTION`);
    }*/
    //await pool.end();
  }

  async getUser(req, res) {
    const id = req.params.id;
    console.log(id);

    try {
      const query = `SELECT * FROM users WHERE id = $1 AND deleted_at IS NULL`;
      const values = [id];
      const user = await pool.query(query, values);

      if (user.rowCount == 0) return res.status(400).json("ID não encontrado");
      res.json(user.rows);

    } catch (e) {
      if (e.code == "22P02") return res.status(400).json("ID incorreto!");
      return res.status(400).json(e.code);
    }

  }

  async putUser(req, res) {
    const id = req.params.id;
    const updateUser = req.body;

    try {
      const query = `UPDATE users SET username = $1, email = $2, password = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4`;
      const values = [updateUser.username, updateUser.email, updateUser.password, id];
      const user =await pool.query(query, values);
      //console.log(user);
      if (user.rowCount == 0) return res.status(400).json("ID não encontrado");
      res.json('User atualizado com sucesso!');
    } catch (e) {
      console.log(e);
      if (e.code == "23505") return res.status(400).json("Email já existente");
      if (e.code == "22P02") return res.status(400).json("ID incorreto!");
     
      return res.status(400).json(e.code);
    }
  }

  async deleteUser(req, res) {
    const id = req.params.id;

    try {
      const query = `UPDATE users SET updated_at = CURRENT_TIMESTAMP, deleted_at = CURRENT_TIMESTAMP WHERE id = $1`;
      const values = [id];
      const user = await pool.query(query, values);
      //console.log(user);
      if (user.rowCount == 0) return res.status(400).json("ID não encontrado");
      res.json('User excluído com sucesso!');
    } catch (e) {
      console.log(e);
     // if( e.code == "23505") return res.status(400).json("Email já existente");
      if (e.code == "22P02") return res.status(400).json("ID incorreto!");
     
      return res.status(400).json(e.code);
    }
  }
  async activeUsers(req, res) {
    const allUsers = await pool.query("select * from view_active_users");

    res.json(allUsers.rows);
  }
  async deletedUsers(req, res) {
    const allUsers = await pool.query("select * from view_deleted_users");

    res.json(allUsers.rows);
  }
}

const routesUser = new Routes();


module.exports = routesUser;
