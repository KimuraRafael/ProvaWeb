export type Processo = {
    id: string;
    numero: string;
    assunto: string;
    dataCriacao: string;
    status: number;
};

export type Parte = {
    id: string;
    nome: string;
    tipoParte: number;
    processoId: string;
};

export type Movimentacao = {
    id: string;
    dataMovimentacao: string;
    descricao: string;
    processoId: string;
};