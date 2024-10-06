import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/index.js"
import { gerarProtocolo, getUserData } from "../utils"
import { useNavigate } from "react-router";
import { getUsuariosByEmail } from "../services/UsuarioService.js";
import { cadastroDenuncia } from "../services/DenunciaService.js";
import TituloForm from "../components/TituloForm.js";

const CadastroDenunciaPage = () => {
    const { email, tipo } = getUserData()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        cpf: '',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
        descricao: '',
    });

    const [user, hasUser] = useState(false)

    useEffect(() => {
        async function compararEmail() {

            if (!email) {
                return;
            }

            try {

                const querySnapshot = await getUsuariosByEmail({ email });

                if (!querySnapshot.data.empty) {
                    querySnapshot.data.forEach((doc) => {
                        const dadosUsuario = doc;
                        setFormData({
                            nome: dadosUsuario.nome,
                            email: email,
                            cpf: dadosUsuario.cpf,
                            telefone: dadosUsuario.telefone
                        })
                        hasUser(true)
                    });
                }
            } catch (error) {
                console.error('Erro ao buscar o usuário:', error);
            }
        }

        compararEmail();
    }, [])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataCriacao = new Date();
        const dataFormatada = new Intl.DateTimeFormat('pt-BR').format(dataCriacao);
        try {
            const protocoloGerado = gerarProtocolo()

            const formDataObject = {
                nome: formData.nome,
                cpf: formData.cpf,
                email: formData.email,
                telefone: formData.telefone,
                tipo: tipo ? tipo : 'denunciante',
                endereco: formData.endereco,
                numero: formData.numero,
                complemento: formData.complemento,
                bairro: formData.bairro,
                cidade: formData.cidade,
                estado: formData.estado,
                cep: formData.cep,
                descricao: formData.descricao,
                dataCriacao: dataFormatada,
                protocolo: protocoloGerado,
                status: 'em_aberto',
                prioridade: 'baixa',
                medidas: ''
            }

            const cadastrarDenuncia = await cadastroDenuncia({ formData: formDataObject })
            if (cadastrarDenuncia.status === 'success') {
                alert('Denúncia enviada com sucesso!');
                navigate('/sucesso', { state: { title: 'Denúncia Registrada', subtitle: 'Sua denúncia foi registrada com sucesso, acompanhe usando o número de protocolo abaixo:', protocolo: protocoloGerado } })
            }
        } catch (e) {
            console.error("Erro ao gravar o documento: ", e);
            alert('Erro ao enviar a denúncia. Tente novamente.');
        }
    };    

    return (
        <section>
            <Navbar />
            <div className="container-form-denuncia">
                {!user &&
                    <>
                        <div className="common-margin-bottom">
                            <TituloForm titulo='Dados Pessoais' descricao="Caso queria fazer uma denúncia anônima, basta não preencher" temVoltar caminho='/' />
                        </div>
                        <div className="form-cadastro-denuncia">
                            <div>
                                <TituloForm descricao="Nome Completo" />
                                <input
                                    className="input-denuncia"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleInputChange}
                                    style={{ width: "533px" }}
                                />
                            </div>
                            <div>
                                <TituloForm descricao="CPF" />
                                <input
                                    className="input-denuncia"
                                    name="cpf"
                                    value={formData.cpf}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <TituloForm descricao="E-mail" />
                                <input
                                    className="input-denuncia"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    style={{ width: "533px" }}
                                />
                            </div>
                            <div>
                                <TituloForm descricao="Telefone" />
                                <input
                                    className="input-denuncia"
                                    name="telefone"
                                    value={formData.telefone}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </>
                }
                <div className="common-margin-bottom">
                    <TituloForm titulo='Local da Denuncia' descricao="Qual foi o último lugar onde você viu a criança" temVoltar={email} caminho={'/'}/>
                </div>

                <div className="form-cadastro-denuncia">
                    <div>
                        <TituloForm descricao="Endereço" />
                        <input
                            className="input-cadastro"
                            name="endereco"
                            value={formData.endereco}
                            onChange={handleInputChange}
                            style={{ width: "533px" }}
                        />
                    </div>
                    <div>
                        <TituloForm descricao="Número" />
                        <input
                            className="input-cadastro"
                            name="numero"
                            value={formData.numero}
                            onChange={handleInputChange}
                            style={{ width: "200px" }}
                        />
                    </div>
                    <div>
                        <TituloForm descricao="Complemento" />
                        <input
                            className="input-cadastro"
                            name="complemento"
                            value={formData.complemento}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <TituloForm descricao="Bairro" />
                        <input
                            className="input-cadastro"
                            name="bairro"
                            value={formData.bairro}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <TituloForm descricao="Cidade" />
                        <input
                            className="input-cadastro"
                            name="cidade"
                            value={formData.cidade}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <TituloForm descricao="Estado" />
                        <input
                            className="input-cadastro"
                            name="estado"
                            value={formData.estado}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <TituloForm descricao="CEP" />
                        <input
                            className="input-cadastro"
                            name="cep"
                            value={formData.cep}
                            onChange={handleInputChange}
                        />
                    </div>
                </div><div className="common-margin-bottom">
                    <TituloForm titulo='Descreva a Denúncia' descricao="Preencha com a maior riqueza de detalhes possível. Inclua informações como cor da pele, altura aproximada, tipo de cabelo, descrição das roupas, etc."/>
                </div>
                <form className="form-cadastro-denuncia" onSubmit={handleSubmit}>
                    <textarea
                        className="input-cadastro"
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleInputChange}
                        style={{ width: "100%", height: "250px" }}
                    />
                    <button className="button-cadastro-denuncia">Cadastrar</button>
                </form>
            </div>


        </section>
    )
}

export default CadastroDenunciaPage