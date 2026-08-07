using ProvaWeb.Domain.Entidades;

namespace ProvaWeb.Application.Interfaces;

public interface IProcessoRepository
{

    Task<Processo?> BuscarPorIdAsync(Guid id);

    Task<List<Processo>> ListarAsync();

    Task AdicionarAsync(Processo processo);

    Task AtualizarAsync(Processo processo);

    Task RemoverAsync(Processo processo);

}