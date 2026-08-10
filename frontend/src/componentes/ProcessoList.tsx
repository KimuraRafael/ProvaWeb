type Processo = {
    id: string;
    numero: string;
    assunto: string;
    dataCriacao: string;
    status: number;
};

type Props = {
    processos: Processo[];
    onAbrir: (processo: Processo) => void;
    onEditar: (processo: Processo) => void;
    onExcluir: (id: string) => void;
};

function ProcessoList({
                          processos,
                          onAbrir,
                          onEditar,
                          onExcluir
                      }: Props) {

    return (
        <>
            {processos.map((processo) => (
                <div key={processo.id}>
                    <strong>{processo.numero}</strong>
                    <p>{processo.assunto}</p>

                    <button onClick={() => onAbrir(processo)}>
                        Abrir
                    </button>

                    <button onClick={() => onEditar(processo)}>
                        Editar
                    </button>

                    <button onClick={() => onExcluir(processo.id)}>
                        Excluir
                    </button>
                </div>
            ))}
        </>
    );
}

export default ProcessoList;