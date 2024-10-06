import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { db } from '../firebaseConnection';
import { collection, getDocs, query, where, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';
import Navbar from "../components/Navbar/index.js";
import { useNavigate } from "react-router";

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
                const q = query(collection(db, 'usuarios'), where('email', '==', email));
                const querySnapshot = await getDocs(q);


                if (!querySnapshot.empty) {
                    const userData = querySnapshot.docs[0].data();

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
            await addDoc(collection(db, "usuarios"), options);
            alert('Usuário cadastrado com sucesso.');
            navigate('/sucesso', { state: { title: 'Usuário Registrado' } })
        }
        catch (e) {
            console.error("Erro ao criar usuário: ", e);
            alert('Erro. Tente novamente.');
        }
    };

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            const q = query(collection(db, 'usuarios'), where('email', '==', email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docRef = querySnapshot.docs[0].ref;
                await updateDoc(docRef, {
                    nome: formData.nome,
                    email: formData.email,
                    telefone: formData.telefone,
                    cpf: formData.cpf,
                    senha: formData.senha,
                    confirmarSenha: formData.senha,
                    tipo: formData.tipo
                });

                alert('Usuário atualizado com sucesso.');
                navigate('/sucesso', { state: { title: 'Usuário Atualizado' } })
            }
        }catch (e) {
            console.error("Erro ao atualizar usuário: ", e);
            alert('Erro. Tente novamente.');
        }
    }

    const deleteUser = async (e) => {
        e.preventDefault();
        try {
            const q = query(collection(db, 'usuarios'), where('email', '==', email));
            const querySnapshot = await getDocs(q);
    
            if (!querySnapshot.empty) {
                querySnapshot.forEach(async (doc) => {
                    await deleteDoc(doc.ref);
                    alert('Usuário deletado com sucesso.');
                    navigate('/sucesso', { state: { title: 'Usuário Deletado' } })
                });
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
                    <p className="title-cadastro-atualizar-usuario">Dados do usuário</p>
                    <div className="form-cadastro-atualiza-usuario">
                        <div>
                            <p className="text-input-cadastro-atualiza-usuario">Nome Completo</p>
                            <input
                                className="input-detail-usuario"
                                name="nome"
                                value={formData.nome}
                                style={{ width: "533px" }}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <p className="text-input-cadastro-atualiza-usuario">CPF</p>
                            <input
                                className="input-detail-usuario"
                                name="cpf"
                                value={formData.cpf}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <p className="text-input-cadastro-atualiza-usuario">E-mail</p>
                            <input
                                className="input-detail-usuario"
                                name="email"
                                value={formData.email}
                                style={{ width: "424px" }}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <p className="text-input-cadastro-atualiza-usuario">Telefone</p>
                            <input
                                className="input-detail-usuario"
                                name="telefone"
                                value={formData.telefone}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <p className="text-input-cadastro-atualiza-usuario">Tipo</p>
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
                            <p className="text-input-cadastro-atualiza-usuario">Senha</p>
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