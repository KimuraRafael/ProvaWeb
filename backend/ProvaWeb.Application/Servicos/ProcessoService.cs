using ProvaWeb.Application.DTO.Processos;
using ProvaWeb.Application.Interfaces;
using ProvaWeb.Domain.Entidades;

namespace ProvaWeb.Application.Servicos;

public class ProcessoService
{
    private readonly IProcessoRepository _repository;

    public ProcessoService(IProcessoRepository processoRepository)
    {
        _repository = processoRepository;
    }
    
    public async Task<ProcessoResponse> CriarAsync(
        CriarProcessoRequest request)
    {
        var processo = new Processo(
            request.Numero,
            request.Assunto
        );

        await _repository.AdicionarAsync(processo);

        return MapearParaResponse(processo);
    }

    public async Task<ProcessoResponse?> BuscarPorIdAsync(Guid id)
    {
        var processo = await _repository.BuscarPorIdAsync(id);

        if (processo is null)
            return null;

        return MapearParaResponse(processo);
    }

    public async Task<List<ProcessoResponse>> ListarAsync()
    {
        var processos = await _repository.ListarAsync();

        return processos
            .Select(MapearParaResponse)
            .ToList();
    }

    public async Task<ProcessoResponse?> AtualizarAsync(
        Guid id,
        AtualizarProcessoRequest request)
    {
        var processo = await _repository.BuscarPorIdAsync(id);

        if (processo is null)
            return null;

        processo.Atualizar(
            request.Numero,
            request.Assunto
        );

        processo.AlterarStatus(request.Status);

        await _repository.AtualizarAsync(processo);

        return MapearParaResponse(processo);
    }

    public async Task<bool> RemoverAsync(Guid id)
    {
        var processo = await _repository.BuscarPorIdAsync(id);

        if (processo is null)
            return false;

        await _repository.RemoverAsync(processo);

        return true;
    }

    private static ProcessoResponse MapearParaResponse(
        Processo processo)
    {
        return new ProcessoResponse
        {
            Id = processo.Id,
            Numero = processo.Numero,
            Assunto = processo.Assunto,
            DataCriacao = processo.DataCriacao,
            Status = processo.Status
        };
    }
}