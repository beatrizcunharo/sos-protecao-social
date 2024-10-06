import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Navbar from "../components/Navbar/index.js";
import { useNavigate } from "react-router";
import { atualizarUsuario, cadastroUsuario, deletarUsuario, getUsuariosByEmail } from "../services/UsuarioService.js";
import TituloForm from "../components/TituloForm.js";

const CadastrarAtualizarUsuarioPage = () => {
    const location = useLocation();
    const { email } = location.state || {};
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        cpf: '',
        senha: '',
        confirmarSenha: '',
        tipo: ''
    });
    const navigate = useNavigate()

    useEffect(() => {
        async function getUsuario() {

            if (!email) return;
            try {
                const querySnapshot = await getUsuariosByEmail({ email });

                if (!querySnapshot.data.empty) {
                    const userData = querySnapshot.data[0];

                    const options = {
                        nome: userData.nome,
                        email: userData.email,
                        telefone: userData.telefone,
                        cpf: userData.cpf,
                        senha: userData.senha,
                        confirmarSenha: userData.confirmarSenha,
                        tipo: userData.tipo
                    }

                    setFormData(options)
                } else {
                    alert('Usuário inválido.');
                }
            } catch (error) {
                console.error('Erro ao buscar usuário pelo e-mail: ', error);
            }
        }

        getUsuario();
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const options = {
                nome: formData.nome,
                email: formData.email,
                telefone: formData.telefone,
                cpf: formData.cpf,
                senha: formData.senha,
                confirmarSenha: formData.senha,
                tipo: formData.tipo
            }
            const cadastroUsuarioData = await cadastroUsuario({ formData: options })
            if (cadastroUsuarioData.status === 'success') {
                alert('Usuário cadastrado com sucesso.');
                navigate('/sucesso', { state: { title: 'Usuário Registrado' } })
            }
        }
        catch (e) {
            console.error("Erro ao criar usuário: ", e);
            alert('Erro. Tente novamente.');
        }
    };

    const updateUser = async (e) => {
        e.preventDefault();
        try {

            const options = {
                nome: formData.nome,
                email: formData.email,
                telefone: formData.telefone,
                cpf: formData.cpf,
                senha: formData.senha,
                confirmarSenha: formData.senha,
                tipo: formData.tipo
            }
            const atualizaUsuario = await atualizarUsuario({ email: email, formData: options })
            if (atualizaUsuario.status === 'success') {
                alert('Usuário atualizado com sucesso.');
                navigate('/sucesso', { state: { title: 'Usuário Atualizado' } })
            }
        } catch (e) {
            console.error("Erro ao atualizar usuário: ", e);
            alert('Erro. Tente novamente.');
        }
    }

    const deleteUser = async (e) => {
        e.preventDefault();
        try {

            const usuarioDeletado = await deletarUsuario({ email: email })

            if (usuarioDeletado.status === 'success') {
                alert('Usuário deletado com sucesso.');
                navigate('/sucesso', { state: { title: 'Usuário Deletado' } })
            }
        } catch (error) {
            console.error('Erro ao deletar usuário: ', error);
        }
    }

    return (
        <section>
            <Navbar />
            <form className="section-cadastro-atualiza-usuario" onSubmit={handleSubmit}>
                <div>
                    <TituloForm titulo="Dados do usuário" temVoltar caminho="/usuarios-tabela" />
                    <div className="form-cadastro-atualiza-usuario">
                        <div>
                            <TituloForm descricao="Nome Completo" />
                            <input
                                className="input-detail-usuario"
                                name="nome"
                                value={formData.nome}
                                style={{ width: "533px" }}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <TituloForm descricao="CPF" />
                            <input
                                className="input-detail-usuario"
                                name="cpf"
                                value={formData.cpf}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <TituloForm descricao="E-mail" />
                            <input
                                className="input-detail-usuario"
                                name="email"
                                value={formData.email}
                                style={{ width: "424px" }}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <TituloForm descricao="Telefone" />
                            <input
                                className="input-detail-usuario"
                                name="telefone"
                                value={formData.telefone}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <TituloForm descricao="Tipo" />
                            <select
                                className="input-detail-usuario"
                                name="tipo"
                                value={formData.tipo}
                                onChange={handleChange}
                            >
                                <option value="">Selecione o tipo</option>
                                <option value="admin">Admin</option>
                                <option value="assistente">Assistente</option>
                                <option value="denunciante">Denunciante</option>
                            </select>
                        </div>
                        <div>
                            <TituloForm descricao="Senha" />
                            <input
                                className="input-detail-usuario"
                                name="senha"
                                value={formData.senha}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                </div>
                {!email && <button className="button-cadastrar-usuario">Criar Usuário</button>}
            </form>
            {email && <div className="button-content-cad-at-usuario"><button className="button-cadastrar-usuario" onClick={updateUser}>Atualizar</button><button onClick={deleteUser} className="button-cadastrar-usuario">Deletar</button></div>}
        </section>
    )
}

export default CadastrarAtualizarUsuarioPage