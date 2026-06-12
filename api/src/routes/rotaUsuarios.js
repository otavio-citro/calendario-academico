import express, { Router } from 'express'
import { BD } from '../../db.js'
import bcrypt from 'bcrypt'
import { autenticarToken } from '../middlewares/autenticacao.js'
import jwt from 'jsonwebtoken'
const router = Router()
const SECRET_KEY = 'sua_chave_secreta'
router.get('/usuarios', autenticarToken, async (req, res) => {
    try {
        //cria uma variavel para enviar o comando sql
        const query = ` select u.id_usuario, u.nome, u.email, u.perfil, to_char(criado_em, 'DD/MM/YYYY HH24:MI') as criado_em
                        from usuarios u where ativo = true order by id_usuario`
        //cria uma variavel para reveber o retorno no sql
        const usuarios = await BD.query(query);

        //retorno para a pagina o json com os dados
        //buscandos do sql
        return res.status(200).json(usuarios.rows);

    } catch (error) {
        console.error('Erro ao listar usuarios', error.message)
        return res.status(500).json({ error: 'Erro ao listar usuarios' + error.message })
    }
})

router.post('/usuarios', autenticarToken,async (req, res) => {
    const { nome, email, senha, perfil } = req.body

    console.log(nome);

    try {
        //definir a força da criptografia
        const saltRounds = 10;
        //gerando a hash da senha
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds)
        const comando = `insert into usuarios(nome, email, senha, perfil) values($1, $2, $3, $4)`
        const valores = [nome, email, senhaCriptografada, perfil]


        const responsta = await BD.query(comando, valores)
        console.log(responsta);


        return res.status(201).json('usuario cadastrado' + error.message)
    } catch (error) {
        let mensagem = 'Erro desconhecido'
        if (error.message.includes('usuarios_email_key')) {
            mensagem = 'Email ja existe'
        }
        console.error('Erro ao atualizar usuarios', error.message)
        return res.status(500).json({ error: mensagem})
    }

})

router.put('/usuarios/:id_usuario', autenticarToken, async (req, res) => {
    //id recebido via parametro
    const { id_usuario } = req.params;
    //dados de usuario recebido via corpo da pagina
    const { nome, email, senha, perfil } = req.body
    try {

        //verificar se o usuario existe
        const verificarUsuario = await BD.query(`SELECT * FROM usuarios where id_usuario = $1 and ativo = true`, [id_usuario]);
        if (verificarUsuario.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario nâo encontrado' + error.message})
        }
        const saltRounds = 10;
        //gerando a hash da senha
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds)
        //atualiza todos os campos da tabela(PUT substituição completa)
        const comando = `UPDATE usuarios SET nome = $1, email = $2, senha = $3, perfil = $4 where id_usuario = $5`;
        const valores = [nome, email, senhaCriptografada, perfil, id_usuario];
        await BD.query(comando, valores)

        return res.status(200).json('usuario atualizado' + error.message)
    } catch (error) {
        console.error('Erro ao atualizar usuarios', error.message)
        return res.status(500).json({ error: 'Erro ao atualizar usuarios' + error.message})
    }
})

router.delete('/usuarios/:id_usuario', autenticarToken, async (req, res) => {
    const { id_usuario } = req.params
    try {
        //executa o comando de delete
        const comando = `update usuarios set ativo = false where id_usuario = $1`
        await BD.query(comando, [id_usuario])
        return res.status(200).json({ message: 'usuario removido com sucesso' })
    } catch (error) {
        console.error('erro ao deletar usuario', error.message)
        return res.status(500).json({ message: "erro interno no servidor" + error.message })
    }

})

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'campo obrigatorio vago!' });
    }

    try {
        const comando = 'SELECT id_usuario, nome, email, senha FROM usuarios WHERE email = $1 and ativo = true';
        const resultado = await BD.query(comando, [email]);

        if (resultado.rows.length === 0) {
            return res.status(401).json({ message: 'email nao encontrado' });
        }

        const usuario = resultado.rows[0];
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
        if (!senhaCorreta) {
            return res.status(401).json({ message: 'senha incorreta' });
        }

        //gerando token para retornar e ser usado
        const token = jwt.sign(
            { id_usuario: usuario.id_usuario, email: usuario.email },
            SECRET_KEY,
            //{expires: '15m'} //tempo para expirar o token
        )


        return res.status(200).json({
            message: "login realizado com sucesso",
            token: token,
            usuario: {
                id: usuario.id_usuario,
                nome: usuario.nome,
                email: usuario.email
            }
        });

    } catch (error) {
        console.error('erro no login', error.message);
        return res.status(500).json({ message: "erro interno no servidor" + error.message});
    }
});

export default router