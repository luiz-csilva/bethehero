const knex = require('knex') // Requere o knex
const configuration = require('../../knexfile') // Requere o arquivo de configuração do knex

const connection = knex(configuration.development) // Salva na constante as configurações de desenvolvimento do arquivo do knex

module.exports = connection // Exporta a constante connection