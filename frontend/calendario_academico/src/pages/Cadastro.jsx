import { useEffect, useState } from "react"
import { enredecoServidor, obterToken } from "../Utils"
import { useNavigate, Link } from "react-router-dom"
import { EstilosLogin } from '../styles/EstilosLogin'
import logo from '../assets/logo.png'
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff, MdBadge } from 'react-icons/md'
import { IoMdContact } from "react-icons/io";


const Cadastro = () => {
    const [listaUsuarios, setListaUsuarios] = useState([])
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [perfil, setPerfil] = useState('')
    const [mensagem, setMensagem] = useState('')
    const [mostarSenha, setMostrarSenha] = useState(false)
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
            senha,
            perfil
        }

        try {
            
            const token = obterToken()

            const resposta = await fetch(`${enredecoServidor}/usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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
        
        const token = obterToken()

        try {
            const resposta = await fetch(`${enredecoServidor}/usuarios`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const dados = await resposta.json()
            setListaUsuarios(dados)

        } catch (erro) {
            console.error('Erro ao carregar os dados', erro.message)
        }
    }

    function alternanVisibilidadeSenha() {
        setMostrarSenha(!mostarSenha)
    }

    return (
        <div style={EstilosLogin.container}>
            <header style={EstilosLogin.cabecalho}>
                <img
                    src={logo}
                    alt="Logo"
                    style={EstilosLogin.iconeLogo}
                />
                <div>
                    <h1 style={EstilosLogin.nomeApp}>Calendario</h1>
                    <p style={EstilosLogin.subtituloApp}>Calendario Academico</p>
                </div>
            </header>
            <main style={EstilosLogin.conteudoPrincipal}>
                <form style={EstilosLogin.formularioLogin}>
                    <h2 style={EstilosLogin.titulo}>Cadastro</h2>
                    <div style={EstilosLogin.grupoInput}>
                        <IoMdContact style={EstilosLogin.iconeInput} />
                        <input
                            type="text"
                            placeholder="Digite seu nome"
                            style={EstilosLogin.input}
                            value={nome}
                            onChange={(event) =>
                                setNome(event.target.value)
                            }
                        />
                    </div>

                    <div style={EstilosLogin.grupoInput}>
                        <MdEmail style={EstilosLogin.iconeInput} />
                        <input
                            type="email"
                            placeholder="Digite seu email"
                            style={EstilosLogin.input}
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                        />
                    </div>

                    <div style={EstilosLogin.grupoInput}>
                        <MdLock style={EstilosLogin.iconeInput} />
                        <input
                            type={mostarSenha == true ? 'text' : 'password'}
                            placeholder="Digite sua senha"
                            style={EstilosLogin.input}
                            value={senha}
                            onChange={(event) =>
                                setSenha(event.target.value)
                            }
                        />
                        <button
                            type='button'
                            onClick={alternanVisibilidadeSenha}
                            style={EstilosLogin.alternarVisibilidade}>
                            {mostarSenha == true ? <MdVisibility /> : <MdVisibilityOff />}
                        </button>
                    </div>
                    <div style={EstilosLogin.grupoInput}>
                        <MdBadge style={EstilosLogin.iconeInput} />
                        <select name="perfil"
                            style={EstilosLogin.input}
                            value={perfil}
                            onChange={(e) => setPerfil(e.target.value)}
                        >
                            <option value="">Selecione</option>
                            <option value="aprendiz">Aprendiz</option>
                            <option value="instrutor">Instrutor</option>
                        </select>
                    </div>
                    <button
                        style={EstilosLogin.botaoEntrar}
                        onClick={botaoAdicionar}
                    >
                        Cadastrar
                    </button>

                    {/* <p>
                        já tem conta?{' '}
                        <Link to="/login"
                        style={{textDecoration: 'none', color: 'red' }}
                        onMouseEnter={MouseEntrouLink}
                        onMouseLeave={MouseSaiuLink}
                        >Entrar</Link>
                    </p> */}
                    <p style={EstilosLogin.mensagemFeedback}>{mensagem}</p>
                </form>
            </main>
        </div>
    )
}

export default Cadastro