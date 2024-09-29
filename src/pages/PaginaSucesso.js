import { useLocation } from "react-router";
import Navbar from "../components/Navbar"

const PaginaSucesso = () => {
    const location = useLocation();
    const { title, subtitle, protocolo } = location.state || {};

    return (
        <section>
            <Navbar />
            <div className="container-sucesso-pagina">
                <div className="container-sucesso-pagina-content">
                    <img src='lucid-circle-check-big.png' alt="lucid-circle-check-big"/>
                    {title && <p className="title-sucess">{title}</p>}
                    {subtitle && <p className="subtitle-sucess" style={{width: '100%', textAlign: "center"}}>{subtitle}</p>}
                    {protocolo && <p className="title-sucess">{protocolo}</p>}
                </div>
            </div>
        </section>
    )
}

export default PaginaSucesso