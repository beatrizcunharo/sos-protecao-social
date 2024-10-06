import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Navbar from "../components/Navbar/index.js";
import { db } from '../firebaseConnection'
import { collection, getDocs, query, where } from 'firebase/firestore';

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

                const q = query(collection(db, 'denuncias'), where('protocolo', '==', protocolo));
                const querySnapshot = await getDocs(q);


                if (!querySnapshot.empty) {
                    const denunciaData = querySnapshot.docs[0].data();

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
                    <p className="title-detalhe-denuncia">Situação da denúncia</p>
                    <div className="form-detalhe-denuncia">
                        <div>
                            <p className="text-input-detalhe-denuncia">Situação</p>
                            <input
                                className="input-denuncia"
                                name="status"
                                value={detailsDenuncia.status}
                                {...inputProps}
                            />
                        </div>
                        <div>
                            <p className="text-input-detalhe-denuncia">Protocolo</p>
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
                    <p className="title-detalhe-denuncia">Medidas tomadas</p>
                    <div className="form-detalhe-denuncia">
                        <p className="text-input-detalhe-denuncia">Descrições das Ações Tomadas</p>
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
                    <p className="title-detalhe-denuncia">Dados do denunciante</p>
                    <div className="form-detalhe-denuncia">
                        <div>
                            <p className="text-input-detalhe-denuncia">Nome Completo</p>
                            <input
                                className="input-denuncia"
                                name="nome"
                                value={detailsDenuncia.nome}
                                style={{ width: "533px" }}
                                {...inputProps}
                            />
                        </div>
                        <div>
                            <p className="text-input-detalhe-denuncia">CPF</p>
                            <input
                                className="input-denuncia"
                                name="cpf"
                                value={detailsDenuncia.cpf}
                                {...inputProps}
                            />
                        </div>
                        <div>
                            <p className="text-input-detalhe-denuncia">E-mail</p>
                            <input
                                className="input-denuncia"
                                name="email"
                                value={detailsDenuncia.email}
                                style={{ width: "424px" }}
                                {...inputProps}
                            />
                        </div>
                        <div>
                            <p className="text-input-detalhe-denuncia">Telefone</p>
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
                    <p className="title-detalhe-denuncia">Local da denúncia</p>
                    <div className="form-detalhe-denuncia">
                        <div>
                            <p className="text-input-detalhe-denuncia">Endereço</p>
                            <input
                                className="input-denuncia"
                                name="endereco"
                                value={detailsDenuncia.endereco}
                                {...inputProps}
                            />
                        </div>
                        <div>
                            <p className="text-input-detalhe-denuncia">Número</p>
                            <input
                                className="input-denuncia"
                                name="numero"
                                value={detailsDenuncia.numero}
                                style={{ width: "202px" }}
                                {...inputProps}
                            />
                        </div>
                        <div>
                            <p className="text-input-detalhe-denuncia">Complemento</p>
                            <input
                                className="input-denuncia"
                                name="complemento"
                                value={detailsDenuncia.complemento}
                                style={{ width: "202px" }}
                                {...inputProps}
                            />
                        </div>
                        <div>
                            <p className="text-input-detalhe-denuncia">Bairro</p>
                            <input
                                className="input-denuncia"
                                name="bairro"
                                value={detailsDenuncia.bairro}
                                style={{ width: "202px" }}
                                {...inputProps}
                            />
                        </div>
                        <div>
                            <p className="text-input-detalhe-denuncia">Cidade</p>
                            <input
                                className="input-denuncia"
                                name="cidade"
                                value={detailsDenuncia.cidade}
                                {...inputProps}
                            />
                        </div>
                        <div>
                            <p className="text-input-detalhe-denuncia">Estado</p>
                            <input
                                className="input-denuncia"
                                name="estado"
                                value={detailsDenuncia.estado}
                                {...inputProps}
                            />
                        </div>
                        <div>
                            <p className="text-input-detalhe-denuncia">CEP</p>
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
                    <p className="title-detalhe-denuncia">Descrição da denúncia</p>
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