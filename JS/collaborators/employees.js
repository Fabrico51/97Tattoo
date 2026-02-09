const nomeInput = document.getElementById("nomeEmploye");
const sobrenomeInput = document.getElementById("sobrenomeEmploye");
const idadeInput = document.getElementById("idadeEmploye");
const setorInput = document.getElementById("setor");
const cargoInput = document.getElementById("cargo");

const btnNovo = document.getElementById("btnNovo");
const modalEmploye = document.getElementById("modalEmploye");
const fechar = document.getElementById("fechar");
const form = document.getElementById("formFuncionario");

/* 🔽 IMAGEM PADRÃO (MUDE AQUI) */
const imagemPadrao = "../../img/inkito.png";

btnNovo.onclick = () => modalEmploye.style.display = "flex";
fechar.onclick = () => modalEmploye.style.display = "none";

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = nomeInput.value;
  const sobrenome = sobrenomeInput.value;
  const idade = idadeInput.value;
  const setor = setorInput.value;
  const cargo = cargoInput.value;
  const imagemInput = document.getElementById("imagem");

  let imagemFinal = imagemPadrao;

  if (imagemInput.files[0]) {
    imagemFinal = URL.createObjectURL(imagemInput.files[0]);
  }

  const card = document.createElement("div");
  card.classList.add("cardEmploye");

  card.innerHTML = `
    <img src="${imagemFinal}">
    <div class="info">
      <h3>${nome} ${sobrenome}</h3>
      <p>Idade: <span>${idade}</span></p>
      <p>Cargo: <span>${cargo}</span></p>

      <div class="acoes">
        <button class="editar">Editar</button>
        <button class="foto">Trocar foto</button>
        <button class="excluir">Excluir</button>
        <input type="file" accept="image/*" style="display:none">
      </div>
    </div>
  `;

  // ➜ Enviar para o setor correto
  const setorDiv = document.querySelector(
    `.setor[data-setor="${setor}"] .cardsEmploye`
  );
  setorDiv.appendChild(card);

  // 🗑️ EXCLUIR
  card.querySelector(".excluir").onclick = () => {
    card.remove();
  };

  // ✏️ EDITAR
  card.querySelector(".editar").onclick = () => {
    const novoCargo = prompt("Novo cargo:", cargo);
    const novaIdade = prompt("Nova idade:", idade);

    if (novoCargo) card.querySelector("p:nth-child(3) span").innerText = novoCargo;
    if (novaIdade) card.querySelector("p:nth-child(2) span").innerText = novaIdade;
  };

  // 🖼️ TROCAR FOTO
  const btnFoto = card.querySelector(".foto");
  const inputFoto = card.querySelector("input[type=file]");
  const img = card.querySelector("img");

  btnFoto.onclick = () => inputFoto.click();
  inputFoto.onchange = () => {
    if (inputFoto.files[0]) {
      img.src = URL.createObjectURL(inputFoto.files[0]);
    }
  };

  form.reset();
  modalEmploye.style.display = "none";
});