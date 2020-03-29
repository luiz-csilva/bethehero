const express = require('express') // Requere o express
const cors = require('cors') // Requere o cors
const routes = require('./routes') // Instancia o routes do arquivo "routes.js" na constante

const app = express() // Instancia o express na variavel app

app.use(cors()) // Usa o cors, módulo de segurança
app.use(express.json()) // Informa ao app que ira receber json como resposta
app.use(routes) // Informa ao app para usar a variavel route (que terá as rotas)

app.listen(3333) //cd Informa ao app a porta que tera que abrir as rotas
