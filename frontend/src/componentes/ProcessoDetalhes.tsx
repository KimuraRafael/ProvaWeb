import type { FormEvent } from "react";

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

    return (
        <section>
            <h2>Detalhes do Processo</h2>

            <strong>{processo.numero}</strong>
            <p>{processo.assunto}</p>

            <h3>Partes</h3>

            <form onSubmit={onAdicionarParte}>
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
                        onTipoParteChange(Number(e.target.value))
                    }
                >
                    <option value={1}>Parte Interessada</option>
                    <option value={2}>Parte Contrária</option>
                </select>

                <button type="submit">
                    Adicionar parte
                </button>
            </form>

            <h3>Partes Relacionadas</h3>

            {partes.map((parte) => (
                <div key={parte.id}>
                    <strong>{parte.nome}</strong>

                    <p>
                        {parte.tipoParte === 1
                            ? "Parte Interessada"
                            : "Parte Contrária"}
                    </p>

                    <button
                        onClick={() => onExcluirParte(parte.id)}
                    >
                        Remover parte
                    </button>
                </div>
            ))}

            <h3>Movimentações</h3>

            <form onSubmit={onAdicionarMovimentacao}>
                <input
                    type="text"
                    placeholder="Descrição da movimentação"
                    value={descricaoMovimentacao}
                    onChange={(e) =>
                        onDescricaoMovimentacaoChange(
                            e.target.value
                        )
                    }
                />

                <button type="submit">
                    Adicionar movimentação
                </button>
            </form>

            {movimentacoes.map((movimentacao) => (
                <div key={movimentacao.id}>
                    <strong>
                        {new Date(
                            movimentacao.dataMovimentacao
                        ).toLocaleString("pt-BR")}
                    </strong>

                    <p>{movimentacao.descricao}</p>
                </div>
            ))}
        </section>
    );
}

export default ProcessoDetalhes;