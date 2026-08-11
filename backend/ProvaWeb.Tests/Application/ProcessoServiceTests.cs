using ProvaWeb.Application.DTO.Processos;
using ProvaWeb.Application.Interfaces;
using ProvaWeb.Application.Servicos;
using ProvaWeb.Domain.Entidades;
using ProvaWeb.Domain.Enums;

namespace ProvaWeb.Tests.Application;

public class ProcessoServiceTests
{
    [Fact]
    public async Task CriarAsync_DeveAdicionarProcessoERetornarResponse()
    {
        // Arrange
        var repository = new ProcessoRepositoryFake();
        var service = new ProcessoService(repository);

        var request = new CriarProcessoRequest
        {
            Numero = "000123",
            Assunto = "Cobrança contratual"
        };

        // Act
        var response = await service.CriarAsync(request);

        // Assert
        Assert.Equal("000123", response.Numero);
        Assert.Equal("Cobrança contratual", response.Assunto);
        Assert.Equal(StatusProcesso.Ativo, response.Status);

        Assert.Single(repository.Processos);
    }

    [Fact]
    public async Task BuscarPorIdAsync_QuandoNaoExistir_DeveRetornarNull()
    {
        // Arrange
        var repository = new ProcessoRepositoryFake();
        var service = new ProcessoService(repository);

        // Act
        var response =
            await service.BuscarPorIdAsync(Guid.NewGuid());

        // Assert
        Assert.Null(response);
    }

    [Fact]
    public async Task AtualizarAsync_DeveAtualizarProcessoExistente()
    {
        // Arrange
        var repository = new ProcessoRepositoryFake();

        var processo = new Processo(
            "000123",
            "Assunto inicial"
        );

        repository.Processos.Add(processo);

        var service = new ProcessoService(repository);

        var request = new AtualizarProcessoRequest
        {
            Numero = "000456",
            Assunto = "Assunto atualizado",
            Status = StatusProcesso.Finalizado
        };

        // Act
        var response =
            await service.AtualizarAsync(
                processo.Id,
                request
            );

        // Assert
        Assert.NotNull(response);

        Assert.Equal(
            "000456",
            response.Numero
        );

        Assert.Equal(
            "Assunto atualizado",
            response.Assunto
        );

        Assert.Equal(
            StatusProcesso.Finalizado,
            response.Status
        );

        Assert.True(repository.Atualizou);
    }

    [Fact]
    public async Task RemoverAsync_DeveRemoverProcessoExistente()
    {
        // Arrange
        var repository = new ProcessoRepositoryFake();

        var processo = new Processo(
            "000123",
            "Cobrança contratual"
        );

        repository.Processos.Add(processo);

        var service = new ProcessoService(repository);

        // Act
        var resultado =
            await service.RemoverAsync(processo.Id);

        // Assert
        Assert.True(resultado);
        Assert.Empty(repository.Processos);
    }


    private class ProcessoRepositoryFake
        : IProcessoRepository
    {
        public List<Processo> Processos { get; } = [];

        public bool Atualizou { get; private set; }


        public Task<Processo?> BuscarPorIdAsync(Guid id)
        {
            var processo = Processos
                .FirstOrDefault(p => p.Id == id);

            return Task.FromResult(processo);
        }


        public Task<List<Processo>> ListarAsync()
        {
            return Task.FromResult(
                Processos.ToList()
            );
        }


        public Task AdicionarAsync(Processo processo)
        {
            Processos.Add(processo);

            return Task.CompletedTask;
        }


        public Task AtualizarAsync(Processo processo)
        {
            Atualizou = true;

            return Task.CompletedTask;
        }


        public Task RemoverAsync(Processo processo)
        {
            Processos.Remove(processo);

            return Task.CompletedTask;
        }
    }
}