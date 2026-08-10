import type {
    Processo,
    Parte,
    Movimentacao
} from "../types";

const API_URL = "http://localhost:5166/api";

async function request<T>(
    url: string,
    options?: RequestInit
): Promise<T> {

    const response = await fetch(url, options);

    if (!response.ok) {
        const erro = await response.text();

        throw new Error(
            erro || `Erro HTTP ${response.status}`
        );
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return response.json();
}

export const processoService = {

    listar(): Promise<Processo[]> {
        return request<Processo[]>(
            `${API_URL}/processo`
        );
    },

    criar(
        numero: string,
        assunto: string
    ): Promise<Processo> {

        return request<Processo>(
            `${API_URL}/processo`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    numero,
                    assunto
                }),
            }
        );
    },

    atualizar(
        id: string,
        numero: string,
        assunto: string,
        status: number
    ): Promise<Processo> {

        return request<Processo>(
            `${API_URL}/processo/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    numero,
                    assunto,
                    status
                }),
            }
        );
    },

    excluir(id: string): Promise<void> {
        return request<void>(
            `${API_URL}/processo/${id}`,
            {
                method: "DELETE",
            }
        );
    },

    listarPartes(
        processoId: string
    ): Promise<Parte[]> {

        return request<Parte[]>(
            `${API_URL}/processo/${processoId}/parte`
        );
    },

    adicionarParte(
        processoId: string,
        nome: string,
        tipoParte: number
    ): Promise<Parte> {

        return request<Parte>(
            `${API_URL}/processo/${processoId}/parte`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome,
                    tipoParte
                }),
            }
        );
    },

    excluirParte(
        processoId: string,
        parteId: string
    ): Promise<void> {

        return request<void>(
            `${API_URL}/processo/${processoId}/parte/${parteId}`,
            {
                method: "DELETE",
            }
        );
    },

    listarMovimentacoes(
        processoId: string
    ): Promise<Movimentacao[]> {

        return request<Movimentacao[]>(
            `${API_URL}/processo/${processoId}/movimentacoes`
        );
    },

    adicionarMovimentacao(
        processoId: string,
        descricao: string
    ): Promise<Movimentacao> {

        return request<Movimentacao>(
            `${API_URL}/processo/${processoId}/movimentacoes`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    descricao
                }),
            }
        );
    }
};