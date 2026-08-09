using ProvaWeb.Domain.Entidades;

namespace ProvaWeb.Application.Interfaces;

public interface IMovimentacaoRepository
{
    Task<List<MovimentacaoProcesso>> ListarPorProcessoAsync(Guid processoId);
    
    Task AdicionarAsync(MovimentacaoProcesso movimentacao);
}