import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Principal = () => {
    const navigate = useNavigate()
    const [dadosLogin, setDadosLogin] = useState(null)

    useEffect(() => {
      async  function buscarUsuario() {
            const UsuarioLogado = await localStorage.getItem('UsuarioLogado')
            if (UsuarioLogado) {
                setDadosLogin(JSON.parse(UsuarioLogado))
            }
        }
        buscarUsuario()
    }, [])

    function botaoSair() {
        localStorage.removeItem('UsuarioLogado')
        setDadosLogin(null)
        navigate('/login')
    }
    return (
        <div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ccc' }}>
                <p style={{ fontSize: '18px' }}> Usuário: {dadosLogin?.usuario?.nome || ''} ({dadosLogin?.usuario?.email  || ''}) </p>
                <button onClick={botaoSair}>sair</button>
            </div>
            <h2>Principal</h2>
        </div>
    )
}

export default Principal