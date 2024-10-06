import { useNavigate } from "react-router"
import { getUserData } from "../utils"

const DetalhesDenunciaTable = ({ details }) => {
    const userData = getUserData()
    const navigate = useNavigate()

    const maxHeight = userData.tipo === 'assistente' ? '800px' : '500px'

    return (
        <section className="section-denuncia-table">
            {userData.tipo === 'admin' && <p className="title-table-denuncia">Denúncias</p>}
            <section className="table-container">
                <div className="table-wrapper" style={{maxHeight: maxHeight}}>
                    <table className="denuncia-table">
                        <thead>
                            <tr className="titulo-denuncias-table">
                                <th className="denuncias-table-linhas">PROTOCOLO</th>
                                <th className="denuncias-table-linhas">SITUAÇÃO</th>
                                <th className="denuncias-table-linhas">DATA DE ABERTURA</th>
                                <th className="denuncias-table-linhas">PRIORIDADE</th>
                                <th className="denuncias-table-linhas"><button className="minhas-denuncias-detalhe-button" onClick={() => navigate('/cadastro-denuncia')}><img src='/lucide-plus.png' />Fazer Denúncia</button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {details?.map((denuncia, index) => (
                                <tr key={index}>
                                    <td className="denuncias-table-linhas">{denuncia.protocolo}</td>
                                    <td className="denuncias-table-linhas">{denuncia.status}</td>
                                    <td className="denuncias-table-linhas">{denuncia.dataCriacao}</td>
                                    <td className="denuncias-table-linhas">{denuncia.prioridade}</td>
                                    <td className="denuncias-table-linhas">
                                        <button className="minhas-denuncias-detalhe-button" onClick={() => navigate('/atualizar-denuncia', { state: { protocolo: denuncia.protocolo } })}><img src='/lucide-list-collapse.png' />Atualizar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </section>

    )
}

export default DetalhesDenunciaTable