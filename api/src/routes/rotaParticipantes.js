import express, { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from '../middlewares/autenticacao.js'
import jwt from "jsonwebtoken";

const router = Router();

//Criando o endpoint para listar todos as participantes
router.get('/participantes', autenticarToken, async (req, res) => {
    try {
        //cria uma variavel para enviar o comando sql
        const query = `select * from participantes_do_evento`

        //cria uma variavel para receber o retorno do sql
        const participante = await BD.query(query);

        //retorno para a pagina, o json com os dados 
        //buscados do sql
        return res.status(200).json(participante.rows);//200 ok
    } catch (error) {
        console.error('Erro ao listar participantes', error.message);
        return res.status(500).json({ error: 'Erro ao listar participantes'+ error.message })
    }
})

//Endpoint seguro contra sql Injection
router.post('/participantes', autenticarToken, async (req, res) => {
    const { id_usuario, id_evento } = req.body;
    try {
        const comando = `INSERT INTO participantes_do_evento(id_usuario, id_evento) VALUES($1, $2)`
        const valores = [id_usuario, id_evento];

        await BD.query(comando, valores)
        console.log(comando, valores);

        return res.status(201).json("participante cadastrada.");
    } catch (error) {
        let mensagem = 'Erro desconhecido'
        
        if (error.message.includes('participantes_do_evento_id_usuario_fkey')) {
            mensagem = 'Usuario não existe'
        }
        if (error.message.includes('participantes_do_evento_id_evento_fkey')) {
            mensagem = 'Evento não existe'
        }
        console.error('Erro ao cadastrar disciplinas', error.message);
        
        return res.status(500).json({ error: mensagem})
        console.error('Erro ao cadastrar participantes', error.message);
        // return res.status(500).json({ error: 'Erro ao cadastrar participantes'+ error.message })
    }
})

// endpoint para atualizar um unico usuário
// recebendo o parametro pelo id e buscando o calendari0
router.put('/participantes/:id_participante', autenticarToken, async (req, res) => {
    // Id recebido via parametro
    const { id_participante } = req.params;

    // Dados do participante recebido via Corpo da página
    const { id_usuario, id_evento } = req.body;
    try {
        const comando = `UPDATE participantes_do_evento SET id_usuario = $1, id_evento = $2 WHERE
        id_participante = $3`;
        const valores = [id_usuario, id_evento, id_participante];
        await BD.query(comando, valores);

        return res.status(200).json('participante foi atualizada!');
    } catch (error) {
        console.error('Erro ao atualizar participantes', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar participantes'+ error.message })
    }
})

router.delete('/participantes/:id_participante', autenticarToken, async (req, res) => {
    const { id_participante } = req.params;
    try {
        //Executa o comando de delete
        // const comando = `DELETE FROM participanteS WHERE id_participante = $1`
        const comando = `DELETE from participantes_do_evento WHERE id_participante = $1 `
        await BD.query(comando, [id_participante])
        return res.status(200).json({ message: "participante removida com sucesso" })
    } catch (error) {
        console.error('Erro ao atualizar participante', error.message)
        return res.status(500).json({ message: "Erro interno so servidor" + error.message })
    }
})

export default router
