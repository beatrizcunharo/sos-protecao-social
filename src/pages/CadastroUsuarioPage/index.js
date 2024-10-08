import { useState } from "react";
import './cadastroUsuario.css'
import TituloForm from "../../components/TituloForm";
import { cadastroUsuario } from "../../services/UsuarioService";

const CadastroUsuarioPage = () => {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        cpf: '',
        senha: '',
        confirmarSenha: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    function disabledButton() {
        if (formData.nome === '' || formData.email === '' || formData.telefone === '' || formData.cpf === '' || formData.senha === '' || formData.confirmarSenha === '') return true

        return false
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formData.nome === '' || formData.email === '' || formData.telefone === '' || formData.cpf === '' || formData.senha === '' || formData.confirmarSenha === '') return;

        if (formData.senha !== formData.confirmarSenha) {
            alert('As senhas não coincidem');
            return;
        }

        try {
            const usuarioData = await cadastroUsuario({ formData })
            if (usuarioData.status === 'sucess') {
                alert('Usuário cadastrado com sucesso!');
                setFormData({
                    nome: '',
                    email: '',
                    telefone: '',
                    cpf: '',
                    senha: '',
                    confirmarSenha: '',
                    tipo: 'denunciante'
                });
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            alert('Ocorreu um erro ao cadastrar o usuário.');
        }
    };

    return (
        <section className="cadastro-usuario">
            <form onSubmit={handleSubmit} className="cadastro-usuario-content">
                <div>
                    <TituloForm descricao="Nome Completo" />
                    <input
                        className="input-cadastro"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <TituloForm descricao="E-mail" />
                    <input
                        className="input-cadastro"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <TituloForm descricao="Telefone" />
                    <input
                        className="input-cadastro"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <TituloForm descricao="CPF" />
                    <input
                        className="input-cadastro"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <TituloForm descricao="Senha" />
                    <input
                        type="password"
                        className="input-cadastro"
                        name="senha"
                        value={formData.senha}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <TituloForm descricao="Confirmar Senha" />
                    <input
                        type="password"
                        className="input-cadastro"
                        name="confirmarSenha"
                        value={formData.confirmarSenha}
                        onChange={handleInputChange}
                    />
                </div>
                <button className="button-cadastro" disabled={disabledButton()}>Cadastrar</button>
                <a className="cadastro-usuario-link" href="/login"><u>Já tem uma conta? Clique aqui</u></a>
            </form>
        </section>
    )
}

export default CadastroUsuarioPage