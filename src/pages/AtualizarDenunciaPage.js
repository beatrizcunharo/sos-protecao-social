import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Navbar from "../components/Navbar/index.js";
import { useNavigate } from "react-router";
import { atualizarDenuncia, getDenunciasPorProtocoloSync } from "../services/DenunciaService.js";
import TituloForm from "../components/TituloForm.js";

const AtualizarDenunciaPage = () => {
    const location = useLocation();
    const { protocolo } = location.state || {};
    const [detailsDenuncia, setDetailsDenuncia] = useState({
        nome: '',
        email: '',
        telefone: '',
        cpf: '',
        tipo: '',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
        descricao: '',
        dataCriacao: '',
        status: '',
        prioridade: '',
        medidas: '',
    });
    const navigate = useNavigate()

    useEffect(() => {
        async function getDenunciaDetail() {
            try {

                const querySnapshot = await getDenunciasPorProtocoloSync({ protocolo: protocolo });

                if (!querySnapshot.data.empty) {
                    const denunciaData = querySnapshot.data[0];

                    const options = {
                        nome: denunciaData.nome,
                        email: denunciaData.email,
                        telefone: denunciaData.telefone,
                        cpf: denunciaData.cpf,
                        tipo: denunciaData.tipo,
                        endereco: denunciaData.endereco,
                        numero: denunciaData.numero,
                        complemento: denunciaData.complemento,
                        bairro: denunciaData.bairro,
                        cidade: denunciaData.cidade,
                        estado: denunciaData.estado,
                        cep: denunciaData.cep,
                        descricao: denunciaData.descricao,
                        dataCriacao: denunciaData.dataCriacao,
                        status: denunciaData.status,
                        prioridade: denunciaData.prioridade,
                        medidas: denunciaData.medidas,
                    }

                    setDetailsDenuncia(options)
                } else {
                    alert('Protocolo inválido.');
                }
            } catch (error) {
                console.error('Erro ao buscar denúncia pelo protocolo: ', error);
            }
        }

        getDenunciaDetail();
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetailsDenuncia((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const formDataObject = {
                nome: detailsDenuncia.nome,
                cpf: detailsDenuncia.cpf,
                email: detailsDenuncia.email,
                telefone: detailsDenuncia.telefone,
                tipo: detailsDenuncia.tipo,
                endereco: detailsDenuncia.endereco,
                numero: detailsDenuncia.numero,
                complemento: detailsDenuncia.complemento,
                bairro: detailsDenuncia.bairro,
                cidade: detailsDenuncia.cidade,
                estado: detailsDenuncia.estado,
                cep: detailsDenuncia.cep,
                descricao: detailsDenuncia.descricao,
                dataCriacao: detailsDenuncia.dataCriacao,
                status: detailsDenuncia.status,
                prioridade: detailsDenuncia.prioridade,
                medidas: detailsDenuncia.medidas
            }
            const querySnapshot = await atualizarDenuncia({ protocolo: protocolo, formData: formDataObject });

            if (querySnapshot.status === 'success') {
                alert('Denúncia alterada com sucesso!');
                navigate('/sucesso', { state: { title: 'Denúncia Atualizada' } })
            }
        } catch (e) {
            console.error("Erro ao atualizar o documento: ", e);
            alert('Erro ao atualizar a denúncia. Tente novamente.');
        }
    };

    return (
        <section>
            <Navbar />
            <form className="section-detalhe-denuncia" onSubmit={handleSubmit}>
                <div>
                    <TituloForm titulo="Dados do denunciante" temVoltar caminho='/' />
                    <div className="form-detalhe-denuncia">
                        <div>
                            <TituloForm descricao="Nome Completo" />
                            <input
                                className="input-denuncia"
                                name="nome"
                                value={detailsDenuncia.nome}
                                style={{ width: "533px" }}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <TituloForm descricao="CPF" />

                            <input
                                className="input-denuncia"
                                name="cpf"
                                value={detailsDenuncia.cpf}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <TituloForm descricao="E-mail" />
                            <input
                                className="input-denuncia"
                                name="email"
                                value={detailsDenuncia.email}
                                style={{ width: "424px" }}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <TituloForm descricao="Telefone" />
                            <input
                                className="input-denuncia"
                                name="telefone"
                                value={detailsDenuncia.telefone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <TituloForm titulo="Local da denúncia" />
                    <div className="form-detalhe-denuncia">
                        <div>
                            <TituloForm descricao="Endereço" />
                            <input
                                className="input-denuncia"
                                name="endereco"
                                value={detailsDenuncia.endereco}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <TituloForm descricao="Número" />
                            <input
                                className="input-denuncia"
                                name="numero"
                                value={detailsDenuncia.numero}
                                style={{ width: "202px" }}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <TituloForm descricao="Complemento" />
                            <input
                                className="input-denuncia"
                                name="complemento"
                                value={detailsDenuncia.complemento}
                                style={{ width: "202px" }}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <TituloForm descricao="Bairro" />
                            <input
                                className="input-denuncia"
                                name="bairro"
                                value={detailsDenuncia.bairro}
                                style={{ width: "202px" }}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <TituloForm descricao="Cidade" />
                            <input
                                className="input-denuncia"
                                name="cidade"
                                value={detailsDenuncia.cidade}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <TituloForm descricao="Estado" />
                            <input
                                className="input-denuncia"
                                name="estado"
                                value={detailsDenuncia.estado}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <TituloForm descricao="CEP" />
                            <input
                                className="input-denuncia"
                                name="cep"
                                value={detailsDenuncia.cep}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <TituloForm titulo="Descrição da denúncia" />
                    <form className="form-detalhe-denuncia">
                        <textarea
                            className="input-denuncia"
                            name="descricao"
                            value={detailsDenuncia.descricao}
                            style={{ width: "100%", height: "250px" }}
                            onChange={handleChange}
                        />
                    </form>
                </div>
                <div>
                    <TituloForm titulo="Situação da denúncia" />
                    <div className="form-detalhe-denuncia">
                        <div>
                            <TituloForm descricao="Prioridade" />
                            <select
                                className="input-denuncia"
                                name="prioridade"
                                value={detailsDenuncia.prioridade}
                                onChange={handleChange}
                            >
                                <option value="">Selecione a prioridade</option>
                                <option value="alta">Alta</option>
                                <option value="media">Média</option>
                                <option value="baixa">Baixa</option>
                            </select>
                        </div>
                        <div>
                            <TituloForm descricao="Situação" />
                            <select
                                className="input-denuncia"
                                name="status"
                                value={detailsDenuncia.status}
                                onChange={handleChange}
                            >
                                <option value="">Selecione a situação</option>
                                <option value="em_aberto">Em aberto</option>
                                <option value="em_andamento">Em Andamento</option>
                                <option value="resolvido">Resolvido</option>
                                <option value="cancelado">Cancelado</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div>
                    <TituloForm titulo="Medidas tomadas" />
                    <div className="form-detalhe-denuncia">
                        <TituloForm descricao="Descrições das Ações Tomadas" />
                        <textarea
                            className="input-denuncia"
                            name="medidas"
                            value={detailsDenuncia.medidas}
                            style={{ width: "100%", height: "250px" }}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button className="button-atualizar-denuncia">Atualizar</button>
            </form>
        </section>
    )
}

export default AtualizarDenunciaPage