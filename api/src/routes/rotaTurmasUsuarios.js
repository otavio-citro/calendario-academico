import express, { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from '../middlewares/autenticacao.js'
import jwt from "jsonwebtoken";

const router = Router();

//Criando o endpoint para listar todos as turmas
router.get('/turmasUsuarios', autenticarToken, async (req, res) => {
    try {
        //cria uma variavel para enviar o comando sql
        const query = `SELECT
        tu.id_turma_usuario,
        t.nome as nome_turma,
        t.descricao as descricao,
        t.codigo_turma as codigo_turma,
        u.nome as nome_usuario
        FROM turmas_usuarios tu
        INNER JOIN turmas t ON tu.id_turma = t.id_turma
        INNER JOIN usuarios u ON tu.id_usuario = u.id_usuario
        `

        //cria uma variavel para receber o retorno do sql
        const turmas_usuarios = await BD.query(query);

        //retorno para a pagina, o json com os dados 
        //buscados do sql
        return res.status(200).json(turmas_usuarios.rows);//200 ok
    } catch (error) {
        console.error('Erro ao listar usuarios da turma', error.message);
        return res.status(500).json({ error: 'Erro ao listar usuarios da turma'+ error.message })
    }
})

//Endpoint seguro contra sql Injection
router.post('/turmasUsuarios', autenticarToken, async (req, res) => {
    const { id_usuario, id_turma } = req.body;
    try {
        const comando = `INSERT INTO turmas_usuarios(id_usuario, id_turma) VALUES($1, $2)`
        const valores = [id_usuario, id_turma];

        await BD.query(comando, valores)
        console.log(comando, valores);

        return res.status(201).json("usuarios da turma cadastrado.");
    } catch (error) {
        let mensagem = 'Erro desconhecido'
        
        if (error.message.includes('turmas_usuarios_id_usuario_fkey')) {
            mensagem = 'Usuario não existe'
        }
        if (error.message.includes('turmas_usuarios_id_turma_fkey')) {
            mensagem = 'Turma não existe'
        }
        console.error('Erro ao cadastrar disciplinas', error.message);
        
        return res.status(500).json({ error: mensagem})
        console.error('Erro ao cadastrar usuario da turma', error.message);
        // return res.status(500).json({ error: 'Erro ao cadastrar usuario da turma'+ error.message })
    }
})

// endpoint para atualizar um unico usuário
// recebendo o parametro pelo id e buscando o turma
router.put('/turmasUsuarios/:id_turma_usuario', autenticarToken, async (req, res) => {
    // Id recebido via parametro
    const { id_turma_usuario } = req.params;

    // Dados do turma recebido via Corpo da página
    const { id_usuario, id_turma } = req.body;
    try {
        //Verificar se o turma existe
        // const verificarTurma = await BD.query(`SELECT * FROM turmas
        //     WHERE id_turma = $1`, [id_turma])
        // if (verificarTurma.rows.length === 0) {
        //     return res.status(404).json({ message: 'turma não encontrado' })
        // }

        // Atualiza todos os campos da tabela(PUT Substituição completa)
        const comando = `UPDATE turmas_usuarios SET id_usuario = $1, id_turma = $2 WHERE
        id_turma_usuario = $3`;
        const valores = [id_usuario, id_turma, id_turma_usuario];
        await BD.query(comando, valores);

        return res.status(200).json('usuario da turma foi atualizada!');
    } catch (error) {
        console.error('Erro ao atualizar usuario da turma', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar usuario da turma'+ error.message })
    }
})

router.delete('/turmasUsuarios/:id_turma_usuario', autenticarToken, async (req, res) => {
    const { id_turma_usuario } = req.params;
    try {
        //Executa o comando de delete
        // const comando = `DELETE FROM turmaS WHERE id_turma = $1`
        const comando = `DELETE from turmas_usuarios WHERE id_turma_usuario = $1 `
        await BD.query(comando, [id_turma_usuario])
        return res.status(200).json({ message: "usuario da turma removido com sucesso" })
    } catch (error) {
        console.error('Erro ao atualizar turma', error.message)
        return res.status(500).json({ message: "Erro interno so servidor" + error.message })
    }
})

export default router
