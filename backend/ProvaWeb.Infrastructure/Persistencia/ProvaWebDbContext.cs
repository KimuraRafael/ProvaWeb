using Microsoft.EntityFrameworkCore;
using ProvaWeb.Domain.Entidades;

namespace ProvaWeb.Infrastructure;

public class ProvaWebDbContext : DbContext
{
    public ProvaWebDbContext(
            DbContextOptions<ProvaWebDbContext> options)
        : base(options)
    {
    }

    public DbSet<Processo> Processos { get; set; }

    public DbSet<Parte> Partes { get; set; }

    public DbSet<MovimentacaoProcesso> Movimentacoes { get; set; }
}