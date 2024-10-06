import { useEffect, useState } from "react"
import { getDenunciasPorEmailSync, getDenunciasPorProtocoloSync } from "../../services/DenunciaService"
import { useNavigate } from "react-router"
import { getUserData } from "../../utils"
import './conteudoPageDenunciante.css'
import MinhasDenuncias from "../MinhasDenuncias"

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

        const fetchDenunciasPorProtocolo = async () => {
            try {
                const denuncias = await getDenunciasPorProtocoloSync({ protocolo: protocoloBusca });
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
                fetchDenunciasPorProtocolo();
            }
        }
    }, [protocoloBusca]);

    const hasLowHeight = (denuncias && denuncias.length > 0) && '700px'
    const denunciasFiltradas = denuncias && denuncias.filter(item => 
        item.protocolo.toString().includes(protocoloBusca) 
    )
    
    return (
        <section>
            <section className="section-conteudo-denunciante" style={{minHeight: hasLowHeight}}>
                <div className="opcao-denuncia-busca">
                    <button className="button-opcao-denuncia" onClick={() => navigate('/cadastro-denuncia')}>Fazer uma denúncia</button>
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