using ProvaWeb.Application.Interfaces;
using ProvaWeb.Domain.Entidades;
using ProvaWeb.Infrastructure.Persistencia;
using Microsoft.EntityFrameworkCore;

namespace ProvaWeb.Infrastructure.Repositorios;

public class ProcessoRepository : IProcessoRepository
{
    private readonly ProvaWebDbContext _context;

    public ProcessoRepository(ProvaWebDbContext context)
    {
        _context = context;
    }

    public async Task<Processo?> BuscarPorIdAsync(Guid id)
    {
        return await _context.Processos.FindAsync(id);
    }

    public Task<List<Processo>> ListarAsync()
    {
        return _context.Processos
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task AdicionarAsync(Processo processo)
    {
        await _context.Processos.AddAsync(processo);
        await _context.SaveChangesAsync();
    }

    public async Task AtualizarAsync(Processo processo)
    {
        _context.Processos.Update(processo);
        await _context.SaveChangesAsync();
    }

    public async Task RemoverAsync(Processo processo)
    {
        _context.Processos.Remove(processo);
        await _context.SaveChangesAsync();
    }
}