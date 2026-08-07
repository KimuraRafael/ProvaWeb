using ProvaWeb.Domain.Enums;

namespace ProvaWeb.Domain.Entidades;

public class Parte
{
    public Guid Id{ get; private set; }

    public string Nome { get; private set; } = string.Empty;

    public TipoParte Tipo { get; private set; }

    public Guid ProcessoId { get; private set; }

    public Processo Processo { get; private set; } = null!;

    private Parte()
    {
    }

    public Parte(
        string nome,
        TipoParte tipo,
        Guid processoId)
    {
        Id = Guid.NewGuid();
        Nome = nome;
        Tipo = tipo;
        ProcessoId = processoId;
    }
}