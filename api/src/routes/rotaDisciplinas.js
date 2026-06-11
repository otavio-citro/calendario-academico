import express, { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from '../middlewares/autenticacao.js'
import jwt from "jsonwebtoken";

const router = Router();

//Criando o endpoint para listar todos as disciplinas
router.get('/disciplinas', autenticarToken, async (req, res) => {
    try {
        //cria uma variavel para enviar o comando sql
        const query = `
        select 
        d.id_disciplina,
        d.nome,
        d.carga_horaria,
        to_char(data_inicio, 'DD/MM/YYYY') as inicio,
        to_char(data_fim, 'DD/MM/YYYY') as fim , d.id_turma,
        d.id_instrutor from disciplinas d order by id_disciplina`

        //cria uma variavel para receber o retorno do sql
        const disciplinas = await BD.query(query);

        //retorno para a pagina, o json com os dados 
        //buscados do sql
        return res.status(200).json(disciplinas.rows);//200 ok
    } catch (error) {
        console.error('Erro ao listar disciplinas', error.message);
        return res.status(500).json({ error: 'Erro ao listar disciplinas' })
    }
})

//Endpoint seguro contra sql Injection
router.post('/disciplinas', autenticarToken, async (req, res) => {
    const { nome, carga_horaria, data_inicio, data_fim, id_turma, id_instrutor } = req.body;
    try {
        const comando = `INSERT INTO disciplinas
        (nome, carga_horaria, data_inicio, data_fim, id_turma, id_instrutor)
        VALUES
        ($1,$2,$3,$4,$5,$6)`
        const valores = [
            nome, carga_horaria, data_inicio, data_fim, id_turma, id_instrutor
        ];

        await BD.query(comando, valores)
        console.log(comando, valores);

        return res.status(201).json("disciplina cadastrada.");
    } catch (error) {
        console.error('Erro ao cadastrar disciplinas', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar disciplinas' })
    }
})

// endpoint para atualizar um unico usuário
// recebendo o parametro pelo id e buscando o disciplina
router.put('/disciplinas/:id_disciplina', autenticarToken, async (req, res) => {
    // Id recebido via parametro
    const { id_disciplina } = req.params;

    // Dados do disciplina recebido via Corpo da página
    const { nome, carga_horaria, data_inicio, data_fim, id_turma, id_instrutor } = req.body;
    try {
        const comando = `UPDATE disciplinas SET nome = $1, carga_horaria = $2, data_inicio = $3, data_fim = $4, id_turma = $5, id_instrutor = $6 WHERE
        id_disciplina = $7`;
        const valores = [nome, carga_horaria, data_inicio, data_fim, id_turma, id_instrutor, id_disciplina];
        await BD.query(comando, valores);

        return res.status(200).json('disciplina foi atualizada!');
    } catch (error) {
        console.error('Erro ao atualizar disciplinas', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar disciplinas' })
    }
})

router.delete('/disciplinas/:id_disciplina', autenticarToken, async (req, res) => {
    const { id_disciplina } = req.params;
    try {
        //Executa o comando de delete
        // const comando = `DELETE FROM disciplinaS WHERE id_disciplina = $1`
        const comando = `DELETE from disciplinas WHERE id_disciplina = $1 `
        await BD.query(comando, [id_disciplina])
        return res.status(200).json({ message: "disciplina removida com sucesso" })
    } catch (error) {
        console.error('Erro ao atualizar disciplina', error.message)
        return res.status(500).json({ message: "Erro interno so servidor" + error.message })
    }
})

export default router
