import { useEffect, useState } from "react";
import DetalhesUsuariosTable from "../components/DetalhesUsuariosTable"
import Navbar from "../components/Navbar"
import TituloForm from "../components/TituloForm"
import { getUsuariosSync } from "../utils";

const UsuariosTabelaPage = () => {
    const [usuarios, setUsuarios] = useState();
    
    useEffect(() => {

        const fetchUsuariosAll = async () => {
            try {
                const usuarios = await getUsuariosSync();

                if (usuarios.status === "success") {
                    setUsuarios(usuarios.data);
                } else {
                    console.error("Erro: ", usuarios.message);
                }
            } catch (error) {
                console.error("Erro ao buscar denúncias: ", error);
            }
        };

        fetchUsuariosAll();
    }, [])

    return (
        <section>
            <Navbar/>
            <div>
                <TituloForm temVoltar caminho='/' titulo="Usuários do SOS Proteção Social"/>
                <DetalhesUsuariosTable usuarios={usuarios}/>
            </div>
        </section>
    )
}

export default UsuariosTabelaPage