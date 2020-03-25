const express = require('express') // Requere o express
const routes = express.Router() // Instancia o módulo Router do express na constante
const OngsController = require('./controllers/OngsController')
const casosController = require('./controllers/CasosController')
const PerfilController = require('./controllers/PerfilController')
const SessionController = require('./controllers/SessionController')

routes.post('/sessions', SessionController.create)

routes.get('/ongs', OngsController.index) // Chama a função index dentro do arquivo "OngsControler"
routes.post('/ongs', OngsController.create ) 

routes.get('/casos', casosController.index) 
routes.post('/casos', casosController.create)

routes.delete('/casos/:id', casosController.del) 
routes.get('/perfil', PerfilController.index)

module.exports = routes // Exporta a variavel routes