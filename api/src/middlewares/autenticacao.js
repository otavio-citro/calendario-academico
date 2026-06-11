import jwt from 'jsonwebtoken'

//assinatura do meu servidor, só o servidor tem essa chave
const SECRET_KEY = 'sua_chave_secreta';

export function autenticarToken(req, res, next){
    const cabecalho = req.headers['authorization'];

    //extrair o token, que por padrao vem no formato BEARER
    //bearer psadpiasdjpoasdpasd
    const token = cabecalho && cabecalho.split(' ')[1]

    //validacao se o token esta autorizado.
    if(!token){
        return res.status(401).json({message: 'token não fornecido'})
    }

    //caso o token seja valido e se a assinatura for igual a secret_key 
    // ele permite o acesso
    jwt.verify(token, SECRET_KEY, (error, usuario)=> {
        // token e valido ou se expirou
        if(error){
            return res.status(403).json({message: 'Token invalido ou expirado'})
        }

        req.usuario = usuario
        //passa para a proxima função ou rota
        next()
    })
}