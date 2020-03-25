const connection = require('../database/connection') // Requer o arquivo que faz a conexão com o banco

module.exports = {
    async index (request, response){
        const ong_id = request.headers.authorization

        const casos = await connection ('casos') // Pega todos os casos de uma ong (id) especifico
            .where('ong_id', ong_id)
            .select('*')
        
            return response.json(casos)
    }
}