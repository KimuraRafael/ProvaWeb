using Microsoft.EntityFrameworkCore;
using ProvaWeb.Domain.Entidades;

namespace ProvaWeb.Infrastructure.Persistencia;

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
    
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Processo>(entity =>
        {
            entity.HasKey(p => p.Id);

            entity.Property(p => p.Numero)
                .IsRequired()
                .HasMaxLength(50);

            entity.Property(p => p.Assunto)
                .IsRequired()
                .HasMaxLength(500);

            entity.Property(p => p.DataCriacao)
                .IsRequired();

            entity.Property(p => p.Status)
                .IsRequired();

            entity.HasMany(p => p.Partes)
                .WithOne(p => p.Processo)
                .HasForeignKey(p => p.ProcessoId);

            entity.HasMany(p => p.Movimentacoes)
                .WithOne(m => m.Processo)
                .HasForeignKey(m => m.ProcessoId);
        });

        modelBuilder.Entity<Parte>(entity =>
        {
            entity.HasKey(p => p.Id);

            entity.Property(p => p.Nome)
                .IsRequired()
                .HasMaxLength(200);

            entity.Property(p => p.Tipo)
                .IsRequired();
        });

        modelBuilder.Entity<MovimentacaoProcesso>(entity =>
        {
            entity.HasKey(m => m.Id);

            entity.Property(m => m.DataMovimentacao)
                .IsRequired();

            entity.Property(m => m.Descricao)
                .IsRequired()
                .HasMaxLength(1000);
        });
    }
}