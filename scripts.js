// ============================
// SISTEMA FAZENDA PROFISSIONAL
// ============================

const STORAGE_KEY = "FAZENDA_SISTEMA_PRO_V1";

function hojePadrao() {
  return new Date().toISOString().split("T")[0];
}

function moeda(v) {
  return Number(v || 0).toFixed(2);
}

// ============================
// BANCO LOCAL (localStorage)
// ============================
let DB = {
  caixaTravado: false,

  caixa: {
    data: hojePadrao(),
    caixaInicial: 0,
    retirada: 0,
    motivoRetirada: "",
    responsavelRetirada: ""
  },

  produtos: [
    { nome: "Sal", custo: 0.35, categoria: "Alimentos", estoque: 0, precoVenda: 0, vendidoQtd: 0, imagem: "" },
    { nome: "Açúcar", custo: 0.65, categoria: "Alimentos", estoque: 0, precoVenda: 0, vendidoQtd: 0, imagem: "" },
    { nome: "Óleo de Milho", custo: 1.75, categoria: "Alimentos", estoque: 0, precoVenda: 0, vendidoQtd: 0, imagem: "" },
    { nome: "Farinha de Milho", custo: 0.65, categoria: "Alimentos", estoque: 0, precoVenda: 0, vendidoQtd: 0, imagem: "" },
    { nome: "Fermento", custo: 0.85, categoria: "Alimentos", estoque: 0, precoVenda: 0, vendidoQtd: 0, imagem: "" },

    { nome: "Carne de Primeira", custo: 0.60, categoria: "Carnes", estoque: 0, precoVenda: 0, vendidoQtd: 0, imagem: "" },
    { nome: "Carne de Porco", custo: 0.60, categoria: "Carnes", estoque: 0, precoVenda: 0, vendidoQtd: 0, imagem: "" },
    { nome: "Carne de Ave", custo: 0.60, categoria: "Carnes", estoque: 0, precoVenda: 0, vendidoQtd: 0, imagem: "" },
    { nome: "Carne Fibrosa", custo: 0.60, categoria: "Carnes", estoque: 0, precoVenda: 0, vendidoQtd: 0, imagem: "" },

    { nome: "Ovos", custo: 0.15, categoria: "Alimentos", estoque: 0, precoVenda: 0, vendidoQtd: 0, imagem: "" },
    { nome: "Leite", custo: 0.50, categoria: "Alimentos", estoque: 0, precoVenda: 0, vendidoQtd: 0, imagem: "" },
    { nome: "Manteiga", custo: 1.00, categoria: "Alimentos", estoque: 0, precoVenda: 0, vendidoQtd: 0, imagem: "" },
    { nome: "Queijo", custo: 1.80, categoria: "Alimentos", estoque: 0, precoVenda: 0, vendidoQtd: 0, imagem: "" },

    { nome: "Polpas", custo: 0.75, categoria: "Alimentos", estoque: 0, precoVenda: 0, vendidoQtd: 0, imagem: "" },

    { nome: "Café Moído", custo: 0.80, categoria: "Alimentos", estoque: 0, precoVenda: 0, vendidoQtd: 0, imagem: "" },
    { nome: "Tabaco Moído", custo: 0.75, categoria: "Materiais", estoque: 0, precoVenda: 0, vendidoQtd: 0, imagem: "" },
    { nome: "Álcool", custo: 0.55, categoria: "Materiais", estoque: 0, precoVenda: 0, vendidoQtd: 0, imagem: "" },
    { nome: "Verniz", custo: 1.00, categoria: "Materiais", estoque: 0, precoVenda: 0, vendidoQtd: 0, imagem: "" },

    { nome: "Fertilizante", custo: 1.50, categoria: "Agricultura", estoque: 0, precoVenda: 0, vendidoQtd: 0, imagem: "" },
    { nome: "Fibra", custo: 0.10, categoria: "Agricultura", estoque: 0, precoVenda: 0, vendidoQtd: 0, imagem: "" },
    { nome: "Seiva", custo: 0.15, categoria: "Agricultura", estoque: 0, precoVenda: 0, vendidoQtd: 0, imagem: "" },
    { nome: "Cultivo em Geral", custo: 0.25, categoria: "Agricultura", estoque: 0, precoVenda: 0, vendidoQtd: 0, imagem: "" },

    { nome: "Lã", custo: 0.30, categoria: "Materiais", estoque: 0, precoVenda: 0, vendidoQtd: 0, imagem: "" },
    { nome: "Linha de Algodão", custo: 1.25, categoria: "Materiais", estoque: 0, precoVenda: 0, vendidoQtd: 0, imagem: "" },
    { nome: "Tábuas de madeira macia", custo: 0.30, categoria: "Materiais", estoque: 0, precoVenda: 0, vendidoQtd: 0, imagem: "" },
    { nome: "Tábuas de madeira dura", custo: 0.35, categoria: "Materiais", estoque: 0, precoVenda: 0, vendidoQtd: 0, imagem: "" },

    { nome: "Couro", custo: 0.25, categoria: "Materiais", estoque: 0, precoVenda: 0, vendidoQtd: 0, imagem: "" }
  ],

  historico: []
};

// ============================
// SALVAR / CARREGAR
// ============================
function salvarDB() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DB));
}

function carregarDB() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) DB = JSON.parse(saved);
}

// ============================
// ELEMENTOS HTML
// ============================
const pages = document.querySelectorAll(".page");
const menuBtns = document.querySelectorAll(".menu-btn");

const dataDia = document.getElementById("dataDia");
const caixaInicial = document.getElementById("caixaInicial");
const retirada = document.getElementById("retirada");
const motivoRetirada = document.getElementById("motivoRetirada");
const responsavelRetirada = document.getElementById("responsavelRetirada");

const totalVendidoSpan = document.getElementById("totalVendido");
const custoTotalSpan = document.getElementById("custoTotal");
const lucroTotalSpan = document.getElementById("lucroTotal");
const retiradaValorSpan = document.getElementById("retiradaValor");
const saldoFinalSpan = document.getElementById("saldoFinal");

const pesquisaProduto = document.getElementById("pesquisaProduto");
const filtroCategoria = document.getElementById("filtroCategoria");
const tabelaVendas = document.getElementById("tabelaVendas");

const pesquisaEstoque = document.getElementById("pesquisaEstoque");
const tabelaEstoque = document.getElementById("tabelaEstoque");

const novoCategoria = document.getElementById("novoCategoria");
const novoNome = document.getElementById("novoNome");
const novoCusto = document.getElementById("novoCusto");
const novoEstoque = document.getElementById("novoEstoque");
const novoImagem = document.getElementById("novoImagem");
const btnCriarProduto = document.getElementById("btnCriarProduto");

const btnFecharCaixa = document.getElementById("btnFecharCaixa");
const btnReabrirCaixa = document.getElementById("btnReabrirCaixa");
const btnLimparDia = document.getElementById("btnLimparDia");

const historicoLista = document.getElementById("historicoLista");
const btnExportarHistoricoCSV = document.getElementById("btnExportarHistoricoCSV");
const btnLimparHistorico = document.getElementById("btnLimparHistorico");

const btnExportarVendasCSV = document.getElementById("btnExportarVendasCSV");

const pesquisaCatalogo = document.getElementById("pesquisaCatalogo");
const catalogoProdutos = document.getElementById("catalogoProdutos");

const totalSemana = document.getElementById("totalSemana");
const lucroSemana = document.getElementById("lucroSemana");
const totalMes = document.getElementById("totalMes");
const lucroMes = document.getElementById("lucroMes");

// ============================
// NAVEGAÇÃO
// ============================
function abrirPagina(nome) {
  pages.forEach(p => p.classList.add("hidden"));
  document.getElementById("page-" + nome).classList.remove("hidden");

  menuBtns.forEach(btn => btn.classList.remove("active"));
  document.querySelector(`.menu-btn[data-page="${nome}"]`).classList.add("active");
}

menuBtns.forEach(btn => {
  btn.addEventListener("click", () => abrirPagina(btn.dataset.page));
});

// ============================
// CATEGORIAS
// ============================
function atualizarFiltroCategorias() {
  const cats = [...new Set(DB.produtos.map(p => p.categoria))];

  filtroCategoria.innerHTML = `<option value="todos">Todas Categorias</option>`;
  cats.forEach(cat => {
    filtroCategoria.innerHTML += `<option value="${cat}">${cat}</option>`;
  });
}

// ============================
// CALCULAR TOTAIS
// ============================
function calcularResumo() {
  let totalVendido = 0;
  let custoTotal = 0;
  let lucroTotal = 0;

  DB.produtos.forEach(p => {
    const total = (p.precoVenda || 0) * (p.vendidoQtd || 0);
    const custo = (p.custo || 0) * (p.vendidoQtd || 0);

    totalVendido += total;
    custoTotal += custo;
    lucroTotal += (total - custo);
  });

  const cx = parseFloat(DB.caixa.caixaInicial) || 0;
  const ret = parseFloat(DB.caixa.retirada) || 0;
  const saldoFinal = (cx + totalVendido) - ret;

  totalVendidoSpan.innerText = moeda(totalVendido);
  custoTotalSpan.innerText = moeda(custoTotal);
  lucroTotalSpan.innerText = moeda(lucroTotal);
  retiradaValorSpan.innerText = moeda(ret);
  saldoFinalSpan.innerText = moeda(saldoFinal);

  salvarDB();
  atualizarRelatorios();
}

// ============================
// TABELA VENDAS
// ============================
function renderTabelaVendas() {
  tabelaVendas.innerHTML = "";

  const pesquisa = (pesquisaProduto.value || "").toLowerCase();
  const categoria = filtroCategoria.value;

  DB.produtos.forEach((p, i) => {
    if (pesquisa && !p.nome.toLowerCase().includes(pesquisa)) return;
    if (categoria !== "todos" && p.categoria !== categoria) return;

    const total = (p.precoVenda || 0) * (p.vendidoQtd || 0);
    const custo = (p.custo || 0) * (p.vendidoQtd || 0);
    const lucro = total - custo;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.nome}</td>
      <td>${p.categoria}</td>
      <td>R$ ${moeda(p.custo)}</td>
      <td><input type="number" step="0.01" value="${p.precoVenda}" ${DB.caixaTravado ? "disabled" : ""} data-index="${i}" class="inputPreco"></td>
      <td><input type="number" step="1" value="${p.vendidoQtd}" ${DB.caixaTravado ? "disabled" : ""} data-index="${i}" class="inputQtd"></td>
      <td>R$ ${moeda(total)}</td>
      <td>R$ ${moeda(custo)}</td>
      <td>R$ ${moeda(lucro)}</td>
      <td><b>${p.estoque}</b></td>
    `;

    tabelaVendas.appendChild(tr);
  });

  document.querySelectorAll(".inputPreco").forEach(inp => {
    inp.addEventListener("input", (e) => {
      const index = e.target.dataset.index;
      DB.produtos[index].precoVenda = parseFloat(e.target.value) || 0;
      salvarDB();
      renderTabelaVendas();
      calcularResumo();
    });
  });

  document.querySelectorAll(".inputQtd").forEach(inp => {
    inp.addEventListener("input", (e) => {
      const index = e.target.dataset.index;
      DB.produtos[index].vendidoQtd = parseFloat(e.target.value) || 0;
      salvarDB();
      renderTabelaVendas();
      calcularResumo();
    });
  });

  calcularResumo();
}

// ============================
// ESTOQUE
// ============================
function renderTabelaEstoque() {
  tabelaEstoque.innerHTML = "";

  const pesquisa = (pesquisaEstoque.value || "").toLowerCase();

  DB.produtos.forEach((p, i) => {
    if (pesquisa && !p.nome.toLowerCase().includes(pesquisa)) return;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.nome}</td>
      <td>${p.categoria}</td>
      <td>R$ ${moeda(p.custo)}</td>
      <td><b>${p.estoque}</b></td>
      <td><input type="number" min="0" value="0" data-index="${i}" class="entradaEstoque"></td>
      <td><button class="btn green btnSalvarEntrada" data-index="${i}">Salvar</button></td>
    `;
    tabelaEstoque.appendChild(tr);
  });

  document.querySelectorAll(".btnSalvarEntrada").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      const input = document.querySelector(`.entradaEstoque[data-index="${index}"]`);
      const entrada = parseFloat(input.value) || 0;

      if (entrada <= 0) return;

      DB.produtos[index].estoque += entrada;
      salvarDB();
      renderTabelaEstoque();
      renderCatalogo();
    });
  });
}

// ============================
// CATÁLOGO
// ============================
function renderCatalogo() {
  catalogoProdutos.innerHTML = "";

  const pesquisa = (pesquisaCatalogo.value || "").toLowerCase();

  DB.produtos.forEach(p => {
    if (pesquisa && !p.nome.toLowerCase().includes(pesquisa)) return;

    const card = document.createElement("div");
    card.className = "cardProduto";

    const img = p.imagem && p.imagem.trim() !== ""
      ? p.imagem
      : "https://via.placeholder.com/300x140?text=Produto";

    card.innerHTML = `
      <img src="${img}" alt="${p.nome}">
      <div class="info">
        <h3>${p.nome}</h3>
        <p><b>Categoria:</b> ${p.categoria}</p>
        <p><b>Custo:</b> R$ ${moeda(p.custo)}</p>
        <p><b>Estoque:</b> ${p.estoque}</p>
      </div>
    `;

    catalogoProdutos.appendChild(card);
  });
}

// ============================
// HISTÓRICO
// ============================
function renderHistorico() {
  historicoLista.innerHTML = "";

  if (DB.historico.length === 0) {
    historicoLista.innerHTML = `<p style="color:#94a3b8;">Nenhum caixa fechado ainda.</p>`;
    return;
  }

  DB.historico.slice().reverse().forEach(dia => {
    const div = document.createElement("div");
    div.className = "hist-item";

    div.innerHTML = `
      <h3>📅 ${dia.data}</h3>
      <p><b>Total Vendido:</b> R$ ${moeda(dia.totalVendido)}</p>
      <p><b>Lucro:</b> R$ ${moeda(dia.lucroTotal)}</p>
      <p><b>Retirada:</b> R$ ${moeda(dia.retirada)}</p>
      <p><b>Motivo:</b> ${dia.motivoRetirada || "Nenhum"}</p>
      <p><b>Responsável:</b> ${dia.responsavelRetirada || "Nenhum"}</p>
      <p><b>Saldo Final:</b> R$ ${moeda(dia.saldoFinal)}</p>
      <hr style="margin:10px 0;border:0;border-top:1px solid #1e293b;">
      <p><b>Produtos Vendidos:</b></p>
      <p style="color:#94a3b8;">${dia.produtosResumo}</p>
    `;

    historicoLista.appendChild(div);
  });
}

// ============================
// RELATÓRIOS
// ============================
function atualizarRelatorios() {
  const hoje = new Date();

  const inicioSemana = new Date(hoje);
  inicioSemana.setDate(hoje.getDate() - hoje.getDay());

  const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);

  let totalSem = 0;
  let lucroSem = 0;
  let totalM = 0;
  let lucroM = 0;

  DB.historico.forEach(d => {
    const dt = new Date(d.data);

    if (dt >= inicioSemana) {
      totalSem += d.totalVendido;
      lucroSem += d.lucroTotal;
    }

    if (dt >= inicioMes) {
      totalM += d.totalVendido;
      lucroM += d.lucroTotal;
    }
  });

  totalSemana.innerText = moeda(totalSem);
  lucroSemana.innerText = moeda(lucroSem);
  totalMes.innerText = moeda(totalM);
  lucroMes.innerText = moeda(lucroM);
}

// ============================
// EXPORTAR CSV
// ============================
function exportarCSV(nomeArquivo, linhas) {
  const csv = linhas.join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = nomeArquivo;
  link.click();
}

// ============================
// EVENTOS
// ============================
pesquisaProduto.addEventListener("input", renderTabelaVendas);
filtroCategoria.addEventListener("change", renderTabelaVendas);
pesquisaEstoque.addEventListener("input", renderTabelaEstoque);
pesquisaCatalogo.addEventListener("input", renderCatalogo);

// Caixa Inputs
dataDia.addEventListener("input", () => {
  DB.caixa.data = dataDia.value;
  salvarDB();
});

caixaInicial.addEventListener("input", () => {
  DB.caixa.caixaInicial = parseFloat(caixaInicial.value) || 0;
  salvarDB();
  calcularResumo();
});

retirada.addEventListener("input", () => {
  DB.caixa.retirada = parseFloat(retirada.value) || 0;
  salvarDB();
  calcularResumo();
});

motivoRetirada.addEventListener("input", () => {
  DB.caixa.motivoRetirada = motivoRetirada.value;
  salvarDB();
});

responsavelRetirada.addEventListener("input", () => {
  DB.caixa.responsavelRetirada = responsavelRetirada.value;
  salvarDB();
});

// Criar Produto
btnCriarProduto.addEventListener("click", () => {
  const nome = novoNome.value.trim();
  const categoria = novoCategoria.value.trim();
  const custo = parseFloat(novoCusto.value) || 0;
  const estoque = parseFloat(novoEstoque.value) || 0;
  const imagem = novoImagem.value.trim();

  if (!nome || !categoria) {
    alert("Preencha Nome e Categoria.");
    return;
  }

  DB.produtos.push({
    nome,
    categoria,
    custo,
    estoque,
    precoVenda: 0,
    vendidoQtd: 0,
    imagem
  });

  novoNome.value = "";
  novoCategoria.value = "";
  novoCusto.value = 0;
  novoEstoque.value = 0;
  novoImagem.value = "";

  salvarDB();
  atualizarFiltroCategorias();
  renderTabelaVendas();
  renderTabelaEstoque();
  renderCatalogo();
});

// Fechar Caixa
btnFecharCaixa.addEventListener("click", () => {
  if (DB.caixaTravado) {
    alert("Caixa já está fechado.");
    return;
  }

  if (DB.caixa.retirada > 0 && DB.caixa.motivoRetirada.trim() === "") {
    alert("Motivo da retirada obrigatório!");
    return;
  }

  if (DB.caixa.retirada > 0 && DB.caixa.responsavelRetirada.trim() === "") {
    alert("Responsável obrigatório!");
    return;
  }

  // resumo de produtos vendidos
  let resumoProdutos = [];

  DB.produtos.forEach(p => {
    if (p.vendidoQtd > 0) {
      resumoProdutos.push(`${p.nome} x${p.vendidoQtd} (R$ ${moeda(p.precoVenda)})`);
      p.estoque -= p.vendidoQtd;
      if (p.estoque < 0) p.estoque = 0;
    }
  });

  const totalVendido = parseFloat(totalVendidoSpan.innerText) || 0;
  const lucroTotal = parseFloat(lucroTotalSpan.innerText) || 0;
  const saldoFinal = parseFloat(saldoFinalSpan.innerText) || 0;

  DB.historico.push({
    data: DB.caixa.data,
    totalVendido,
    lucroTotal,
    retirada: DB.caixa.retirada,
    motivoRetirada: DB.caixa.motivoRetirada,
    responsavelRetirada: DB.caixa.responsavelRetirada,
    saldoFinal,
    produtosResumo: resumoProdutos.length > 0 ? resumoProdutos.join(" | ") : "Nenhuma venda registrada"
  });

  // limpa vendas
  DB.produtos.forEach(p => p.vendidoQtd = 0);

  DB.caixaTravado = true;
  salvarDB();

  renderTabelaVendas();
  renderTabelaEstoque();
  renderHistorico();
  atualizarRelatorios();
  renderCatalogo();

  alert("Caixa fechado com sucesso!");
});

// Reabrir Caixa
btnReabrirCaixa.addEventListener("click", () => {
  DB.caixaTravado = false;
  salvarDB();
  renderTabelaVendas();
  alert("Caixa reaberto.");
});

// Limpar Dia
btnLimparDia.addEventListener("click", () => {
  if (!confirm("Deseja limpar as vendas do dia?")) return;

  DB.produtos.forEach(p => {
    p.vendidoQtd = 0;
    p.precoVenda = 0;
  });

  DB.caixa.retirada = 0;
  DB.caixa.motivoRetirada = "";
  DB.caixa.responsavelRetirada = "";

  DB.caixaTravado = false;
  salvarDB();

  retirada.value = 0;
  motivoRetirada.value = "";
  responsavelRetirada.value = "";

  renderTabelaVendas();
  calcularResumo();

  alert("Dia limpo!");
});

// Exportar Vendas CSV
btnExportarVendasCSV.addEventListener("click", () => {
  let linhas = ["Produto,Categoria,Quantidade,PreçoVenda,CustoUnitario,Total,Lucro"];

  DB.produtos.forEach(p => {
    const total = p.vendidoQtd * p.precoVenda;
    const lucro = total - (p.vendidoQtd * p.custo);

    linhas.push(`${p.nome},${p.categoria},${p.vendidoQtd},${p.precoVenda},${p.custo},${total},${lucro}`);
  });

  exportarCSV("vendas_dia.csv", linhas);
});

// Exportar Histórico CSV
btnExportarHistoricoCSV.addEventListener("click", () => {
  let linhas = ["Data,TotalVendido,LucroTotal,Retirada,Motivo,Responsavel,SaldoFinal,Produtos"];

  DB.historico.forEach(h => {
    linhas.push(`${h.data},${h.totalVendido},${h.lucroTotal},${h.retirada},${h.motivoRetirada},${h.responsavelRetirada},${h.saldoFinal},"${h.produtosResumo}"`);
  });

  exportarCSV("historico_fazenda.csv", linhas);
});

// Apagar Histórico
btnLimparHistorico.addEventListener("click", () => {
  if (!confirm("Tem certeza que deseja apagar TODO o histórico?")) return;

  DB.historico = [];
  salvarDB();
  renderHistorico();
  atualizarRelatorios();
});

// ============================
// INICIALIZAÇÃO
// ============================
function iniciar() {
  carregarDB();

  // Atualiza inputs do caixa
  dataDia.value = DB.caixa.data || hojePadrao();
  caixaInicial.value = DB.caixa.caixaInicial || 0;
  retirada.value = DB.caixa.retirada || 0;
  motivoRetirada.value = DB.caixa.motivoRetirada || "";
  responsavelRetirada.value = DB.caixa.responsavelRetirada || "";

  atualizarFiltroCategorias();
  renderTabelaVendas();
  renderTabelaEstoque();
  renderCatalogo();
  renderHistorico();
  atualizarRelatorios();
  calcularResumo();

  abrirPagina("dashboard");
}

iniciar();
