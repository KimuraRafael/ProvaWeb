import {useEffect, useState} from "react";
import type {Processo, Parte, Movimentacao} from "./types";
import {processoService} from "./servicos/processoService";
import ProcessoList from "./componentes/ProcessoList";
import ProcessoForm from "./componentes/ProcessoForm";
import ProcessoDetalhes from "./componentes/ProcessoDetalhes";


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
        processoService
            .listar()
            .then(setProcessos)
            .catch(console.error);
    }, []);

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

        } catch (erro) {
            console.error(
                "Erro ao criar processo",
                erro
            );
        }
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

        } catch (erro) {
            console.error(
                "Erro ao atualizar processo",
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
        <main>
            <h1>Processos</h1>

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

            <ProcessoList
                processos={processos}
                onAbrir={abrirProcesso}
                onEditar={iniciarEdicao}
                onExcluir={excluirProcesso}
            />

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

                    onDescricaoMovimentacaoChange={setDescricaoMovimentacao}
                    onAdicionarMovimentacao={adicionarMovimentacao}
                />
            )}
        </main>
    );
}

export default App;