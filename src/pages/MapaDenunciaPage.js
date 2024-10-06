import Navbar from "../components/Navbar"
import TituloForm from "../components/TituloForm"

const MapaDenunciaPage = () => {
    return (
        <section>
            <Navbar/>
            <section className="section-mapa-denuncia">
                <TituloForm titulo="Mapa de denúncias" temVoltar caminho='/'/>
                <img src="image-1.png" alt="mapa"/>
            </section>
        </section>
    )
}

export default MapaDenunciaPage