import { useState , useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { enredecoServidor } from '../Utils'
import logo from '../assets/logo.png'
import {EstilosLogin} from '../styles/EstilosLogin'
import {MdEmail, MdLock, MdVisibility, MdVisibilityOff} from 'react-icons/md'


const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('admin@gmail.com')
    const [senha, setSenha] = useState('admin')
    const [mensagem, setMensagem] = useState('')
    const [mostarSenha, setMostrarSenha] = useState(false)
    const [lembrar, setLembrar] = useState(false)

    useEffect(() => {
      async  function buscarUsuario() {
            const UsuarioLogado = await localStorage.getItem('UsuarioLogado')
            if (UsuarioLogado) {
                const usuario = JSON.parse(UsuarioLogado)
                if (usuario.lembrar == true) {
                    navigate('/principal')
                }
            }
        }
        buscarUsuario()
    }, [])

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

    const botaoEntrar = async (event) => {
        event.preventDefault()

        try {
            if (email === '' || senha === '') {
                throw new Error('Preencha todos os campos')
            }

            const dadosLogin = {
                email: email,
                senha: senha
            }

            const resposta = await fetch(`${enredecoServidor}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosLogin)
            })
            if (resposta.status == 404) {
                setMensagem(`Rota não encontrada:${resposta.url}`)
                return
            }
            const dados = await resposta.json()

            if (resposta.status == 500) {
                setMensagem(dados.message)
                return
            }

            if (resposta.ok) {
                console.log('login bem sucedido', dados)
                setMensagem('Login bem sucedido')
                localStorage.setItem('UsuarioLogado', JSON.stringify({...dados, lembrar}))
                navigate('/')
            } else {
                setMensagem('email ou senha incorretos')
                console.log('erro ao fazer login', dados)
            }

        } catch (error) {
            console.error('Erro ao realizar login', error)
            setMensagem(error.message)
        }
    }

    function alternanVisibilidadeSenha (){
        setMostrarSenha(!mostarSenha)
    }

    return (
        <div style={EstilosLogin.container}>
            <header style={EstilosLogin.cabecalho}>
                <img 
                src={logo}
                style={EstilosLogin.iconeLogo}/>
                <div>
                    <h1 style={EstilosLogin.nomeApp}>Calendario</h1>
                    <p style={EstilosLogin.subtituloApp}>Calendario Academico</p>
                </div>
            </header>

            <main style={EstilosLogin.conteudoPrincipal}>
                <form style={EstilosLogin.formularioLogin}>
                    <h2 style={EstilosLogin.titulo}>Acesse sua conta</h2>
                    <div style={EstilosLogin.grupoInput}>
                        <MdEmail style={EstilosLogin.iconeInput} />
                        <input 
                        type='email' 
                        style={EstilosLogin.input}
                        placeholder='Digite seu email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div style={EstilosLogin.grupoInput}>
                        <MdLock style={EstilosLogin.iconeInput} />
                        <input 
                        type={mostarSenha == true ? 'text' : 'password'}
                        style={EstilosLogin.input}
                        placeholder='Digite seu senha'
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        />
                        <button
                        type='button'
                        onClick={alternanVisibilidadeSenha}
                        style={EstilosLogin.alternarVisibilidade}>
                            {mostarSenha == true ? <MdVisibility/> : <MdVisibilityOff/>}
                        </button>
                    </div>
                    <div style={EstilosLogin.entreOpcoes}>
                        <div style={EstilosLogin.containerCheckbox}>
                            <input type="checkbox" style={EstilosLogin.checkbox} 
                            checked={lembrar} onChange={(e) => setLembrar(e.target.checked)}
                            />
                            <label>Lembrar me</label>
                        </div>
                        <a href="#" style={EstilosLogin.esqueceuSenha}>Esqueceu a senha?</a>
                    </div>
                    <button 
                    type='submit' 
                    style={EstilosLogin.botaoEntrar} 
                    onClick={botaoEntrar}>
                        Entrar
                    </button>
                    <p style={EstilosLogin.mensagemFeedback}>{mensagem}</p>
                </form>
            </main>
        </div>
    )
}

// /** @type {{ [key: string]: import('react').CSSProperties }} */
// const estilos = {
//     container: {
//         display: 'flex',
//         minHeight: '100vh',
//         width: '100%'
//     },

//     banner: {
//         width: '70%',
//         height: '100vh',
//         objectFit: 'cover'
//     },

//     ladoFormulario: {
//         width: '30%',
//         minHeight: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#f5f5f5'
//     },

//     loginConteudo: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         width: '80%',
//         maxWidth: '350px',
//         padding: '30px',
//         borderRadius: '12px',
//         gap: '12px',
//         backgroundColor: '#ffffff',
//         boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
//     },

//     titulo: {
//         margin: '5px 0 10px 0'
//     },

//     logo: {
//         height: '50px',
//         marginBottom: '10px',

//     },

//     grupoInput: {
//         width: '100%'
//     },

//     label: {
//         display: 'block',
//         fontWeight: 'bold',
//         marginBottom: '5px'
//     },

//     input: {
//         width: '100%',
//         padding: '10px',
//         borderRadius: '6px',
//         border: '1px solid #ccc',
//         outline: 'none',
//         fontSize: '16px',
//         boxSizing: 'border-box'
//     },

//     botao: {
//         width: '100%',
//         backgroundColor: '#e30613',
//         color: '#fff',
//         padding: '12px',
//         border: 'none',
//         borderRadius: '6px',
//         cursor: 'pointer',
//         fontSize: '16px',
//         fontWeight: 'bold'
//     },

//     mensagem: {
//         minHeight: '20px',
//         fontWeight: 'bold'
//     }
// }

export default Login