namespace ProvaWeb.Domain.Entidades;

public class MovimentacaoProcesso
{
    public Guid Id { get; private set; }

    public DateTime DataMovimentacao { get; private set; }

    public string Descricao { get; private set; } = string.Empty;

    public Guid ProcessoId { get; private set; }

    public Processo Processo { get; private set; } = null!;

    private MovimentacaoProcesso()
    {
    }

    public MovimentacaoProcesso(
        DateTime dataMovimentacao,
        string descricao,
        Guid processoId)
    {
        Id = Guid.NewGuid();
        DataMovimentacao = dataMovimentacao;
        Descricao = descricao;
        ProcessoId = processoId;
    }
}