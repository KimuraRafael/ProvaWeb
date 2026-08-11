using ProvaWeb.Domain.Entidades;
using ProvaWeb.Domain.Enums;

namespace ProvaWeb.Tests.Domain;

public class ProcessoTests
{
    [Fact]
    public void CriarProcesso_DeveCriarComStatusAtivo()
    {
        var processo = new Processo(
            "000123",
            "Cobrança contratual"
        );

        Assert.NotEqual(Guid.Empty, processo.Id);
        Assert.Equal("000123", processo.Numero);
        Assert.Equal(
            "Cobrança contratual",
            processo.Assunto
        );
        Assert.Equal(
            StatusProcesso.Ativo,
            processo.Status
        );
    }

    [Fact]
    public void Atualizar_DeveAlterarNumeroEAssunto()
    {
        var processo = new Processo(
            "000123",
            "Assunto inicial"
        );

        processo.Atualizar(
            "000456",
            "Assunto atualizado"
        );

        Assert.Equal("000456", processo.Numero);
        Assert.Equal(
            "Assunto atualizado",
            processo.Assunto
        );
    }

    [Fact]
    public void AlterarStatus_DeveAlterarStatusDoProcesso()
    {
        var processo = new Processo(
            "000123",
            "Cobrança contratual"
        );

        processo.AlterarStatus(
            StatusProcesso.Finalizado
        );

        Assert.Equal(
            StatusProcesso.Finalizado,
            processo.Status
        );
    }
}