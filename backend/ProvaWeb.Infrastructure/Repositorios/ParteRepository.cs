using Microsoft.EntityFrameworkCore;
using ProvaWeb.Application.Interfaces;
using ProvaWeb.Domain.Entidades;
using ProvaWeb.Infrastructure.Persistencia;

namespace ProvaWeb.Infrastructure.Repositorios;

public class ParteRepository : IParteRepository
{
    private readonly ProvaWebDbContext _context;

    public ParteRepository(ProvaWebDbContext context)
    {
        _context = context;
    }

    public async Task<List<Parte>> ListarPorProcessoAsync(Guid processoId)
    {
        return await _context.Partes
            .AsNoTracking()
            .Where(p => p.ProcessoId == processoId)
            .ToListAsync();
    }

    public async Task<Parte?> BuscarPorIdAsync(Guid id)
    {
        return await _context.Partes.FindAsync(id);
    }

    public async Task AdicionarAsync(Parte parte)
    {
        await _context.Partes.AddAsync(parte);
        await _context.SaveChangesAsync();
    }

    public async Task RemoverAsync(Parte parte)
    {
        _context.Partes.Remove(parte);
        await _context.SaveChangesAsync();
    }
}