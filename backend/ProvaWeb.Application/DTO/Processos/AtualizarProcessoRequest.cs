using System.ComponentModel.DataAnnotations;
using ProvaWeb.Domain.Enums;

namespace ProvaWeb.Application.DTO.Processos;

public class AtualizarProcessoRequest
{
    
    [Required]
    public string Numero { get; set; } = string.Empty;
    
    [Required]
    public string Assunto { get; set; } = string.Empty;
    
    public StatusProcesso Status { get; set; }
}