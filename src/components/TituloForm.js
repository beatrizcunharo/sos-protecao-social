const TituloForm = ({ titulo, temVoltar, descricao, caminho }) => {
    return (
        <div className="titulo-form">
            <div className="titulo-form-content">
                {temVoltar && <a href={caminho}><img src="/lucide-search.png" alt="lucide-search" /></a>}
                {titulo && <p className="title-form-text">{titulo}</p>}
            </div>
            {descricao && <p className="text-input-cadastro-denuncia">{descricao}</p>}
        </div>
    )
}

export default TituloForm