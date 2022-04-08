const Client = require('../configDb');

class Users {
  
  async postUser(req, res) {
    const newUser = req.body;
    const client = Client();
    await client.connect();
    try {
      const query = `INSERT INTO users(name, email, password)
                     VALUES ($1,$2,$3)`;
      const values = [newUser.name, newUser.email, newUser.password];
      await client.query(query, values);

      console.log(newUser);

      res.json("OK");
    } catch (e) {
      console.log(e.detail);
      if (e.code == "23505") return res.status(400).json("Email já existente");
    } finally {
      await client.end();
    }

  }

  async getUser(req, res) {
    const id = req.params.id;
    console.log(id);
    const client = Client();
    await client.connect();
    try {
      const query = `SELECT * FROM users WHERE id = $1 AND deleted_at IS NULL`;
      const values = [id];
      const user = await client.query(query, values);

      if (user.rowCount == 0) return res.status(400).json("ID não encontrado");
      res.json(user.rows);

    } catch (e) {
      if (e.code == "22P02") return res.status(400).json("ID incorreto!");
      return res.status(400).json(e.code);
    } finally {
      await client.end();
    }

  }

  async putUser(req, res) {
    const id = req.params.id;
    const updateUser = req.body;
    const client = Client();
    await client.connect();
    try {
      const query = `UPDATE users SET name = $1, email = $2, password = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4`;
      const values = [updateUser.name, updateUser.email, updateUser.password, id];
      const user = await client.query(query, values);
      console.log(user);
      if (user.rowCount == 0) return res.status(400).json("ID não encontrado");
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

  async deleteUser(req, res) {
    const id = req.params.id;
    const client = Client();
    await client.connect();
    try {
      const query = `UPDATE users SET updated_at = CURRENT_TIMESTAMP, deleted_at = CURRENT_TIMESTAMP WHERE id = $1`;
      const values = [id];
      const user = await client.query(query, values);
      //console.log(user);
      if (user.rowCount == 0) return res.status(400).json("ID não encontrado");
      res.json('User excluído com sucesso!');
    } catch (e) {
      console.log(e);
     // if( e.code == "23505") return res.status(400).json("Email já existente");
      if (e.code == "22P02") return res.status(400).json("ID incorreto!");
     
      return res.status(400).json(e.code);
    } finally {
      await client.end();
    }
  }
  async activeUsers(req, res) {
    const client = Client();
    await client.connect();
    try{
      const allUsers = await client.query("SELECT * FROM view_active_users");
      console.log(allUsers);
      if(allUsers.rowCount == 0)  return res.status(400).json("ID não encontrado");
      res.json(allUsers.rows);
    } catch(e){
      if (e.code == "42P01") return res.status(400).json("VIEW não existe!");
    } finally{
      await client.end();
    }
  }

  async deletedUsers(req, res) {
    const client = Client();
    await client.connect();
    try{
      const allUsers = await client.query("SELECT * FROM view_deleted_users");
      console.log(allUsers);
      if(allUsers.rowCount == 0)  return res.status(400).json("ID não encontrado");
      res.json(allUsers.rows);
    } catch(e){
      if (e.code == "42P01") return res.status(400).json("VIEW não existe!");
    } finally{
      await client.end();
   }
  }
}

const users = new Users();

module.exports = users;
