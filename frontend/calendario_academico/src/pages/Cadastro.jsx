import { useEffect, useState } from "react"
import { enredecoServidor } from "../Utils"
import { useNavigate, Link } from "react-router-dom"

const Cadastro = () => {
    const [listaUsuarios, setListaUsuarios] = useState([])
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const navigate = useNavigate()

     function MouseEntrouLink(event) {
        event.target.style.textDecoration = 'underline';
    }
    function MouseSaiuLink(event) {
        event.target.style.textDecoration = 'none';
    }
     function MouseEntrouBotao(event) {
        event.target.style.backgroundColor = '#F21A28';
    }
    function MouseSaiuBotao(event) {
        event.target.style.backgroundColor = '#E30613';
    }

    async function botaoAdicionar() {
        const novoUsuario = {
            nome,
            email,
            senha
        }

        try {
            const resposta = await fetch(`${enredecoServidor}/usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoUsuario)
            })

            if (!resposta.ok) {
                throw new Error('Erro ao adicionar usuários')
            }

            navigate('/login')
            buscarDados()
            limparCampos()

        } catch (erro) {
            console.error('Erro ao adicionar usuário', erro.message)
        }
    }

    function limparCampos() {
        setNome('')
        setEmail('')
        setSenha('')
    }

    useEffect(() => {
        buscarDados()
    }, [])

    async function buscarDados() {
        try {
            const resposta = await fetch(`${enredecoServidor}/usuarios`)
            const dados = await resposta.json()
            setListaUsuarios(dados)

        } catch (erro) {
            console.error('Erro ao carregar os dados', erro.message)
        }
    }

    return (
        <div style={estilos.container}>
            <img
                src="../images/bannerFundoSesi.jpg"
                alt="Banner SESI SENAI"
                style={estilos.banner}
            />

            <div style={estilos.ladoFormulario}>
                <div style={estilos.loginConteudo}>
                    <img
                        src="../images/bannerlogo.png"
                        alt="Logo"
                        style={estilos.logo}
                    />

                    <h2 style={estilos.titulo}>Cadastro</h2>

                    <div style={estilos.grupoInput}>
                        <label>Nome</label>
                        <input
                            type="text"
                            placeholder="Digite seu nome"
                            style={estilos.input}
                            value={nome}
                            onChange={(event) =>
                                setNome(event.target.value)
                            }
                        />
                    </div>

                    <div style={estilos.grupoInput}>
                        <label>Email</label>
                        <input
                            type="Email"
                            placeholder="Digite seu email"
                            style={estilos.input}
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                        />
                    </div>

                    <div style={estilos.grupoInput}>
                        <label >Senha</label>
                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            style={estilos.input}
                            value={senha}
                            onChange={(event) =>
                                setSenha(event.target.value)
                            }
                        />
                    </div>

                    <button
                        style={estilos.botao}
                        onClick={botaoAdicionar}
                        onMouseEnter={MouseEntrouBotao}
                        onMouseLeave={MouseSaiuBotao}
                    >
                        Cadastrar
                    </button>

                    <p>
                        já tem conta?{' '}
                        <Link to="/login"
                        style={{textDecoration: 'none', color: 'red' }}
                        onMouseEnter={MouseEntrouLink}
                        onMouseLeave={MouseSaiuLink}
                        >Entrar</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

const estilos = {
    container: {
        display: 'flex',
        minHeight: '100vh',
        width: '100%'
    },

    banner: {
        width: '70%',
        height: '100vh',
        objectFit: 'cover'
    },

    ladoFormulario: {
        width: '30%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
    },

    loginConteudo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '80%',
        maxWidth: '350px',
        padding: '30px',
        borderRadius: '12px',
        gap: '12px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
    },

    titulo: {
        margin: '5px 0 10px 0'
    },

    logo: {
        height: '50px',
        marginBottom: '10px'
    },

    grupoInput: {
        width: '100%'
    },

    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        outline: 'none',
        fontSize: '16px',
        boxSizing: 'border-box'
    },

    botao: {
        width: '100%',
        backgroundColor: '#e30613',
        color: '#fff',
        padding: '12px',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold'
    }
}

export default Cadastro