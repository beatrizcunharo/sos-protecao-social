import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Navbar from "../components/Navbar/index.js";
import TituloForm from "../components/TituloForm.js";
import { getDenunciasPorProtocoloSync } from "../services/DenunciaService.js";

const DetalhesDenunciaPage = () => {
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
        medidas: ''
    });

    useEffect(() => {
        async function getDenunciaDetail() {
            try {
               
                const querySnapshot = await getDenunciasPorProtocoloSync({protocolo})

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
                        status: denunciaData.status?.replace('-', ' '),
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

    const inputProps = {
        disabled: true
    }

    return (
        <section>
            <Navbar />
            <div className="section-detalhe-denuncia">
                <div>
                    <TituloForm titulo='Situação da denúncia' temVoltar caminho='/' />
                    <div className="form-detalhe-denuncia">
                        <div>
                            <TituloForm descricao='Situação' />
                            <input
                                className="input-denuncia"
                                name="status"
                                value={detailsDenuncia.status}
                                {...inputProps}
                            />
                        </div>
                        <div>
                            <TituloForm descricao='Protocolo' />
                            <input
                                className="input-denuncia"
                                name="protocolo"
                                value={protocolo}
                                {...inputProps}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <TituloForm titulo='Medidas tomadas' />

                    <div className="form-detalhe-denuncia">
                        <TituloForm descricao='Descrições das Ações Tomadas' />
                        <textarea
                            className="input-denuncia"
                            name="descricao"
                            value={detailsDenuncia.medidas}
                            style={{ width: "100%", height: "250px" }}
                            {...inputProps}
                        />
                    </div>
                </div>
                <div>
                    <TituloForm titulo='Dados do denunciante' />

                    <div className="form-detalhe-denuncia">
                        <div>
                            <TituloForm descricao='Nome Completo' />
                            <input
                                className="input-denuncia"
                                name="nome"
                                value={detailsDenuncia.nome}
                                style={{ width: "533px" }}
                                {...inputProps}
                            />
                        </div>
                        <div>
                            <TituloForm descricao='CPF' />
                            <input
                                className="input-denuncia"
                                name="cpf"
                                value={detailsDenuncia.cpf}
                                {...inputProps}
                            />
                        </div>
                        <div>
                            <TituloForm descricao='E-mail' />
                            <input
                                className="input-denuncia"
                                name="email"
                                value={detailsDenuncia.email}
                                style={{ width: "424px" }}
                                {...inputProps}
                            />
                        </div>
                        <div>
                            <TituloForm descricao='Telefone' />
                            <input
                                className="input-denuncia"
                                name="telefone"
                                value={detailsDenuncia.telefone}
                                {...inputProps}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <TituloForm titulo='Local da denúncia' />

                    <div className="form-detalhe-denuncia">
                        <div>
                            <TituloForm descricao='Endereço' />
                            <input
                                className="input-denuncia"
                                name="endereco"
                                value={detailsDenuncia.endereco}
                                {...inputProps}
                            />
                        </div>
                        <div>
                            <TituloForm descricao='Número' />
                            <input
                                className="input-denuncia"
                                name="numero"
                                value={detailsDenuncia.numero}
                                style={{ width: "202px" }}
                                {...inputProps}
                            />
                        </div>
                        <div>
                            <TituloForm descricao='Complemento' />
                            <input
                                className="input-denuncia"
                                name="complemento"
                                value={detailsDenuncia.complemento}
                                style={{ width: "202px" }}
                                {...inputProps}
                            />
                        </div>
                        <div>
                            <TituloForm descricao='Bairro' />
                            <input
                                className="input-denuncia"
                                name="bairro"
                                value={detailsDenuncia.bairro}
                                style={{ width: "202px" }}
                                {...inputProps}
                            />
                        </div>
                        <div>
                            <TituloForm descricao='Cidade' />
                            <input
                                className="input-denuncia"
                                name="cidade"
                                value={detailsDenuncia.cidade}
                                {...inputProps}
                            />
                        </div>
                        <div>
                            <TituloForm descricao='Estado' />
                            <input
                                className="input-denuncia"
                                name="estado"
                                value={detailsDenuncia.estado}
                                {...inputProps}
                            />
                        </div>
                        <div>
                            <TituloForm descricao='CEP' />
                            <input
                                className="input-denuncia"
                                name="cep"
                                value={detailsDenuncia.cep}
                                {...inputProps}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <TituloForm titulo='Descrição da denúncia' />
                    <form className="form-detalhe-denuncia">
                        <textarea
                            className="input-denuncia"
                            name="descricao"
                            value={detailsDenuncia.descricao}
                            style={{ width: "100%", height: "250px" }}
                            {...inputProps}
                        />
                    </form>
                </div>
            </div>
        </section>
    )
}

export default DetalhesDenunciaPage