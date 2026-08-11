import type { FormEvent } from "react";
import "./ProcessoDetalhes.css";

type Processo = {
    id: string;
    numero: string;
    assunto: string;
    dataCriacao: string;
    status: number;
};

type Parte = {
    id: string;
    nome: string;
    tipoParte: number;
    processoId: string;
};

type Movimentacao = {
    id: string;
    dataMovimentacao: string;
    descricao: string;
    processoId: string;
};

type Props = {
    processo: Processo;

    partes: Parte[];
    nomeParte: string;
    tipoParte: number;

    movimentacoes: Movimentacao[];
    descricaoMovimentacao: string;

    onNomeParteChange: (valor: string) => void;
    onTipoParteChange: (valor: number) => void;
    onAdicionarParte: (e: FormEvent<HTMLFormElement>) => void;
    onExcluirParte: (id: string) => void;

    onDescricaoMovimentacaoChange: (valor: string) => void;
    onAdicionarMovimentacao: (e: FormEvent<HTMLFormElement>) => void;
};

function ProcessoDetalhes({
                              processo,
                              partes,
                              nomeParte,
                              tipoParte,
                              movimentacoes,
                              descricaoMovimentacao,
                              onNomeParteChange,
                              onTipoParteChange,
                              onAdicionarParte,
                              onExcluirParte,
                              onDescricaoMovimentacaoChange,
                              onAdicionarMovimentacao
                          }: Props) {

    const partesInteressadas = partes.filter(
        (parte) => parte.tipoParte === 1
    );

    const partesContrarias = partes.filter(
        (parte) => parte.tipoParte === 2
    );

    return (
        <section className="details-container">

            <div className="details-header">
                <div>
                    <span className="eyebrow">
                        Processo selecionado
                    </span>

                    <h2>{processo.numero}</h2>

                    <p>{processo.assunto}</p>
                </div>
            </div>

            <div className="details-grid">

                <div className="details-card">

                    <h3>Partes envolvidas</h3>

                    <form
                        className="parte-form"
                        onSubmit={onAdicionarParte}
                    >
                        <input
                            type="text"
                            placeholder="Nome da parte"
                            value={nomeParte}
                            onChange={(e) =>
                                onNomeParteChange(e.target.value)
                            }
                        />

                        <select
                            value={tipoParte}
                            onChange={(e) =>
                                onTipoParteChange(
                                    Number(e.target.value)
                                )
                            }
                        >
                            <option value={1}>
                                Parte Interessada
                            </option>

                            <option value={2}>
                                Parte Contrária
                            </option>
                        </select>

                        <button
                            className="btn btn-primary"
                            type="submit"
                        >
                            Adicionar
                        </button>
                    </form>

                    <div className="partes-groups">

                        <div>
                            <span className="group-title interested">
                                Interessadas
                            </span>

                            {partesInteressadas.length === 0 && (
                                <p className="empty-message">
                                    Nenhuma parte interessada.
                                </p>
                            )}

                            {partesInteressadas.map((parte) => (
                                <div
                                    className="parte-item"
                                    key={parte.id}
                                >
                                    <span>{parte.nome}</span>

                                    <button
                                        onClick={() =>
                                            onExcluirParte(parte.id)
                                        }
                                    >
                                        Remover
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div>
                            <span className="group-title contrary">
                                Contrárias
                            </span>

                            {partesContrarias.length === 0 && (
                                <p className="empty-message">
                                    Nenhuma parte contrária.
                                </p>
                            )}

                            {partesContrarias.map((parte) => (
                                <div
                                    className="parte-item"
                                    key={parte.id}
                                >
                                    <span>{parte.nome}</span>

                                    <button
                                        onClick={() =>
                                            onExcluirParte(parte.id)
                                        }
                                    >
                                        Remover
                                    </button>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>


                <div className="details-card">

                    <h3>Histórico de movimentações</h3>

                    <form
                        className="movement-form"
                        onSubmit={onAdicionarMovimentacao}
                    >
                        <textarea
                            rows={3}
                            placeholder="Descrição da movimentação"
                            value={descricaoMovimentacao}
                            onChange={(e) =>
                                onDescricaoMovimentacaoChange(
                                    e.target.value
                                )
                            }
                        />

                        <button
                            className="btn btn-primary"
                            type="submit"
                        >
                            Adicionar movimentação
                        </button>
                    </form>

                    <div className="timeline">

                        {movimentacoes.length === 0 && (
                            <p className="empty-message">
                                Nenhuma movimentação registrada.
                            </p>
                        )}

                        {movimentacoes.map((movimentacao) => (
                            <div
                                className="timeline-item"
                                key={movimentacao.id}
                            >
                                <span className="timeline-date">
                                    {new Date(
                                        movimentacao.dataMovimentacao
                                    ).toLocaleString("pt-BR")}
                                </span>

                                <p>{movimentacao.descricao}</p>
                            </div>
                        ))}

                    </div>

                </div>

            </div>

        </section>
    );
}

export default ProcessoDetalhes;