import {useEffect, useState} from "react";

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


function App() {
    const [processos, setProcessos] = useState<Processo[]>([]);
    const [numero, setNumero] = useState("");
    const [assunto, setAssunto] = useState("");
    const [idEditando, setIdEditando] = useState<string | null>(null);
    const [status, setStatus] = useState(1);
    const [processoSelecionado, setProcessoSelecionado] = useState<Processo | null>(null);
    const [partes, setPartes] = useState<Parte[]>([]);
    const [nomeParte, setNomeParte] = useState("");
    const [tipoParte, setTipoParte] = useState(1);
    const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);
    const [descricaoMovimentacao, setDescricaoMovimentacao] = useState("");

    useEffect(() => {
        fetch("http://localhost:5166/api/processo")
            .then((response) => response.json())
            .then((data) => setProcessos(data));
    }, []);

    async function criarProcesso(e: React.FormEvent) {
        e.preventDefault();

        const response = await fetch(
            "http://localhost:5166/api/processo",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    numero: numero,
                    assunto: assunto,
                }),
            }
        );

        if (!response.ok) {
            console.error("Erro ao criar processo");
            return;
        }

        const novoProcesso: Processo = await response.json();

        setProcessos([...processos, novoProcesso]);

        setNumero("");
        setAssunto("");
    }

    function iniciarEdicao(processo: Processo) {
        setIdEditando(processo.id);
        setNumero(processo.numero);
        setAssunto(processo.assunto);
        setStatus(processo.status);
    }

    async function atualizarProcesso(e: React.FormEvent) {
        e.preventDefault();

        if (!idEditando) return;

        const response = await fetch(
            `http://localhost:5166/api/processo/${idEditando}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    numero,
                    assunto,
                    status,
                }),
            }
        );

        if (!response.ok) {
            console.error("Erro ao atualizar processo");
            return;
        }

        const processoAtualizado: Processo = await response.json();

        setProcessos(
            processos.map((processo) =>
                processo.id === idEditando
                    ? processoAtualizado
                    : processo
            )
        );

        setIdEditando(null);
        setNumero("");
        setAssunto("");
        setStatus(1);
    }

    async function excluirProcesso(id: string) {
        const response = await fetch(
            `http://localhost:5166/api/processo/${id}`,
            {
                method: "DELETE",
            }
        );


        if (!response.ok) {
            console.error("Erro ao excluir processo");
            return;
        }

        setProcessos(
            processos.filter((processo) => processo.id !== id)
        );
    }

    async function abrirProcesso(processo: Processo) {
        setProcessoSelecionado(processo);

        const response = await fetch(
            `http://localhost:5166/api/processo/${processo.id}/parte`
        );

        if (!response.ok) {
            console.error("Erro ao carregar partes");
            return;
        }

        const responseMovimentacoes = await fetch(
            `http://localhost:5166/api/processo/${processo.id}/movimentacoes`
        );

        if (responseMovimentacoes.ok) {
            const dataMovimentacoes: Movimentacao[] =
                await responseMovimentacoes.json();

            setMovimentacoes(dataMovimentacoes);
        }

        const data: Parte[] = await response.json();

        setPartes(data);
    }

    async function adicionarParte(e: React.FormEvent) {
        e.preventDefault();

        if (!processoSelecionado) return;

        const response = await fetch(
            `http://localhost:5166/api/processo/${processoSelecionado.id}/parte`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome: nomeParte,
                    tipoParte: tipoParte,
                }),
            }
        );

        if (!response.ok) {
            console.error("Erro ao adicionar parte");
            return;
        }

        const novaParte: Parte = await response.json();

        setPartes([...partes, novaParte]);

        setNomeParte("");
        setTipoParte(1);
    }


    async function excluirParte(parteId: string) {
        if (!processoSelecionado) return;

        const response = await fetch(
            `http://localhost:5166/api/processo/${processoSelecionado.id}/parte/${parteId}`,
            {
                method: "DELETE",
            }
        );

        if (!response.ok) {
            console.error("Erro ao excluir parte");
            return;
        }

        setPartes(
            partes.filter((parte) => parte.id !== parteId)
        );
    }

    async function adicionarMovimentacao(e: React.FormEvent) {
        e.preventDefault();

        if (!processoSelecionado) return;

        const response = await fetch(
            `http://localhost:5166/api/processo/${processoSelecionado.id}/movimentacoes`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    descricao: descricaoMovimentacao,
                }),
            }
        );

        if (!response.ok) {
            console.error("Erro ao adicionar movimentação");
            return;
        }

        const novaMovimentacao: Movimentacao = await response.json();

        setMovimentacoes([
            novaMovimentacao,
            ...movimentacoes
        ]);

        setDescricaoMovimentacao("");
    }
    

    return (
        <main>
            <h1>Processos</h1>


            <form onSubmit={idEditando ? atualizarProcesso : criarProcesso}>

                <select
                    value={status}
                    onChange={(e) => setStatus(Number(e.target.value))}
                >
                    <option value={1}>Ativo</option>
                    <option value={2}>Finalizado</option>
                    <option value={3}>Arquivado</option>
                </select>

                <input
                    type="text"
                    placeholder="Número do processo"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Assunto"
                    value={assunto}
                    onChange={(e) => setAssunto(e.target.value)}
                />

                <button type="submit">
                    {idEditando ? "Salvar alterações" : "Criar processo"}
                </button>

            </form>


            {processos.map((processo) => (
                <div key={processo.id}>
                    <strong>{processo.numero}</strong>
                    <p>{processo.assunto}</p>

                    <button onClick={() => abrirProcesso(processo)}>
                        Abrir
                    </button>
                    <button onClick={() => iniciarEdicao(processo)}>
                        Editar
                    </button>
                    <button onClick={() => excluirProcesso(processo.id)}>
                        Excluir
                    </button>
                </div>
            ))}

          
            {processoSelecionado && (
                <section>
                    <h3>Partes</h3>

                    <form onSubmit={adicionarParte}>
                        <input
                            type="text"
                            placeholder="Nome da parte"
                            value={nomeParte}
                            onChange={(e) => setNomeParte(e.target.value)}
                        />

                        <select
                            value={tipoParte}
                            onChange={(e) => setTipoParte(Number(e.target.value))}
                        >
                            <option value={1}>Parte Interessada</option>
                            <option value={2}>Parte Contrária</option>
                        </select>

                        <button type="submit">
                            Adicionar parte
                        </button>
                    </form>
                    <br></br>
                    <h2>Detalhes do Processo</h2>
                    
                    <h3>Partes Relacionadas</h3>
                 
                    {partes.map((parte) => (
                        <div key={parte.id}>
                            <br></br>
                            <strong>{parte.nome}</strong>

                            <p>
                                {parte.tipoParte === 1
                                    ? "Parte Interessada"
                                    : "Parte Contrária"}
                            </p>

                            <button onClick={() => excluirParte(parte.id)}>
                                Remover parte
                            </button>
                        </div>
                    ))}

                    <h3>Movimentações</h3>

                    <form onSubmit={adicionarMovimentacao}>
                        <input
                            type="text"
                            placeholder="Descrição da movimentação"
                            value={descricaoMovimentacao}
                            onChange={(e) =>
                                setDescricaoMovimentacao(e.target.value)
                            }
                        />

                        <button type="submit">
                            Adicionar movimentação
                        </button>
                    </form>

                    {movimentacoes.map((movimentacao) => (
                        <div key={movimentacao.id}>
                            <br></br>
                            <strong>
                                {new Date(
                                    movimentacao.dataMovimentacao
                                ).toLocaleString("pt-BR")}
                            </strong>

                            <p>{movimentacao.descricao}</p>
                        </div>
                    ))}
                </section>
            )}
        </main>
    );
}

export default App;