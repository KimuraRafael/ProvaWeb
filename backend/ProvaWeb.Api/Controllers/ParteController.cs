using Microsoft.AspNetCore.Mvc;
using ProvaWeb.Application.DTO.Parte;
using ProvaWeb.Application.Servicos;

namespace ProvaWeb.Api.Controllers;

[ApiController]
[Route("api/processo/{processoId:guid}/parte")]
public class ParteController : ControllerBase
{
    private readonly ParteService _service;

    public ParteController(ParteService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> ListarPartes(Guid processoId)
    {
        var partes = await _service.ListarPorProcessoAsync(processoId);
        return Ok(partes);
    }

    [HttpPost]
    public async Task<IActionResult> AdicionarParte(
        Guid processoId,
        [FromBody] CriarParteRequest request)
    {
        var parte = await _service.AdicionarAsync(processoId, request);

        if (parte is null)
            return NotFound();

        return Created(
            $"/api/processo/{processoId}/partes/{parte.Id}",
            parte
        );
    }

    [HttpDelete("{parteId:guid}")]
    public async Task<IActionResult> RemoverParte(
        Guid processoId,
        Guid parteId)
    {
        var removida = await _service.RemoverAsync(processoId, parteId);

        if (!removida)
            return NotFound();

        return NoContent();
    }
}