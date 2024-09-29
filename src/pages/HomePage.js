import ConteudoHomePage from "../components/ConteudoHomePageDenunciante"
import Navbar from "../components/Navbar"
import { getUserData } from "../utils"

const Home = () => {
    const { tipo } = getUserData()

    return (
        <section>
            <Navbar />
            {(tipo && tipo === 'denunciante') && <ConteudoHomePage/>}
        </section>
    )
}

export default Home