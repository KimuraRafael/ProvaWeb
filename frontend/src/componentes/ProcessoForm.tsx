import type { FormEvent } from "react";

type Props = {
    numero: string;
    assunto: string;
    status: number;
    editando: boolean;

    onNumeroChange: (valor: string) => void;
    onAssuntoChange: (valor: string) => void;
    onStatusChange: (valor: number) => void;

    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

function ProcessoForm({
                          numero,
                          assunto,
                          status,
                          editando,
                          onNumeroChange,
                          onAssuntoChange,
                          onStatusChange,
                          onSubmit
                      }: Props) {

    return (
        <form onSubmit={onSubmit}>

            {editando && (
                <select
                    value={status}
                    onChange={(e) =>
                        onStatusChange(Number(e.target.value))
                    }
                >
                    <option value={1}>Ativo</option>
                    <option value={2}>Finalizado</option>
                    <option value={3}>Arquivado</option>
                </select>
            )}

            <input
                type="text"
                placeholder="Número do processo"
                value={numero}
                onChange={(e) =>
                    onNumeroChange(e.target.value)
                }
            />

            <input
                type="text"
                placeholder="Assunto"
                value={assunto}
                onChange={(e) =>
                    onAssuntoChange(e.target.value)
                }
            />

            <button type="submit">
                {editando
                    ? "Salvar alterações"
                    : "Criar processo"}
            </button>

        </form>
    );
}

export default ProcessoForm;