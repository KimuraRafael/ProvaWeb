using System.ComponentModel.DataAnnotations;

namespace ProvaWeb.Application.DTO.Processos;

public class CriarProcessoRequest
{
    [Required]
    public string Numero { get; set; } = string.Empty;
    
    [Required]
    public string Assunto { get; set; } = string.Empty;
}