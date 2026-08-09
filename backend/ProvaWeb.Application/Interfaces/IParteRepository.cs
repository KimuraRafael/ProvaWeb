using ProvaWeb.Domain.Entidades;

namespace ProvaWeb.Application.Interfaces;

public interface IParteRepository
{
    Task<List<Parte>> ListarPorProcessoAsync(Guid processoId);
   
    Task<Parte?> BuscarPorIdAsync(Guid id);
    
    Task AdicionarAsync(Parte parte);
    
    Task RemoverAsync(Parte parte);
}