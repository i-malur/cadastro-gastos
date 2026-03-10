const metodoInput = document.getElementById("metodoInput");
const parcelasDiv = document.querySelector(".parcelas");
const valorInput = document.getElementById("valorCompra");
const parcelasInput = document.getElementById("parcelas");
const valorParcelaInput = document.getElementById("valorParcela");
const categoriaInput = document.getElementById("categoriaInput");
const fixoInput = document.getElementById("fixoGasto");
const dataInput = document.querySelector("input[type='date']");
const enviarBtn = document.querySelector(".enviar");
const mensagemStatus = document.getElementById("mensagemStatus");
const datalistInputs = document.querySelectorAll("input[list]");

if (parcelasDiv) {
  parcelasDiv.style.display = "none";
}

if (metodoInput) {
  metodoInput.addEventListener("input", () => {
    const metodo = metodoInput.value;

    if (metodo === "creditoNubank" || metodo === "creditoBB") {
      parcelasDiv.style.display = "block";
    } else {
      parcelasDiv.style.display = "none";
      if (parcelasInput) parcelasInput.value = "";
      if (valorParcelaInput) valorParcelaInput.value = "";
    }
  });
}

function atualizarValorParcela() {
  const total = parseFloat(valorInput?.value);
  const qtdParcelas = parseInt(parcelasInput?.value);

  if (!isNaN(total) && !isNaN(qtdParcelas) && qtdParcelas > 0) {
    valorParcelaInput.value = (total / qtdParcelas).toFixed(2);
  } else {
    valorParcelaInput.value = "";
  }
}

if (valorInput) valorInput.addEventListener("input", atualizarValorParcela);
if (parcelasInput) parcelasInput.addEventListener("input", atualizarValorParcela);

if (enviarBtn) {
  enviarBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const data = dataInput?.value.trim();
    const valor = valorInput?.value.trim();
    const categoria = categoriaInput?.value.trim();
    const metodo = metodoInput?.value.trim();
    const fixo = fixoInput?.value.trim();
    const parcelas = parcelasInput?.value.trim();
    const valorParcela = valorParcelaInput?.value.trim();

    if (!data || !valor || !categoria || !metodo || !fixo) {
      mostrarMensagem("Preencha todos os campos obrigatórios.", "erro");
      return;
    }

    if (
      (metodo === "creditoNubank" || metodo === "creditoBB") &&
      (!parcelas || !valorParcela)
    ) {
      mostrarMensagem("Preencha as parcelas para pagamento no crédito.", "erro");
      return;
    }

    fetch("/api/gastos", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        data,
        valor,
        categoria,
        metodo,
        parcelas: parcelas || "",
        valorParcela: valorParcela || "",
        fixo
      })
    })
      .then(res => res.json())
      .then(() => {
        mostrarMensagem("Gasto registrado com sucesso!", "sucesso");
        limparCampos();
      })
      .catch((error) => {
        console.error(error);
        mostrarMensagem("Erro de conexão.", "erro");
      });
  });
}

function limparCampos() {
  if (metodoInput) metodoInput.value = "";
  if (parcelasDiv) parcelasDiv.style.display = "none";
  if (valorInput) valorInput.value = "";
  if (parcelasInput) parcelasInput.value = "";
  if (valorParcelaInput) valorParcelaInput.value = "";
  if (categoriaInput) categoriaInput.value = "";
  if (fixoInput) fixoInput.value = "";
  if (dataInput) dataInput.value = "";
}

function mostrarMensagem(texto, tipo) {
  if (!mensagemStatus) return;

  mensagemStatus.textContent = texto;
  mensagemStatus.className = "mensagem-status " + tipo;
  mensagemStatus.style.display = "block";

  setTimeout(() => {
    mensagemStatus.style.display = "none";
  }, 4000);
}

datalistInputs.forEach(input => {
  input.addEventListener("focus", () => input.select());
  input.addEventListener("click", () => input.select());
});

// buscar gastos (teste)
fetch("/api/gastos")
  .then(res => res.json())
  .then(data => {
    console.log("Gastos:", data);
  });