import { useNavigate } from "react-router"
import { getUserData, logout } from "../../utils"
import './navbar.css'
import { useState } from "react"

const Navbar = () => {
    const { nome, tipo } = getUserData()
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate()

    const tipoAssistenteOuAdmin = tipo === 'assistente' || tipo === 'admin'
    const tipoAdmin = tipo === 'admin'

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleLogout = () => {
        logout()
        navigate('/login')
    };

    return (
        <nav className="navbar">
            <div>
                <button className="navbar-button" onClick={() => navigate('/')}>SOS Proteção Social</button>
                {tipoAssistenteOuAdmin && <button className="navbar-button button-other-section" onClick={() => navigate('/')}>Denúncias</button>}
                {tipoAssistenteOuAdmin && <button className="navbar-button" onClick={() => navigate('/mapa-denuncia')}>Mapa de denúncias</button>}
                {tipoAdmin && <button className="navbar-button" onClick={() => navigate('/usuarios-tabela')}>Usuários</button>}
            </div>
            {nome ?
                <div className='div-button-login'>
                    <div
                        className="login-button-content"
                        onClick={toggleDropdown}>
                        <p className="name-text-login-button" style={{ marginRight: '10px' }}>{nome}</p>
                        <img src='/login-icon.png' alt="login-icon" width={48} height={48} />
                    </div>

                    {dropdownVisible && (
                        <div className="div-navbar-dropdown-button">
                            <button className="dropdown-button-navbar" onClick={handleLogout}>
                                <img src="/lucide-log-out.png" alt="logout-icon" width={24} height={24} />
                                Sair
                            </button>
                        </div>
                    )}
                </div>
                :
                <button className="not-logged-button" onClick={() => navigate('/login')}><img src='/lucide-user-round.png' alt="user-round" width={24} height={24} /> <p>Login</p></button>
            }
        </nav>
    )
}

export default Navbar