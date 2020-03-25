const connection = require('../database/connection') // Requer o arquivo que faz a conexão com o banco
const crypto = require('crypto') // Pacote para gerar o id

module.exports = {
    async index (request, response) {
        const ongs = await connection('ongs').select('*') // Seleciona tudo dentro da tabela "ongs"

        return response.json(ongs) // Retorna um json com a constante ongs
    },

    async create (request, response) { // Async serve para poder usar o await
        const { name, email, whatsapp, city, uf } = request.body

        const id = crypto.randomBytes(4).toString('HEX') // Gera um id e instancia
    
        await connection('ongs').insert({ // Se conecta com a tabaleta 'ongs' e insere as constantes
            id,                           // Await serve para só dar continuidade qando uma ação for realizada
            name,
            email,
            whatsapp,
            city,
            uf
        })
        console.log(name, email, whatsapp, city, uf, id)
        // O await é necessario para que seja possivel retornar o id
        return response.json({ id }) // Retorna o id para que a ong tenha essa informação
        }
}