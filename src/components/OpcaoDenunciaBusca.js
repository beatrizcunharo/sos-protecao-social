import { useNavigate } from "react-router"

const OpcaoDenunciaBusca = () => {
    const navigate = useNavigate()
    return (
        <div className="opcao-denuncia-busca">
            <button className="button-opcao" onClick={() => navigate('/cadastro-denuncia')}>Fazer uma denúncia</button>
            <p>OU</p>
            <div class="input-container">
                <img src="/lucide-search.png" alt="lucide-search" />
                <input className="input-opcao" type="text" placeholder="Número do protocolo"/>
            </div>
        </div>
    )
}

export default OpcaoDenunciaBusca