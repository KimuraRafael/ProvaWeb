import "./App.css";
import {useEffect, useRef, useState} from "react";
import type {Processo, Parte, Movimentacao} from "./types";
import {processoService} from "./servicos/processoService";
import ProcessoList from "./componentes/ProcessoList";
import ProcessoForm from "./componentes/ProcessoForm";
import ProcessoDetalhes from "./componentes/ProcessoDetalhes";
import ProcessoFiltros from "./componentes/ProcessoFiltros";

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
    const [formAberto, setFormAberto] = useState(false);
    const [busca, setBusca] = useState("");
    const [statusFiltro, setStatusFiltro] = useState(0);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const detalhesDialogRef = useRef<HTMLDialogElement>(null);

    const processosFiltrados = processos.filter((processo) => {
        const termo = busca.toLowerCase().trim();

        const correspondeBusca =
            processo.numero.toLowerCase().includes(termo) ||
            processo.assunto.toLowerCase().includes(termo);

        const correspondeStatus =
            statusFiltro === 0 ||
            processo.status === statusFiltro;

        return correspondeBusca && correspondeStatus;
    });

    useEffect(() => {
        processoService
            .listar()
            .then(setProcessos)
            .catch(console.error);
    }, []);

    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog) return;

        if (formAberto && !dialog.open) {
            dialog.showModal();
        }

        if (!formAberto && dialog.open) {
            dialog.close();
        }
    }, [formAberto]);

    async function criarProcesso(e: React.FormEvent) {
        e.preventDefault();

        try {
            const novoProcesso =
                await processoService.criar(
                    numero,
                    assunto
                );

            setProcessos((atuais) => [
                ...atuais,
                novoProcesso
            ]);

            setNumero("");
            setAssunto("");
            setFormAberto(false);

        } catch (erro) {
            console.error(
                "Erro ao criar processo",
                erro
            );
        }
    }


    async function atualizarProcesso(e: React.FormEvent) {
        e.preventDefault();

        if (!idEditando) return;

        try {
            const processoAtualizado =
                await processoService.atualizar(
                    idEditando,
                    numero,
                    assunto,
                    status
                );

            setProcessos((atuais) =>
                atuais.map((processo) =>
                    processo.id === idEditando
                        ? processoAtualizado
                        : processo
                )
            );

            if (processoSelecionado?.id === idEditando) {
                setProcessoSelecionado(processoAtualizado);
            }

            setIdEditando(null);
            setNumero("");
            setAssunto("");
            setStatus(1);
            setFormAberto(false);

        } catch (erro) {
            console.error(
                "Erro ao atualizar processo",
                erro
            );
        }
    }

    async function alterarStatusProcesso(
        processo: Processo,
        novoStatus: number
    ) {
        if (processo.status === novoStatus) return;

        try {
            const processoAtualizado =
                await processoService.atualizar(
                    processo.id,
                    processo.numero,
                    processo.assunto,
                    novoStatus
                );

            setProcessos((atuais) =>
                atuais.map((item) =>
                    item.id === processo.id
                        ? processoAtualizado
                        : item
                )
            );

            if (processoSelecionado?.id === processo.id) {
                setProcessoSelecionado(processoAtualizado);
            }

        } catch (erro) {
            console.error(
                "Erro ao alterar status do processo",
                erro
            );
        }
    }

    async function excluirProcesso(id: string) {
        try {
            await processoService.excluir(id);

            setProcessos((atuais) =>
                atuais.filter(
                    (processo) => processo.id !== id
                )
            );

            if (processoSelecionado?.id === id) {
                setProcessoSelecionado(null);
                setPartes([]);
                setMovimentacoes([]);
            }

            if (idEditando === id) {
                setIdEditando(null);
                setNumero("");
                setAssunto("");
                setStatus(1);
            }

        } catch (erro) {
            console.error(
                "Erro ao excluir processo",
                erro
            );
        }
    }

    function abrirNovoProcesso() {
        setIdEditando(null);
        setNumero("");
        setAssunto("");
        setStatus(1);
        setFormAberto(true);
    }

    function fecharFormulario() {
        setFormAberto(false);
        setIdEditando(null);
        setNumero("");
        setAssunto("");
        setStatus(1);
    }

    function iniciarEdicao(processo: Processo) {
        setIdEditando(processo.id);
        setNumero(processo.numero);
        setAssunto(processo.assunto);
        setStatus(processo.status);
        setFormAberto(true);
    }


    async function abrirProcesso(processo: Processo) {
        setProcessoSelecionado(processo);
        setPartes([]);
        setMovimentacoes([]);

        try {
            const [partesCarregadas, movimentacoesCarregadas] =
                await Promise.all([
                    processoService.listarPartes(processo.id),
                    processoService.listarMovimentacoes(processo.id)
                ]);

            setPartes(partesCarregadas);
            setMovimentacoes(movimentacoesCarregadas);

            detalhesDialogRef.current?.showModal();

        } catch (erro) {
            console.error(
                "Erro ao carregar detalhes",
                erro
            );
        }
    }

    async function adicionarParte(e: React.FormEvent) {
        e.preventDefault();

        if (!processoSelecionado) return;

        try {
            const novaParte =
                await processoService.adicionarParte(
                    processoSelecionado.id,
                    nomeParte,
                    tipoParte
                );

            setPartes((atuais) => [
                ...atuais,
                novaParte
            ]);

            setNomeParte("");
            setTipoParte(1);

        } catch (erro) {
            console.error(
                "Erro ao adicionar parte",
                erro
            );
        }
    }


    async function excluirParte(parteId: string) {
        if (!processoSelecionado) return;

        try {
            await processoService.excluirParte(
                processoSelecionado.id,
                parteId
            );

            setPartes((atuais) =>
                atuais.filter(
                    (parte) => parte.id !== parteId
                )
            );

        } catch (erro) {
            console.error(
                "Erro ao excluir parte",
                erro
            );
        }
    }

    async function adicionarMovimentacao(
        e: React.FormEvent
    ) {
        e.preventDefault();

        if (!processoSelecionado) return;

        try {
            const novaMovimentacao =
                await processoService.adicionarMovimentacao(
                    processoSelecionado.id,
                    descricaoMovimentacao
                );

            setMovimentacoes((atuais) => [
                novaMovimentacao,
                ...atuais
            ]);

            setDescricaoMovimentacao("");

        } catch (erro) {
            console.error(
                "Erro ao adicionar movimentação",
                erro
            );
        }
    }


    return (
        <main className="app-content">
            <div className="page-header">
                <div>
                    <span className="eyebrow">Visão geral</span>
                    <h1>Gestão de Processos</h1>
                </div>

                <button
                    className="btn btn-primary"
                    onClick={abrirNovoProcesso}
                >
                    + Novo processo
                </button>
            </div>

            <ProcessoFiltros
                busca={busca}
                status={statusFiltro}
                quantidadeFiltrada={processosFiltrados.length}
                quantidadeTotal={processos.length}
                onBuscaChange={setBusca}
                onStatusChange={setStatusFiltro}
            />

            <ProcessoList
                processos={processosFiltrados}
                onAbrir={abrirProcesso}
                onEditar={iniciarEdicao}
                onExcluir={excluirProcesso}
                onAlterarStatus={alterarStatusProcesso}
            />
            
      
            <dialog
                ref={dialogRef}
                className="process-dialog"
                onClose={() => setFormAberto(false)}
            >
                <div className="dialog-header">
                    <div>
            <span className="eyebrow">
                {idEditando ? "Edição" : "Cadastro"}
            </span>

                        <h2>
                            {idEditando
                                ? "Editar processo"
                                : "Novo processo"}
                        </h2>
                    </div>

                    <button
                        type="button"
                        className="dialog-close"
                        onClick={fecharFormulario}
                        aria-label="Fechar"
                    >
                        ×
                    </button>
                </div>

                <ProcessoForm
                    numero={numero}
                    assunto={assunto}
                    status={status}
                    editando={idEditando !== null}
                    onNumeroChange={setNumero}
                    onAssuntoChange={setAssunto}
                    onStatusChange={setStatus}
                    onSubmit={
                        idEditando
                            ? atualizarProcesso
                            : criarProcesso
                    }
                />
            </dialog>

            <dialog
                ref={detalhesDialogRef}
                className="details-dialog"
            >
                <button
                    type="button"
                    className="details-dialog-close"
                    onClick={() =>
                        detalhesDialogRef.current?.close()
                    }
                    aria-label="Fechar detalhes"
                >
                    ×
                </button>

                {processoSelecionado && (
                    <ProcessoDetalhes
                        processo={processoSelecionado}

                        partes={partes}
                        nomeParte={nomeParte}
                        tipoParte={tipoParte}

                        movimentacoes={movimentacoes}
                        descricaoMovimentacao={descricaoMovimentacao}

                        onNomeParteChange={setNomeParte}
                        onTipoParteChange={setTipoParte}
                        onAdicionarParte={adicionarParte}
                        onExcluirParte={excluirParte}

                        onDescricaoMovimentacaoChange={
                            setDescricaoMovimentacao
                        }
                        onAdicionarMovimentacao={
                            adicionarMovimentacao
                        }
                    />
                )}
            </dialog>


        </main>
    );
}

export default App;