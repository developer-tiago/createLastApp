const  { hash, compare }  = require("bcryptjs")
const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite") //Importação da conexão com o banco de dados

class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body;


    const database = await sqliteConnection();
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]) //A interrogação será substituida pela o email informado
    
    if (checkUserExists) {
        throw new AppError("Este e-mail já está em uso.");
    }

    const hashedPassword = await hash(password, 8);

    await database.run(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
    [name, email, hashedPassword]
    ); //Inserindo dentro da table users nome, email e (senha ou hashedSenha)

    return response.status(201).json();
    };

    async update(request, response) {
        const { name, email, password, old_password } = request.body;
        const { id } = request.params;

        const database = await sqliteConnection(); //Conexão com database
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

        if(!user) {
            throw new AppError("Usuário não encontrado");
        }

        const userWithUpdateEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if(userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
            throw new AppError("Este e-mail já está em uso.")
        }

        user.name = name ?? user.name; //Se estiver conteudo dentro de name ele será utilizado SENÃO EXISTIR quem seta usardo será user.name !
        user.email = email ?? user.email; //Se estiver conteudo dentro de email ele será utilizado SENÃO EXISTIR quem seta usardo será user.email !

        if(password && !old_password) {
            throw new AppError("Você precisa informar a senha antiga para definir a nova senha")
        }

        if(password && old_password) {
            const checkOldPassword = await compare(old_password, user.password);

            if(!checkOldPassword) {
                throw new AppError("A senha antiga não confere.")
            }

            user.password = await hash(password, 8)
        }

        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            update_at = DATETIME('now')
            WHERE id = ?`,
            [user.name, user.email, user.password, id]
            );
            
        return response.status(200).json();

    }
}
module.exports = UsersController;