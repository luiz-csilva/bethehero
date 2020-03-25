const connection = require('../database/connection') // Requer o arquivo que faz a conexão com o banco

module.exports = {
    async index (request, response) {
        const { page =  1 } = request.query // Cria a paginação

        const [count] = await connection('casos') // Conta o total de casos
            .count()

        const casos = await connection('casos')
            .join('ongs', 'ongs.id', '=', 'casos.ong_id')
            .limit(5)
            .offset((page - 1) * 5) // Configurando sistema de paginação, definido 5 como limite por pagina
            .select([
                'casos.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ])

        response.header('X-Total-Count', count['count(*)']) // Define no header da resposta a quantidade total de casos

        response.json (casos)
    },

    async create (request, response) {
        const { title, description, value } = request.body
        const ong_id = request.headers.authorization // Busca dentro do header o id da ong passado no authorization

        const [id] /* Cria um id para o caso */ = await connection('casos').insert({ // Insere na tabela casos
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id })
    },

    async del (request, response) {
        const { id } = request.params 
        const ong_id = request.headers.authorization

        const casos = await connection('casos') // Seleciona o primeiro (unica) caso com o id especificado
            .where('id', id)
            .select('ong_id')
            .first()

        if (casos.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permited' }) // Status 401 não autorizado caso o id de autorização seja diferente do que criou o caso
        }

        await connection('casos').where('id', id).delete() // Deleta o caso com o id especificado

        return response.status(204).send() // Responde com o status 204 informando que não há mais caso com aquele id
    }
}