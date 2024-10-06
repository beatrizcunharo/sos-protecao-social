const TituloForm = ({ titulo, temVoltar, descricao, caminho }) => {
    return (
        <div className="titulo-form">
            <div className="titulo-form-content">
                {temVoltar && <a href={caminho}><img src="/lucide-arrow-left.png" alt="lucide-arrow-left" /></a>}
                {titulo && <p className="title-form-text">{titulo}</p>}
            </div>
            {descricao && <p className="title-form-descricao">{descricao}</p>}
        </div>
    )
}

export default TituloForm