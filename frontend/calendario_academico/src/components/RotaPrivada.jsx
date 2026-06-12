import { Navigate } from "react-router-dom"

const RotaPrivada = ({ children }) => {
    const usuario = localStorage.getItem("UsuarioLogado")

    if (!usuario) {
        return <Navigate to="/login" />
    }

    return children
}

export default RotaPrivada