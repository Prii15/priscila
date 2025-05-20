let personagens = [];
let turno = 0;
let temaAtual = "medieval";

function adicionar() {
    const nome = document.getElementById('nome').value.trim();
    const valor = parseInt(document.getElementById('valor').value);
    if (!nome || isNaN(valor)) return;

    personagens.push({ nome, valor });
    personagens.sort((a, b) => b.valor - a.valor);
    turno = 0;
    atualizarLista();

    document.getElementById('nome').value = '';
    document.getElementById('valor').value = '';
}

function atualizarLista() {
  const lista = document.getElementById('lista');
  lista.innerHTML = '';
  personagens.forEach((p, i) => {
      const icone = temaAtual === "medieval" ? "🗡️" : "❌";
      const li = document.createElement('li');
      li.innerHTML = `<span>${p.nome} (${p.valor})</span>
                      <button class="remove-btn" onclick="remover(${i})">${icone}</button>`;
      if (i === turno) li.classList.add('active');
      lista.appendChild(li);
  });
}

function proxima() {
  if (personagens.length === 0) return;
  turno = (turno + 1) % personagens.length;
  atualizarLista();
}

function remover(index) {
  personagens.splice(index, 1);
  if (turno >= personagens.length) turno = 0;
  atualizarLista();
}

function trocarTema() {
  const body = document.body;
  if (temaAtual === "medieval") {
      body.classList.remove("tema-medieval");
      body.classList.add("tema-investigacao");
      document.getElementById("titulo").innerText = "🔍 Ordem de Iniciativa";
      temaAtual = "investigacao";
  } else {
      body.classList.remove("tema-investigacao");
      body.classList.add("tema-medieval");
      document.getElementById("titulo").innerText = "📜 Ordem de Iniciativa";
      temaAtual = "medieval";
  }
  atualizarLista(); // Atualiza ícones
}