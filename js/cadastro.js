/* cadastro.js – máscaras, validação e gravação do cadastro (localStorage) */
"use strict";
const form = document.getElementById("form-cadastro");
const cpf = document.getElementById("cpf");
const tel = document.getElementById("telefone");
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// Máscara de CPF e telefone enquanto o usuário digita
cpf.addEventListener("input", () => { cpf.value = mascaraCPF(cpf.value); });
tel.addEventListener("input", () => {
  let v = tel.value.replace(/\D/g, "").slice(0, 11);
  v = v.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d{1,4})$/, "$1-$2");
  tel.value = v;
});

// Valida regras que o HTML sozinho não cobre (CPF, idade mínima, telefone)
function validarExtras() {
  cpf.setCustomValidity(cpfValido(cpf.value) ? "" : "CPF inválido");
  const nasc = document.getElementById("nascimento");
  const idade = (new Date() - new Date(nasc.value)) / (365.25 * 24 * 3600 * 1000);
  nasc.setCustomValidity(nasc.value && idade >= 18 && idade < 120 ? "" : "Data inválida");
  tel.setCustomValidity(tel.value.replace(/\D/g, "").length >= 10 ? "" : "Telefone inválido");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validarExtras();
  form.classList.add("was-validated"); // Bootstrap exibe os erros
  if (!form.checkValidity()) { form.querySelector(":invalid").focus(); return; }

  const f = new FormData(form);
  const cliente = {
    nome: f.get("nome"), cpf: f.get("cpf"), nascimento: f.get("nascimento"), sexo: f.get("sexo"),
    telefone: f.get("telefone"), email: f.get("email"),
    endereco: `${f.get("endereco")}, ${f.get("bairro")}, ${f.get("cidade")}/${f.get("uf")}`,
    pet: { nome: f.get("pet-nome"), especie: f.get("pet-especie"), raca: f.get("pet-raca"),
           idade: f.get("pet-idade"), peso: f.get("pet-peso"), porte: f.get("porte"),
           cuidados: f.getAll("cuidados"), obs: f.get("obs") }
  };
  try {
    const base = JSON.parse(localStorage.getItem("clientes") || "{}");
    base[cliente.cpf] = cliente; // CPF é a chave: evita duplicidade
    localStorage.setItem("clientes", JSON.stringify(base));
  } catch (err) { alert("Não foi possível salvar os dados neste navegador."); return; }

  const msg = document.getElementById("msg-cadastro");
  msg.innerHTML = `Cadastro de <strong>${esc(cliente.nome)}</strong> e do pet <strong>${esc(cliente.pet.nome)}</strong> salvo! <a href="agendamento.html">Agendar um serviço</a>.`;
  msg.classList.remove("d-none"); msg.focus();
  form.reset(); form.classList.remove("was-validated");
});
