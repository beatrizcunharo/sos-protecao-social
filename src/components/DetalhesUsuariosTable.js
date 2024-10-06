import { useNavigate } from "react-router"
import { getUserData } from "../utils"

const DetalhesUsuariosTable = ({ usuarios }) => {
    const userData = getUserData()
    const navigate = useNavigate()

    const maxHeight = userData.tipo === 'assistente' ? '800px' : '500px'

    return (
        <section className="section-usuarios-table">
            <p className="title-table-usuarios">Usuários do SOS Proteção Social</p>
            <section className="table-container">
                <div className="table-wrapper" style={{maxHeight: maxHeight}}>
                    <table className="usuarios-table">
                        <thead>
                            <tr className="titulo-usuarios-table">
                                <th className="usuarios-table-linhas">NOME</th>
                                <th className="usuarios-table-linhas">E-MAIL</th>
                                <th className="usuarios-table-linhas">TIPO</th>
                                <th className="usuarios-table-linhas"><button className="usuarios-detalhe-button" onClick={() => navigate('/cadastrar-atualizar-usuario')}><img src='/lucide-plus.png' />Criar Usuário</button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios?.map((usuario, index) => (
                                <tr key={index}>
                                    <td className="usuarios-table-linhas">{usuario.nome}</td>
                                    <td className="usuarios-table-linhas">{usuario.email}</td>
                                    <td className="usuarios-table-linhas">{usuario.tipo}</td>
                                    <td className="usuarios-table-linhas">
                                        <button className="usuarios-detalhe-button" onClick={() => navigate('/cadastrar-atualizar-usuario', { state: { email: usuario.email } })}><img src='/lucide-list-collapse.png' />Atualizar</button>
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

export default DetalhesUsuariosTable