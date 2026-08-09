using ProvaWeb.Domain.Enums;

namespace ProvaWeb.Application.DTO.Parte;

public class ParteResponse
{
    public Guid Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public TipoParte TipoParte { get; set; }
    public Guid ProcessoId { get; set; } 
}