import { getNameLogin } from "../utils"

const Navbar = () => {
    const name = getNameLogin()
    return (
        <nav className="navbar">
            <button className="home-button">Sistema de Denúncias</button>
            {name ? 
                <div className="login-button-content"><p className="name-text">{name}</p><img src='/login-icon.png' width={48} height={48}/></div>
            :
                <button className="not-logged-button"><img src='/lucide-user-round.png' width={24} height={24} /> <p>Login</p></button>
            }
        </nav>
    )
}

export default Navbar