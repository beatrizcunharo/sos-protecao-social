import ConteudoHomePageDenunciante from "../../components/ConteudoHomePageDenunciante/index.js"
import ConteudoHomePageAssistente from "../../components/ConteudoHomePageAssistente.js"
import ConteudoHomePageAdmin from "../../components/ConteudoHomePageAdmin.js"
import Navbar from "../../components/Navbar"
import { getUserData } from "../../utils"

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