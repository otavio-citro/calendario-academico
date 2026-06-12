import express, { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from '../middlewares/autenticacao.js'
import jwt from "jsonwebtoken";

const router = Router();

//Criando o endpoint para listar todos as turmas
router.get('/eventos', autenticarToken, async (req, res) => {
    try {
        //cria uma variavel para enviar o comando sql
        const query = `SELECT
      id_evento,
      titulo,
      tipo,
      TO_CHAR(inicio, 'DD/MM/YYYY') AS inicio,  
      TO_CHAR(fim, 'DD/MM/YYYY') AS fim,
      id_calendario,
      id_disciplina,
      criado_por,
      bloqueado,
      nome_recorrencia,
      frequencia_recorrencia
      FROM eventos  
        `

        //cria uma variavel para receber o retorno do sql
        const eventos = await BD.query(query);

        //retorno para a pagina, o json com os dados 
        //buscados do sql
        return res.status(200).json(eventos.rows);//200 ok
    } catch (error) {
        console.error('Erro ao listar eventos', error.message);
        return res.status(500).json({ error: 'Erro ao listar eventos'+ error.message })
    }
})

//Endpoint seguro contra sql Injection
router.post('/eventos', autenticarToken, async (req, res) => {
    const { titulo, tipo, inicio, fim, id_calendario, id_disciplina, criado_por, bloqueado, nome_recorrencia, frequencia_recorrencia } = req.body;
    try {
        const comando = `INSERT INTO eventos(titulo, tipo, inicio, fim, id_calendario, id_disciplina, criado_por, bloqueado, nome_recorrencia, frequencia_recorrencia) VALUES($1, $2, $3, $4 , $5, $6, $7, $8, $9, $10)`
        const valores = [titulo, tipo, inicio, fim, id_calendario, id_disciplina, criado_por, bloqueado, nome_recorrencia, frequencia_recorrencia];

        await BD.query(comando, valores)
        console.log(comando, valores);

        return res.status(201).json("eventos cadastrado.");
    } catch (error) {
        let mensagem = 'Erro desconhecido'
        
        if (error.message.includes('eventos_id_calendario_fkey')) {
            mensagem = 'Calendario não existe'
        }
        if (error.message.includes('eventos_id_disciplina_fkey')) {
            mensagem = 'Disciplina não existe'
        }
        if (error.message.includes('eventos_criado_por_fkey')) {
            mensagem = 'Usuario não existe'
        }
        console.error('Erro ao cadastrar disciplinas', error.message);
        
        return res.status(500).json({ error: mensagem})
        console.error('Erro ao cadastrar evento', error.message);
        // return res.status(500).json({ error: 'Erro ao cadastrar evento'+ error.message })
    }
})

// endpoint para atualizar um unico usuário
// recebendo o parametro pelo id e buscando o turma
router.put('/eventos/:id_evento', autenticarToken, async (req, res) => {
    // Id recebido via parametro
    const { id_evento } = req.params;

    // Dados do turma recebido via Corpo da página
    const { titulo, tipo, inicio, fim, id_calendario, id_disciplina, criado_por, bloqueado, nome_recorrencia, frequencia_recorrencia } = req.body;
    try {
        //Verificar se o turma existe
        // const verificarTurma = await BD.query(`SELECT * FROM turmas
        //     WHERE id_turma = $1`, [id_turma])
        // if (verificarTurma.rows.length === 0) {
        //     return res.status(404).json({ message: 'turma não encontrado' })
        // }

        // Atualiza todos os campos da tabela(PUT Substituição completa)
        const comando = `UPDATE eventos SET titulo = $1, tipo = $2, inicio = $3, fim = $4, id_calendario = $5, id_disciplina = $6, criado_por = $7, bloqueado = $8, nome_recorrencia = $9, frequencia_recorrencia = $10 WHERE
        id_evento = $11`;
        const valores = [titulo, tipo, inicio, fim, id_calendario, id_disciplina, criado_por, bloqueado, nome_recorrencia, frequencia_recorrencia, id_evento];
        await BD.query(comando, valores);

        return res.status(200).json('evento foi atualizado!');
    } catch (error) {
        console.error('Erro ao atualizar evento', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar evento'+ error.message })
    }
})

router.delete('/eventos/:id_evento', autenticarToken, async (req, res) => {
    const { id_evento } = req.params;
    try {
        //Executa o comando de delete
        // const comando = `DELETE FROM turmaS WHERE id_turma = $1`
        const comando = `DELETE from eventos WHERE id_evento = $1 `
        await BD.query(comando, [id_evento])
        return res.status(200).json({ message: "evento removido com sucesso" })
    } catch (error) {
        console.error('Erro ao atualizar evento', error.message)
        return res.status(500).json({ message: "Erro interno so servidor" + error.message })
    }
})

export default router
