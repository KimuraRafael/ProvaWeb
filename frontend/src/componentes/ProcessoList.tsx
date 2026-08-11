import type {Processo} from "../types";
import "./ProcessoList.css";

type Props = {
    processos: Processo[];
    onAbrir: (processo: Processo) => void;
    onEditar: (processo: Processo) => void;
    onExcluir: (id: string) => void;
    onAlterarStatus: (processo: Processo, novoStatus: number) => void;
};

function ProcessoList({processos, onAbrir, onEditar, onExcluir, onAlterarStatus}: Props) {

    const ativos = processos.filter(
        (processo) => processo.status === 1
    );

    const finalizados = processos.filter(
        (processo) => processo.status === 2
    );

    const arquivados = processos.filter(
        (processo) => processo.status === 3
    );

    function soltarProcesso(
        e: React.DragEvent<HTMLElement>,
        novoStatus: number
    ) {
        e.preventDefault();

        const processoId =
            e.dataTransfer.getData("processoId");

        const processo = processos.find(
            (item) => item.id === processoId
        );

        if (!processo) return;

        onAlterarStatus(processo, novoStatus);
    }


    function renderizarColuna(
        titulo: string,
        lista: Processo[],
        classe: string,
        status: number
    ) {
        return (
            <section className="kanban-column"
                     onDragOver={(e) => e.preventDefault()}
                     onDrop={(e) => soltarProcesso(e, status)}
            >
                <div className="kanban-column-header">
                    <div className={`status-dot ${classe}`}></div>

                    <h2>{titulo}</h2>

                    <span className="process-count">
                        {lista.length}
                    </span>
                </div>

                <div className="kanban-cards">
                    {lista.length === 0 && (
                        <div className="empty-column">
                            Nenhum processo
                        </div>
                    )}

                    {lista.map((processo) => (
                        <article
                            className="process-card"
                            key={processo.id}
                            draggable
                            onDragStart={(e) => {
                                e.dataTransfer.setData(
                                    "processoId",
                                    processo.id
                                );
                            }}
                        >
                            <span className="process-number">
                                {processo.numero}
                            </span>

                            <h3>{processo.assunto}</h3>

                            <span className="process-date">
                                Criado em{" "}
                                {new Date(
                                    processo.dataCriacao
                                ).toLocaleDateString("pt-BR")}
                            </span>

                            <div className="process-actions">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => onAbrir(processo)}
                                >
                                    Visualizar
                                </button>

                                <button
                                    className="btn btn-secondary"
                                    onClick={() =>
                                        onEditar(processo)
                                    }
                                >
                                    Editar
                                </button>

                                <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                        onExcluir(processo.id)
                                    }
                                >
                                    Excluir
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="kanban-section">
            <div className="kanban-title">
                <div>
                    <span className="eyebrow">
                        Visão geral
                    </span>

                    <h1>Processos</h1>
                </div>

                <span className="total-processes">
                    {processos.length} processos
                </span>
            </div>

            <div className="kanban-board">
                {renderizarColuna(
                    "Ativos",
                    ativos,
                    "status-active",
                    1
                )}

                {renderizarColuna(
                    "Finalizados",
                    finalizados,
                    "status-finished",
                    2
                )}

                {renderizarColuna(
                    "Arquivados",
                    arquivados,
                    "status-archived",
                    3
                )}
            </div>
        </section>
    );
}

export default ProcessoList;