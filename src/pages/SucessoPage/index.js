import { useLocation } from "react-router";
import Navbar from "../../components/Navbar/index.js"
import './sucessoPage.css'
import TituloForm from "../../components/TituloForm.js";

const SucessoPage = () => {
    const location = useLocation();
    const { title, subtitle, protocolo } = location.state || {};

    return (
        <section>
            <Navbar />
            <div className="container-sucesso-pagina">
                <div className="container-sucesso-pagina-content">
                <div className="x-button-sucess"><a href="/"><img src="lucide-x.png" alt="close-button"/></a></div>
                    <img src='lucid-circle-check-big.png' alt="lucid-circle-check-big"/>
                    {title && <TituloForm titulo={title}/>}
                    {subtitle && <p className="subtitle-sucess" style={{width: '100%', textAlign: "center"}}>{subtitle}</p>}
                    {protocolo && <p className="title-sucess">{protocolo}</p>}
                </div>
            </div>
        </section>
    )
}

export default SucessoPage