import "./ProcessoFiltros.css";

type Props = {
    busca: string;
    status: number;
    quantidadeFiltrada: number;
    quantidadeTotal: number;

    onBuscaChange: (valor: string) => void;
    onStatusChange: (valor: number) => void;
};

function ProcessoFiltros({
                             busca,
                             status,
                             quantidadeFiltrada,
                             quantidadeTotal,
                             onBuscaChange,
                             onStatusChange
                         }: Props) {
    return (
        <section className="process-filters">
            <div className="filter-group filter-search">
                <label htmlFor="busca">
                    Buscar processo
                </label>

                <input
                    id="busca"
                    type="text"
                    placeholder="Número ou assunto..."
                    value={busca}
                    onChange={(e) =>
                        onBuscaChange(e.target.value)
                    }
                />
            </div>

            <div className="filter-group">
                <label htmlFor="statusFiltro">
                    Status
                </label>

                <select
                    id="statusFiltro"
                    value={status}
                    onChange={(e) =>
                        onStatusChange(
                            Number(e.target.value)
                        )
                    }
                >
                    <option value={0}>Todos</option>
                    <option value={1}>Ativos</option>
                    <option value={2}>Finalizados</option>
                    <option value={3}>Arquivados</option>
                </select>
            </div>

            <span className="filter-result">
                {quantidadeFiltrada} de {quantidadeTotal} processos
            </span>
        </section>
    );
}

export default ProcessoFiltros;