using ProvaWeb.Domain.Entidades;

namespace ProvaWeb.Application.DTO.MovimentacaoProcesso;

public class MovimentacaoResponse
{
    public Guid Id { get;  set; }

    public DateTime DataMovimentacao { get; set; }

    public string Descricao { get; set; } = string.Empty;

    public Guid ProcessoId { get; set; }

    
}