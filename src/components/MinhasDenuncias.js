const MinhasDenuncias = ({ denuncias, protocolo }) => {

    return (
        <section className="minhas-denuncias">
            <p className="title-minhas-denuncias">Minha denúncias</p>
            <div>
                {denuncias.map((item) => {
                    return (
                        <div className="minha-denuncia-content">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p className="title-minha-denuncia">Protocolo: {item.protocolo}</p>
                                <button className="minhas-denuncias-detalhe-button"><img src='/lucide-list-collapse.png' />Detalhes</button>
                            </div>
                            <div style={{ display: 'flex', gap: '50px'}}>
                                <p className="title-minha-denuncia">Situação: {item.status}</p>
                                <p className="title-minha-denuncia">Data de abertura: {item.dataCriacao}</p>
                            </div>
                        </div>
                    )
                })}
            </div>

        </section>
    )
}

export default MinhasDenuncias