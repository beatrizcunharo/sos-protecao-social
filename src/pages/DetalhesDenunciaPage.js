import { useLocation } from "react-router";

const DetalhesDenunciaPage = () => {
    const location = useLocation();    
    const { protocolo } = location.state || {};
    
    return (<></>)
}

export default DetalhesDenunciaPage