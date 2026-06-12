import express, { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from '../middlewares/autenticacao.js'
import jwt from "jsonwebtoken";

const router = Router();

//Criando o endpoint para listar todos as calendarios
router.get('/calendarios', autenticarToken, async (req, res) => {
    try {
        //cria uma variavel para enviar o comando sql
        const query = `select * from calendarios`

        //cria uma variavel para receber o retorno do sql
        const calendario = await BD.query(query);

        //retorno para a pagina, o json com os dados 
        //buscados do sql
        return res.status(200).json(calendario.rows);//200 ok
    } catch (error) {
        console.error('Erro ao listar calendarios', error.message);
        return res.status(500).json({ error: 'Erro ao listar calendarios'+ error.message })
    }
})

//Endpoint seguro contra sql Injection
router.post('/calendarios', autenticarToken, async (req, res) => {
    const { nome, id_usuario, id_turma } = req.body;
    try {
        const comando = `INSERT INTO calendarios(nome, id_usuario, id_turma) VALUES($1, $2, $3)`
        const valores = [nome, id_usuario, id_turma];

        await BD.query(comando, valores)
        console.log(comando, valores);

        return res.status(201).json("calendario cadastrada.");
    } catch (error) {
        let mensagem = 'Erro desconhecido'
        
        if (error.message.includes('calendarios_id_usuario_fkey')) {
            mensagem = 'Usuario não existe'
        }
        if (error.message.includes('calendarios_id_turma_fkey')) {
            mensagem = 'Turma não existe'
        }
        console.error('Erro ao cadastrar disciplinas', error.message);
        
        return res.status(500).json({ error: mensagem})
        console.error('Erro ao cadastrar calendarios', error.message);
        // return res.status(500).json({ error: 'Erro ao cadastrar calendarios'+ error.message })
    }
})

// endpoint para atualizar um unico usuário
// recebendo o parametro pelo id e buscando o calendari0
router.put('/calendarios/:id_calendario', autenticarToken, async (req, res) => {
    // Id recebido via parametro
    const { id_calendario } = req.params;

    // Dados do calendario recebido via Corpo da página
    const { nome, id_usuario, id_turma } = req.body;
    try {
        const comando = `UPDATE calendarios SET nome = $1, id_usuario = $2, id_turma = $3 WHERE
        id_calendario = $4`;
        const valores = [nome, id_usuario, id_turma, id_calendario];
        await BD.query(comando, valores);

        return res.status(200).json('calendario foi atualizada!');
    } catch (error) {
        console.error('Erro ao atualizar calendarios', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar calendarios' + error.message})
    }
})

router.delete('/calendarios/:id_calendario', autenticarToken, async (req, res) => {
    const { id_calendario } = req.params;
    try {
        //Executa o comando de delete
        // const comando = `DELETE FROM calendarioS WHERE id_calendario = $1`
        const comando = `DELETE from calendarios WHERE id_calendario = $1 `
        await BD.query(comando, [id_calendario])
        return res.status(200).json({ message: "calendario removida com sucesso" })
    } catch (error) {
        console.error('Erro ao atualizar calendario', error.message)
        return res.status(500).json({ message: "Erro interno so servidor" + error.message })
    }
})

export default router
