using Microsoft.AspNetCore.Mvc;
using ProvaWeb.Application.DTO.MovimentacaoProcesso;
using ProvaWeb.Application.Servicos;

namespace ProvaWeb.Api.Controllers;

[ApiController]
[Route("api/processo/{processoId:guid}/movimentacoes")]
public class MovimentacaoController : ControllerBase
{
    private readonly MovimentacaoService _service;

    public MovimentacaoController(MovimentacaoService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> ListarMovimentacoes(Guid processoId)
    {
        var movimentacoes =
            await _service.ListarPorProcessoAsync(processoId);

        return Ok(movimentacoes);
    }

    [HttpPost]
    public async Task<IActionResult> AdicionarMovimentacao(
        Guid processoId,
        [FromBody] MovimentacaoRequest request)
    {
        var movimentacao =
            await _service.AdicionarAsync(processoId, request);

        if (movimentacao is null)
            return NotFound();

        return Created(
            $"/api/processo/{processoId}/movimentacoes/{movimentacao.Id}",
            movimentacao
        );
    }
}