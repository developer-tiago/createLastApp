const path = require('path')

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "database","database.db")
    },

    //Por padrão a funcionalidade de CASCADE no SQLite é desabilitada, então é necessário usar a funcionalidade pool abaixo para habilitar a função de CASCADE
    pool: {
      afterCreate: (connection, callback) => connection.run("PRAGMA foreign_keys = ON", callback)
    },

    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    },
    
    useNullAsDefault: true
  
  }
};
