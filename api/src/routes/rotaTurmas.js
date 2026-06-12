import express, { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from '../middlewares/autenticacao.js'
import jwt from "jsonwebtoken";

const router = Router();

//Criando o endpoint para listar todos as turmas
router.get('/turmas', autenticarToken, async (req, res) => {
    try {
        //cria uma variavel para enviar o comando sql
        const query = `SELECT * FROM turmas`

        //cria uma variavel para receber o retorno do sql
        const turmas = await BD.query(query);

        //retorno para a pagina, o json com os dados 
        //buscados do sql
        return res.status(200).json(turmas.rows);//200 ok
    } catch (error) {
        console.error('Erro ao listar turmas', error.message);
        return res.status(500).json({ error: 'Erro ao listar turmas' + error.message})
    }
})

//Endpoint seguro contra sql Injection
router.post('/turmas', autenticarToken, async (req, res) => {
    const { nome, descricao, codigo_turma } = req.body;
    try {
        const comando = `INSERT INTO turmas(nome, descricao, codigo_turma) VALUES($1, $2, $3)`
        const valores = [nome, descricao, codigo_turma];

        await BD.query(comando, valores)
        console.log(comando, valores);

        return res.status(201).json("Turma cadastrada.");
    } catch (error) {
        console.error('Erro ao cadastrar turmas', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar turmas'+ error.message })
    }
})

// endpoint para atualizar um unico usuário
// recebendo o parametro pelo id e buscando o turma
router.put('/turmas/:id_turma', autenticarToken, async (req, res) => {
    // Id recebido via parametro
    const { id_turma } = req.params;

    // Dados do turma recebido via Corpo da página
    const { nome, descricao, codigo_turma } = req.body;
    try {
        //Verificar se o turma existe
        // const verificarTurma = await BD.query(`SELECT * FROM turmas
        //     WHERE id_turma = $1`, [id_turma])
        // if (verificarTurma.rows.length === 0) {
        //     return res.status(404).json({ message: 'turma não encontrado' })
        // }

        // Atualiza todos os campos da tabela(PUT Substituição completa)
        const comando = `UPDATE turmas SET nome = $1, descricao = $2, codigo_turma = $3 WHERE
        id_turma = $4`;
        const valores = [nome, descricao, codigo_turma, id_turma];
        await BD.query(comando, valores);

        return res.status(200).json('turma foi atualizada!');
    } catch (error) {
        console.error('Erro ao atualizar turmas', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar turmas'+ error.message })
    }
})

router.delete('/turmas/:id_turma', autenticarToken, async (req, res) => {
    const { id_turma } = req.params;
    try {
        //Executa o comando de delete
        // const comando = `DELETE FROM turmaS WHERE id_turma = $1`
        const comando = `DELETE from turmas WHERE id_turma = $1 `
        await BD.query(comando, [id_turma])
        return res.status(200).json({ message: "turma removido com sucesso" })
    } catch (error) {
        console.error('Erro ao atualizar turma', error.message)
        return res.status(500).json({ message: "Erro interno so servidor" + error.message })
    }
})

export default router
