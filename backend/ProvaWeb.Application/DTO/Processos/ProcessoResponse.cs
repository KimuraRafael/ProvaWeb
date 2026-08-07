using ProvaWeb.Domain.Enums;

namespace ProvaWeb.Application.DTO.Processos;

public class ProcessoResponse
{
    public Guid Id { get; set; }
    public string Numero { get; set; } = string.Empty;
    public string Assunto { get; set; } = string.Empty;
    public DateTime DataCriacao { get; set; }
    public StatusProcesso Status { get; set; }
}