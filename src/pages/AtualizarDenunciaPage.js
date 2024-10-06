import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Navbar from "../components/Navbar/index.js";
import { db } from '../firebaseConnection'
import { collection, getDocs, query, where, updateDoc } from 'firebase/firestore';
import { useNavigate } from "react-router";

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

            const q = query(collection(db, "denuncias"), where("protocolo", "==", protocolo));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docRef = querySnapshot.docs[0].ref;
                await updateDoc(docRef, {
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
                });
                alert('Denúncia alterada com sucesso!');
                navigate('/sucesso', { state: { title: 'Denúncia Atualizada'} })

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
                    <p className="title-detalhe-denuncia">Dados do denunciante</p>
                    <div className="form-detalhe-denuncia">
                        <div>
                            <p className="text-input-detalhe-denuncia">Nome Completo</p>
                            <input
                                className="input-denuncia"
                                name="nome"
                                value={detailsDenuncia.nome}
                                style={{ width: "533px" }}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <p className="text-input-detalhe-denuncia">CPF</p>
                            <input
                                className="input-denuncia"
                                name="cpf"
                                value={detailsDenuncia.cpf}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <p className="text-input-detalhe-denuncia">E-mail</p>
                            <input
                                className="input-denuncia"
                                name="email"
                                value={detailsDenuncia.email}
                                style={{ width: "424px" }}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <p className="text-input-detalhe-denuncia">Telefone</p>
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
                    <p className="title-detalhe-denuncia">Local da denúncia</p>
                    <div className="form-detalhe-denuncia">
                        <div>
                            <p className="text-input-detalhe-denuncia">Endereço</p>
                            <input
                                className="input-denuncia"
                                name="endereco"
                                value={detailsDenuncia.endereco}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <p className="text-input-detalhe-denuncia">Número</p>
                            <input
                                className="input-denuncia"
                                name="numero"
                                value={detailsDenuncia.numero}
                                style={{ width: "202px" }}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <p className="text-input-detalhe-denuncia">Complemento</p>
                            <input
                                className="input-denuncia"
                                name="complemento"
                                value={detailsDenuncia.complemento}
                                style={{ width: "202px" }}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <p className="text-input-detalhe-denuncia">Bairro</p>
                            <input
                                className="input-denuncia"
                                name="bairro"
                                value={detailsDenuncia.bairro}
                                style={{ width: "202px" }}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <p className="text-input-detalhe-denuncia">Cidade</p>
                            <input
                                className="input-denuncia"
                                name="cidade"
                                value={detailsDenuncia.cidade}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <p className="text-input-detalhe-denuncia">Estado</p>
                            <input
                                className="input-denuncia"
                                name="estado"
                                value={detailsDenuncia.estado}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <p className="text-input-detalhe-denuncia">CEP</p>
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
                    <p className="title-detalhe-denuncia">Descrição da denúncia</p>
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
                    <p className="title-detalhe-denuncia">Situação da denúncia</p>
                    <div className="form-detalhe-denuncia">
                        <div>
                            <p className="text-input-detalhe-denuncia">Prioridade</p>
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
                            <p className="text-input-detalhe-denuncia">Situação</p>
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
                    <p className="title-detalhe-denuncia">Medidas tomadas</p>
                    <div className="form-detalhe-denuncia">
                        <p className="text-input-detalhe-denuncia">Descrições das Ações Tomadas</p>
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