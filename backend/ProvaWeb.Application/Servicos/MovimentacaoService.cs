using ProvaWeb.Application.DTO.MovimentacaoProcesso;
using ProvaWeb.Application.Interfaces;
using ProvaWeb.Domain.Entidades;

namespace ProvaWeb.Application.Servicos;

public class MovimentacaoService
{
    private readonly IMovimentacaoRepository _movimentacaoRepository;
    private readonly IProcessoRepository _processoRepository;

    public MovimentacaoService(
        IMovimentacaoRepository movimentacaoRepository,
        IProcessoRepository processoRepository)
    {
        _movimentacaoRepository = movimentacaoRepository;
        _processoRepository = processoRepository;
    }

    public async Task<List<MovimentacaoResponse>> ListarPorProcessoAsync(Guid processoId)
    {
        var movimentacoes =
            await _movimentacaoRepository.ListarPorProcessoAsync(processoId);

        return movimentacoes
            .Select(MapearParaResponse)
            .ToList();
    }

    public async Task<MovimentacaoResponse?> AdicionarAsync(
        Guid processoId,
        MovimentacaoRequest request)
    {
        var processo = await _processoRepository.BuscarPorIdAsync(processoId);

        if (processo is null)
            return null;

        var movimentacao = new MovimentacaoProcesso(
            request.DataMovimentacao,
            request.Descricao,
            processoId
        );

        await _movimentacaoRepository.AdicionarAsync(movimentacao);

        return MapearParaResponse(movimentacao);
    }

    private static MovimentacaoResponse MapearParaResponse(
        MovimentacaoProcesso movimentacao)
    {
        return new MovimentacaoResponse
        {
            Id = movimentacao.Id,
            DataMovimentacao = movimentacao.DataMovimentacao,
            Descricao = movimentacao.Descricao,
            ProcessoId = movimentacao.ProcessoId
        };
    }
}