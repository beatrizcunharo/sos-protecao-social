import { useEffect, useState } from "react"
import { getDenunciasPorEmailSync, getDenunciasSync, getUserData } from "../utils"
import MinhasDenuncias from "./MinhasDenuncias"
import { useNavigate } from "react-router"

const ConteudoHomePageDenunciante = () => {
    const { email } = getUserData()
    const [denuncias, setDenuncias] = useState();
    const [protocoloBusca, setProtocoloBusca] = useState('');
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        setProtocoloBusca(e.target.value);
    };

    useEffect(() => {
        const fetchDenuncias = async () => {
            try {
                const denuncias = await getDenunciasPorEmailSync();

                if (denuncias.status === "success") {
                    setDenuncias(denuncias.data);
                } else {
                    console.error("Erro: ", denuncias.message);
                }
            } catch (error) {
                console.error("Erro ao buscar denúncias: ", error);
            }
        };

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

        if (email) {
            fetchDenuncias();
        } else {
            if(protocoloBusca.length === 6) {
                fetchDenunciasAll();
            }
        }
    }, [protocoloBusca]);

    const hasLowHeight = (denuncias && denuncias.length > 0) && '700px'
    const denunciasFiltradas = denuncias && denuncias.filter(item => 
        item.protocolo.toString().includes(protocoloBusca) 
    )
    return (
        <section className="section-conteudo-home-page">
            <section className="section-conteido-denunciante" style={{minHeight: hasLowHeight}}>
                <div className="opcao-denuncia-busca">
                    <button className="button-opcao" onClick={() => navigate('/cadastro-denuncia')}>Fazer uma denúncia</button>
                    <p>OU</p>
                    <div class="input-container">
                        <img src="/lucide-search.png" alt="lucide-search" />
                        <input
                            className="input-opcao"
                            type="text"
                            placeholder="Número do protocolo"
                            value={protocoloBusca}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                {(denuncias && denuncias.length > 0) && <MinhasDenuncias denuncias={denunciasFiltradas} hasUser={email} />}
            </section>
        </section>
    )
}

export default ConteudoHomePageDenunciante