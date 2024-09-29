import { useEffect, useState } from "react";
import Navbar from "../components/Navbar"
import { gerarProtocolo, getUserData } from "../utils"
import { db } from '../firebaseConnection';
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router";

const CadastroDenunciaPage = () => {
    const { email } = getUserData()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        cpf: '',
        tipo: 'denunciante',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
        descricao: '',
        dataCriacao: '',
        protocolo: '',
        status: 'Em aberto'
    });

    const [user, hasUser] = useState(false)

    useEffect(() => {
        async function compararEmail() {

            if (!email) {
                return;
            }

            try {

                const q = query(collection(db, 'usuarios'), where('email', '==', email));


                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        const dadosUsuario = doc.data();
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
            await addDoc(collection(db, "denuncias"), {
                nome: formData.nome,
                cpf: formData.cpf,
                email: formData.email,
                telefone: formData.telefone,
                tipo: 'denunciante',
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
                status: 'Em aberto'

            });
            alert('Denúncia enviada com sucesso!');
            navigate('/sucesso', { state: { title: 'Denúncia Registrada', subtitle: 'Sua denúncia foi registrada com sucesso, acompanhe usando o número de protocolo abaixo:',protocolo: protocoloGerado } })
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
                        <p className="title-denuncia">Dados Pessoais</p>
                        <p className="subtitle-denuncia">Caso queria fazer uma denúncia anônima, basta não preencher</p>
                        <div className="form-cadastro-denuncia">
                            <div>
                                <p className="text-input-cadastro-denuncia">Nome Completo</p>
                                <input
                                    className="input-denuncia"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleInputChange}
                                    style={{ width: "533px" }}
                                />
                            </div>
                            <div>
                                <p className="text-input-cadastro-denuncia">CPF</p>
                                <input
                                    className="input-denuncia"
                                    name="cpf"
                                    value={formData.cpf}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <p className="text-input-cadastro-denuncia">E-mail</p>
                                <input
                                    className="input-denuncia"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    style={{ width: "533px" }}
                                />
                            </div>
                            <div>
                                <p className="text-input-cadastro-denuncia">Telefone</p>
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
                <p className="title-denuncia" style={{ marginTop: '50px' }}>Local da Denuncia</p>
                <div className="form-cadastro-denuncia">
                    <div>
                        <p className="text-input-cadastro">Endereço</p>
                        <input
                            className="input-cadastro"
                            name="endereco"
                            value={formData.endereco}
                            onChange={handleInputChange}
                            style={{ width: "533px" }}
                        />
                    </div>
                    <div>
                        <p className="text-input-cadastro">Número</p>
                        <input
                            className="input-cadastro"
                            name="numero"
                            value={formData.numero}
                            onChange={handleInputChange}
                            style={{ width: "200px" }}
                        />
                    </div>
                    <div>
                        <p className="text-input-cadastro">Complemento</p>
                        <input
                            className="input-cadastro"
                            name="complemento"
                            value={formData.complemento}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <p className="text-input-cadastro">Bairro</p>
                        <input
                            className="input-cadastro"
                            name="bairro"
                            value={formData.bairro}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <p className="text-input-cadastro">Cidade</p>
                        <input
                            className="input-cadastro"
                            name="cidade"
                            value={formData.cidade}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <p className="text-input-cadastro">Estado</p>
                        <input
                            className="input-cadastro"
                            name="estado"
                            value={formData.estado}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <p className="text-input-cadastro">CEP</p>
                        <input
                            className="input-cadastro"
                            name="cep"
                            value={formData.cep}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <p className="title-denuncia" style={{ marginTop: '50px' }}>Descreva a Denúncia</p>
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