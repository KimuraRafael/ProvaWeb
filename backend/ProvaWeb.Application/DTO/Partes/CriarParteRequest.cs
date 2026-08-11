using System.ComponentModel.DataAnnotations;
using ProvaWeb.Domain.Enums;

namespace ProvaWeb.Application.DTO.Parte;

public class CriarParteRequest
{
    [Required]
    public string nome { get; set; } = string.Empty;
    
    public TipoParte tipoParte { get; set; }   
}