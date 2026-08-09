using Microsoft.EntityFrameworkCore;
using ProvaWeb.Application.Interfaces;
using ProvaWeb.Domain.Entidades;
using ProvaWeb.Infrastructure.Persistencia;

namespace ProvaWeb.Infrastructure.Repositorios;

public class MovimentacaoRepository : IMovimentacaoRepository
{
    private readonly ProvaWebDbContext _context;

    public MovimentacaoRepository(ProvaWebDbContext context)
    {
        _context = context;
    }

    public async Task<List<MovimentacaoProcesso>> ListarPorProcessoAsync(Guid processoId)
    {
        return await _context.Movimentacoes
            .AsNoTracking()
            .Where(m => m.ProcessoId == processoId)
            .OrderByDescending(m => m.DataMovimentacao) 
            .ToListAsync();
    }

    public async Task AdicionarAsync(MovimentacaoProcesso movimentacao)
    {
        await _context.Movimentacoes.AddAsync(movimentacao);
        await _context.SaveChangesAsync();
    }
}