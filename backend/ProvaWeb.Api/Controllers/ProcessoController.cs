using Microsoft.AspNetCore.Mvc;
using ProvaWeb.Application.DTO.Processos;
using ProvaWeb.Application.Servicos;
using ProvaWeb.Domain.Entidades;

namespace ProvaWeb.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProcessoController : ControllerBase
{
    private readonly ProcessoService _service;

    public ProcessoController(ProcessoService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> ListarProcessos()
    {
        var listaProcesso = await _service.ListarAsync();
        return Ok(listaProcesso);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> BuscaProcessoPorId(Guid id)
    {
        var buscarProcesso = await _service.BuscarPorIdAsync(id);

        if (buscarProcesso is null)
            return NotFound();

        return Ok(buscarProcesso);
    }

    [HttpPost]
    public async Task<IActionResult> InserirProcesso([FromBody] CriarProcessoRequest processo)
    {
        var novoProcesso = await _service.CriarAsync(processo);

        return CreatedAtAction(
            nameof(BuscaProcessoPorId),
            new { id = novoProcesso.Id },
            novoProcesso
        );
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> AtualizarProcesso(Guid id, [FromBody] AtualizarProcessoRequest processo)
    {
        var processoAtualizado = await _service.AtualizarAsync(id, processo);

        if (processoAtualizado is null)
            return NotFound();

        return Ok(processoAtualizado);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> ExcluirProcesso(Guid id)
    {
        var removido = await _service.RemoverAsync(id);

        if (!removido)
            return NotFound();

        return NoContent();
    }
}