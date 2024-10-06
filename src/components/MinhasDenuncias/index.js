import { useNavigate } from "react-router"
import { ScrollToTop } from "../../utils"
import './minhasDenuncias.css'
import TituloForm from "../TituloForm"

const MinhasDenuncias = ({ denuncias, hasUser }) => {
    const navigate = useNavigate()

    return (
        <section className="minhas-denuncias">
            <TituloForm titulo={hasUser ? 'Minha denúncias' : 'Denúncias'} />
            <div className="minhas-denuncias-component-content">
                {denuncias.map((item) => {
                    return (
                        <div className="minha-denuncia-content">
                            <div className="minha-denuncia-content-items">
                                <TituloForm titulo={`Protocolo: ${item.protocolo}`} />
                                <button className="minhas-denuncias-detalhe-button" onClick={() => navigate('/detalhes-denuncia', { state: { protocolo: item.protocolo } })}><img src='/lucide-list-collapse.png' alt="detalhes"/>Detalhes</button>
                            </div>
                            <div className="minha-denuncia-content-other-items">
                                <TituloForm titulo={`Situação: ${item.status}`} />
                                <TituloForm titulo={`Data de abertura: ${item.dataCriacao}`} />
                            </div>
                        </div>
                    )
                })}
            </div>
            {ScrollToTop()}
        </section>
    )
}

export default MinhasDenuncias