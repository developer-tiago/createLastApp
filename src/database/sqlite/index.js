const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

//Uma biblioteca própria do node.js própria para resolver o endereço de acordo com o Sistema operacional
const path = require('path');

async function sqliteConnection() {
  //Abrindo uma conexão 
  const database = await sqlite.open({
  //Passar um objeto com configurações da minha conexão
  //path.resolve para ele resover o endereço independente do SO. ".."=para voltar uma pasta. "database.db"= para criar um arquivo
  // driver que vai ultilizar e o sqlite3
    filename: path.resolve(__dirname, "..", "database.db"),
    driver: sqlite3.Database
  });

  return database;
  
}

module.exports = sqliteConnection;