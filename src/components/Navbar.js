import { useNavigate } from "react-router"
import { getUserData } from "../utils"

const Navbar = () => {
    const { nome } = getUserData()
    const navigate = useNavigate()

    return (
        <nav className="navbar">
            <button className="home-button" onClick={() => navigate('/')}>SOS Proteção Social</button>
            {nome ? 
                <div className="login-button-content"><p className="name-text">{nome}</p><img src='/login-icon.png' alt="login-incon" width={48} height={48}/></div>
            :
                <button className="not-logged-button" onClick={() => navigate('/login')}><img src='/lucide-user-round.png' alt="user-round" width={24} height={24} /> <p>Login</p></button>
            }
        </nav>
    )
}

export default Navbar