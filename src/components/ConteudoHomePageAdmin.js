import { useEffect, useState } from "react"
import { getDenunciasSync, getUsuariosSync } from "../utils";
import DetalhesDenunciaTable from "./DetalhesDenunciaTable";
import DetalhesUsuariosTable from "./DetalhesUsuariosTable";

const ConteudoHomePageAdmin = () => {
    const [denuncias, setDenuncias] = useState();
    const [usuarios, setUsuarios] = useState();
    
    useEffect(() => {
        const fetchDenunciasAll = async () => {
            try {
                const denuncias = await getDenunciasSync();

                if (denuncias.status === "success") {
                    setDenuncias(denuncias.data);
                } else {
                    console.error("Erro: ", denuncias.message);
                }
            } catch (error) {
                console.error("Erro ao buscar denúncias: ", error);
            }
        };

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

        fetchDenunciasAll();
        fetchUsuariosAll();
    }, [])

    return (
        <section className="section-conteudo-home-page">
            <DetalhesDenunciaTable details={denuncias}/>
            <DetalhesUsuariosTable usuarios={usuarios}/>
        </section>
    )
}

export default ConteudoHomePageAdmin