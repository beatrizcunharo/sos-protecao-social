import { useEffect, useState } from "react"
import { getDenunciasSync } from "../services/DenunciaService";
import DetalhesDenunciaTable from "./DetalhesDenunciaTable";

const ConteudoHomePageAssistente = () => {
    const [denuncias, setDenuncias] = useState();
    
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

        fetchDenunciasAll();
    }, [])

    return (
        <section>
            <DetalhesDenunciaTable details={denuncias}/>
        </section>
    )
}

export default ConteudoHomePageAssistente