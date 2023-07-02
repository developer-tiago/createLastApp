const sqliteConnection = require('../../sqlite');

const createUsers = require('./createUsers');

async function migrationsRun() {

  //todas as tabelas da aplicação são inseridas dentro do Array
  const schemas = [
    createUsers
  ].join('');

  sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.error(error))
};

module.exports = migrationsRun;