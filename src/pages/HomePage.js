import ConteudoHomePageAdmin from "../components/ConteudoHomePageAdmin"
import ConteudoHomePageAssistente from "../components/ConteudoHomePageAssistente"
import ConteudoHomePageDenunciante from "../components/ConteudoHomePageDenunciante"
import Navbar from "../components/Navbar"
import { getUserData } from "../utils"

const Home = () => {
    const { tipo } = getUserData()
    
    return (
        <section>
            <Navbar />
            {(tipo === 'denunciante' || !tipo) && <ConteudoHomePageDenunciante/>}
            {tipo === 'assistente' && <ConteudoHomePageAssistente/>}
            {tipo === 'admin' && <ConteudoHomePageAdmin/>}
        </section>
    )
}

export default Home