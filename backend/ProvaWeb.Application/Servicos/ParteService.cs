using ProvaWeb.Application.DTO.Parte;
using ProvaWeb.Application.Interfaces;
using ProvaWeb.Domain.Entidades;

namespace ProvaWeb.Application.Servicos;

public class ParteService
{
    private readonly IParteRepository _parteRepository;
    private readonly IProcessoRepository _processoRepository;

    public ParteService(
        IParteRepository parteRepository,
        IProcessoRepository processoRepository)
    {
        _parteRepository = parteRepository;
        _processoRepository = processoRepository;
    }

    public async Task<List<ParteResponse>> ListarPorProcessoAsync(Guid processoId)
    {
        var partes = await _parteRepository.ListarPorProcessoAsync(processoId);

        return partes
            .Select(MapearParaResponse)
            .ToList();
    }

    public async Task<ParteResponse?> AdicionarAsync(
        Guid processoId,
        CriarParteRequest request)
    {
        var processo = await _processoRepository.BuscarPorIdAsync(processoId);

        if (processo is null)
            return null;

        var parte = new Parte(
            request.nome,
            request.tipoParte,
            processoId
        );

        await _parteRepository.AdicionarAsync(parte);

        return MapearParaResponse(parte);
    }

    public async Task<bool> RemoverAsync(Guid processoId, Guid parteId)
    {
        var parte = await _parteRepository.BuscarPorIdAsync(parteId);

        if (parte is null)
            return false;

        if (parte.ProcessoId != processoId)
            return false;

        await _parteRepository.RemoverAsync(parte);

        return true;
    }

    private static ParteResponse MapearParaResponse(Parte parte)
    {
        return new ParteResponse
        {
            Id = parte.Id,
            Nome = parte.Nome,
            TipoParte = parte.Tipo,
            ProcessoId = parte.ProcessoId
        };
    }
}