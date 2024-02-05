const {hash , compare} = require('bcryptjs');

const AppError = require('../utils/AppError');

const sqliteConnections = require('../database/sqlite');

class UsersControllers {


  async  create(request , response){
        
    const {name, email,password} = request.body

        const database = await sqliteConnections()

        const checkUserExist = await database.get("SELECT * FROM users WHERE email = (?)" , [email] )

        if(checkUserExist){
            throw new AppError ('Este e-mail já existe')
        };
       
        const hashedPassword = await hash(password , 8);

        await database.run("INSERT INTO users(name , email , password) VALUES (? ,? ,?)" , [name , email, hashedPassword]);

        return response.status(201).json();
  }
  

async upadte (request , response){

    const { name, email , password , old_password} = request.body;
    const {id} = request.params;

    const database = await sqliteConnections();

    const user = await database.get(`SELECT * FROM users WHERE id = (?)` , [id]);

    if(!user){
      throw new AppError('Este usuário não existe');
    }


    const userWithUpdateEmail = await database.get(`SELECT * FROM users WHERE email = (?)` , [email]);

    if(userWithUpdateEmail && userWithUpdateEmail.id !== user.id){
      throw new AppError (`Esté e-mail ja existe`);
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    
    if(password && !old_password){
      throw new AppError('Você precisa informar a senha antiga para atualizar a senha');

    };

    if(password && old_password){
    
      const checkOldPassword = await compare(old_password, user.password);

      if(!checkOldPassword){
        throw new AppError('A senha antiga não confere');
      };

      user.password = await hash(password , 8);


    }
    database.run(`
    UPDATE users SET
    name = ?,
    email = ?,
    password = ?,
    updated_at = DATETIME('now')
    WHERE id = ?
    ` , 
    [name , email ,user.password , id]
    );

    return response.json();


}

}

module.exports = UsersControllers;