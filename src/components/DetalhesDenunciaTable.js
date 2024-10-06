import { useNavigate } from "react-router"
import { getUserData } from "../utils"
import TituloForm from "./TituloForm"

const DetalhesDenunciaTable = ({ details }) => {
    const userData = getUserData()
    const navigate = useNavigate()

    const hasTitulo = userData.tipo === 'admin' ? 'space-between' : 'end'

    return (
        <section className="section-denuncia-table">
            <div className="content-title-tabela-denuncias" style={{justifyContent: hasTitulo}}>
                {userData.tipo === 'admin' && <TituloForm titulo='Denúncias' />}
                <button className="table-denuncias-filtro-button" onClick={() => {}}><img src="lucide-filter.png" alt="filtro" /> Filtros</button>
            </div>
            <section className="table-container">
                <div className="table-wrapper">
                    <table className="denuncia-table">
                        <thead>
                            <tr className="titulo-denuncias-table">
                                <th className="denuncias-table-linhas">PROTOCOLO</th>
                                <th className="denuncias-table-linhas">SITUAÇÃO</th>
                                <th className="denuncias-table-linhas">DATA DE ABERTURA</th>
                                <th className="denuncias-table-linhas">PRIORIDADE</th>
                                <th className="denuncias-table-linhas"><button className="minhas-denuncias-detalhe-button" onClick={() => navigate('/cadastro-denuncia')}><img src='/lucide-plus.png' alt="fazer-denuncia" />Fazer Denúncia</button></th>
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
                                        <button className="minhas-denuncias-detalhe-button" onClick={() => navigate('/atualizar-denuncia', { state: { protocolo: denuncia.protocolo } })}><img src='/lucide-list-collapse.png' alt="atualizar"/>Atualizar</button>
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