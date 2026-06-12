import { BrowserRouter, Routes, Route } from "react-router-dom"
import Principal from "./pages/principal"
import Login from "./pages/Login"
import Cadastro from "./pages/Cadastro"
import RotaPrivada from "./components/RotaPrivada"


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                  <RotaPrivada>
                    <Principal />
                  </RotaPrivada>
                  } />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />

            </Routes>
        </BrowserRouter>
    )
}

export default App