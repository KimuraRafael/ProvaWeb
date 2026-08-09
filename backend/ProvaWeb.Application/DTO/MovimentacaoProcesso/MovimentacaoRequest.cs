using System.ComponentModel.DataAnnotations;

namespace ProvaWeb.Application.DTO.MovimentacaoProcesso;

public class MovimentacaoRequest
{
    
    [Required]
    public String Descricao { get;  set; }

    public DateTime DataMovimentacao { get; set; } =  DateTime.UtcNow;
}