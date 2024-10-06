import { useNavigate } from "react-router"
import { ScrollToTop } from "../utils"

const MinhasDenuncias = ({ denuncias, hasUser }) => {
    const navigate = useNavigate()

    return (
        <section className="minhas-denuncias">
            <p className="title-minhas-denuncias">{hasUser ? 'Minha denúncias' : 'Denúncias'}</p>
            <div style={{ marginLeft: 0, margin: '15px' }}>
                {denuncias.map((item) => {
                    return (
                        <div className="minha-denuncia-content">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p className="title-minha-denuncia">Protocolo: {item.protocolo}</p>
                                <button className="minhas-denuncias-detalhe-button" onClick={() => navigate('/detalhes-denuncia', { state: { protocolo: item.protocolo } })}><img src='/lucide-list-collapse.png' />Detalhes</button>
                            </div>
                            <div style={{ display: 'flex', gap: '50px' }}>
                                <p className="title-minha-denuncia">Situação: {item.status}</p>
                                <p className="title-minha-denuncia">Data de abertura: {item.dataCriacao}</p>
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