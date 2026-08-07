using ProvaWeb.Domain.Enums;

namespace ProvaWeb.Domain.Entidades;

public class Processo
{
    public Guid Id { get; private set; }

    public string Numero { get; private set; } = string.Empty;

    public string Assunto { get; private set; } = string.Empty;
    
    public DateTime DataCriacao { get; private set; }

    public StatusProcesso Status { get; private set; }

    public ICollection<Parte> Partes { get; private set; } = new List<Parte>();
    
    public ICollection<MovimentacaoProcesso> Movimentacoes { get; private set; } = new List<MovimentacaoProcesso>();

    
    private Processo()
    {
    }

    public Processo(string numero, string assunto)
    {
        Id = Guid.NewGuid();
        Numero = numero;
        Assunto = assunto;
        DataCriacao = DateTime.UtcNow;
        Status = StatusProcesso.Ativo;
    }

    public void Atualizar(string numero, string assunto)
    {
        Numero = numero;
        Assunto = assunto;
    }

    public void AlterarStatus(StatusProcesso status)
    {
        Status = status;
    }

}