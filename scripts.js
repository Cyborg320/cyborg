const produtos = [
    { nome: "Sal", custo: 0.35 },
    { nome: "Açúcar", custo: 0.65 },
    { nome: "Óleo de Milho", custo: 1.75 },
    { nome: "Farinha de Milho", custo: 0.65 },
    { nome: "Fermento", custo: 0.85 },

    { nome: "Carne de Primeira", custo: 0.60 },
    { nome: "Carne de Porco", custo: 0.60 },
    { nome: "Carne de Ave", custo: 0.60 },
    { nome: "Carne Fibrosa", custo: 0.60 },

    { nome: "Ovos", custo: 0.15 },
    { nome: "Leite", custo: 0.50 },
    { nome: "Manteiga", custo: 1.00 },
    { nome: "Queijo", custo: 1.80 },

    { nome: "Polpas", custo: 0.75 },

    { nome: "Café Moído", custo: 0.80 },
    { nome: "Tabaco Moído", custo: 0.75 },
    { nome: "Álcool", custo: 0.55 },
    { nome: "Verniz", custo: 1.00 },

    { nome: "Fertilizante", custo: 1.50 },
    { nome: "Fibra", custo: 0.10 },
    { nome: "Seiva", custo: 0.15 },
    { nome: "Cultivo em Geral", custo: 0.25 },

    { nome: "Lã", custo: 0.30 },
    { nome: "Linha de Algodão", custo: 1.25 },
    { nome: "Tábuas de madeira macia", custo: 0.30 },
    { nome: "Tábuas de madeira dura", custo: 0.35 },

    { nome: "Couro", custo: 0.25 }
];

const tabela = document.getElementById("tabelaProdutos");

function criarTabela() {
    produtos.forEach((p, index) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${p.nome}</td>
            <td>${p.custo.toFixed(2)}</td>
            <td>
                <input type="number" step="0.01" class="precoVenda" data-index="${index}" value="0">
            </td>
            <td>
                <input type="number" step="1" class="quantidade" data-index="${index}" value="0">
            </td>
            <td>
                <span id="totalVendidoProduto-${index}">0.00</span>
            </td>
            <td>
                <span id="custoTotalProduto-${index}">0.00</span>
            </td>
            <td>
                <span id="lucroProduto-${index}">0.00</span>
            </td>
        `;

        tabela.appendChild(linha);
    });
}

function atualizarCalculos() {
    let totalVendido = 0;
    let custoTotal = 0;
    let lucroTotal = 0;

    produtos.forEach((p, index) => {
        const precoVendaInput = document.querySelector(`.precoVenda[data-index="${index}"]`);
        const quantidadeInput = document.querySelector(`.quantidade[data-index="${index}"]`);

        const precoVenda = parseFloat(precoVendaInput.value) || 0;
        const quantidade = parseFloat(quantidadeInput.value) || 0;

        const vendidoProduto = precoVenda * quantidade;
        const custoProduto = p.custo * quantidade;
        const lucroProduto = vendidoProduto - custoProduto;

        document.getElementById(`totalVendidoProduto-${index}`).innerText = vendidoProduto.toFixed(2);
        document.getElementById(`custoTotalProduto-${index}`).innerText = custoProduto.toFixed(2);
        document.getElementById(`lucroProduto-${index}`).innerText = lucroProduto.toFixed(2);

        totalVendido += vendidoProduto;
        custoTotal += custoProduto;
        lucroTotal += lucroProduto;
    });

    const retirada = parseFloat(document.getElementById("retirada").value) || 0;
    const caixaInicial = parseFloat(document.getElementById("caixaInicial").value) || 0;

    const saldoFinal = (caixaInicial + totalVendido) - retirada;

    document.getElementById("totalVendido").innerText = totalVendido.toFixed(2);
    document.getElementById("custoTotal").innerText = custoTotal.toFixed(2);
    document.getElementById("lucroTotal").innerText = lucroTotal.toFixed(2);
    document.getElementById("retiradaValor").innerText = retirada.toFixed(2);
    document.getElementById("saldoFinal").innerText = saldoFinal.toFixed(2);
}

document.addEventListener("input", atualizarCalculos);

criarTabela();
atualizarCalculos();