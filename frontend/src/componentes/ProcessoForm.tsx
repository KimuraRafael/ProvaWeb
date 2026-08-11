import type {FormEvent} from "react";
import "./ProcessoForm.css";

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
        <form
            className="process-form"
            onSubmit={onSubmit}
        >
            <div className="form-group">
                <label htmlFor="numero">
                    Número do processo
                </label>

                <input
                    id="numero"
                    type="text"
                    placeholder="Ex: PROC-2026-001"
                    value={numero}
                    onChange={(e) =>
                        onNumeroChange(e.target.value)
                    }
                />
            </div>

            <div className="form-group">
                <label htmlFor="assunto">
                    Assunto / descrição
                </label>

                <textarea
                    id="assunto"
                    rows={4}
                    placeholder="Descreva o assunto do processo"
                    value={assunto}
                    onChange={(e) =>
                        onAssuntoChange(e.target.value)
                    }
                />
            </div>

            {editando && (
                <div className="form-group">
                    <label htmlFor="status">
                        Status
                    </label>

                    <select
                        id="status"
                        value={status}
                        onChange={(e) =>
                            onStatusChange(
                                Number(e.target.value)
                            )
                        }
                    >
                        <option value={1}>Ativo</option>
                        <option value={2}>Finalizado</option>
                        <option value={3}>Arquivado</option>
                    </select>
                </div>
            )}

            <div className="process-form-actions">
                <button
                    type="submit"
                    className="btn btn-primary btn-create"
                >
                    {editando
                        ? "Salvar alterações"
                        : "Criar processo"}
                </button>
            </div>
        </form>
    );
}

export default ProcessoForm;