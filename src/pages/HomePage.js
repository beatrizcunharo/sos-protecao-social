import ConteudoHomePageDenunciante from "../components/ConteudoHomePageDenunciante"
import Navbar from "../components/Navbar"
import { getUserData } from "../utils"

const Home = () => {
    const { tipo } = getUserData()
    
    return (
        <section>
            <Navbar />
            {(tipo === 'denunciante' || !tipo) && <ConteudoHomePageDenunciante/>}
        </section>
    )
}

export default Home