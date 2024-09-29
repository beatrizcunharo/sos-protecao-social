import { getUserData } from "../utils"
import OpcaoDenunciaBusca from "./OpcaoDenunciaBusca"

const ConteudoHomePage = () => {
    const { tipo } = getUserData()
    return (
        <section className="section-conteudo-home-page">
            {tipo === 'denunciante' && <OpcaoDenunciaBusca />}
        </section>
    )
}

export default ConteudoHomePage