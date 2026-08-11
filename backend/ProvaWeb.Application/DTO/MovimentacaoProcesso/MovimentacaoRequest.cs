using System.ComponentModel.DataAnnotations;

namespace ProvaWeb.Application.DTO.MovimentacaoProcesso;

public class MovimentacaoRequest
{
    
    [Required]
    public String Descricao { get;  set; } = string.Empty;

    public DateTime DataMovimentacao { get; set; } =  DateTime.UtcNow;
}