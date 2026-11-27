/* agendamento.js – calendário, horários disponíveis e gravação do agendamento */
"use strict";
const form = document.getElementById("form-agenda");
const data = document.getElementById("data");
const hora = document.getElementById("hora");
const cpf = document.getElementById("ag-cpf");
const endereco = document.getElementById("ag-endereco");

// Data local no formato AAAA-MM-DD
const local = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
const hoje = new Date();
data.min = local(hoje);                                   // sem datas passadas
data.max = local(new Date(hoje.getTime() + 60 * 864e5));  // até 60 dias à frente

cpf.addEventListener("input", () => { cpf.value = mascaraCPF(cpf.value); });

// Mostra o campo de endereço apenas na tele-busca
document.querySelectorAll('input[name="metodo"]').forEach((r) =>
  r.addEventListener("change", () => {
    const tele = document.getElementById("m-tele").checked;
    document.getElementById("bloco-endereco").classList.toggle("d-none", !tele);
    endereco.required = tele;
  }));

const lerAgenda = () => JSON.parse(localStorage.getItem("agenda") || "[]");

// Gera os horários livres do dia escolhido (seg-sex 8–17h, sáb 8–12h; 1 por hora)
function carregarHorarios() {
  hora.innerHTML = "";
  if (!data.value) { hora.add(new Option("Escolha primeiro a data", "")); return; }
  const [a, m, d] = data.value.split("-").map(Number);
  const dia = new Date(a, m - 1, d).getDay();
  if (dia === 0) {
    data.setCustomValidity("Domingo indisponível");
    document.getElementById("data-erro").textContent = "Não atendemos aos domingos. Escolha outra data.";
    hora.add(new Option("Escolha uma data válida", ""));
    return;
  }
  data.setCustomValidity("");
  const ultima = dia === 6 ? 12 : 17;
  const ocupados = lerAgenda().filter((x) => x.data === data.value).map((x) => x.hora);
  const agora = new Date();
  const ehHoje = data.value === local(agora);
  hora.add(new Option("Selecione…", ""));
  for (let h = 8; h <= ultima; h++) {
    const hh = String(h).padStart(2, "0") + ":00";
    if (!ocupados.includes(hh) && !(ehHoje && h <= agora.getHours())) hora.add(new Option(hh, hh));
  }
  if (hora.options.length === 1) hora.options[0].text = "Sem horários livres neste dia";
}
data.addEventListener("change", carregarHorarios);

// Lista de agendamentos salvos
function mostrarLista() {
  const ul = document.getElementById("lista-agendamentos");
  const lista = lerAgenda();
  ul.innerHTML = lista.length ? "" : "<li class='list-group-item'>Nenhum agendamento ainda.</li>";
  lista.forEach((x) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${x.data.split("-").reverse().join("/")} às ${x.hora} – ${x.servico} (${x.metodo}) – ${x.pet}`;
    ul.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // O CPF precisa estar cadastrado
  const clientes = JSON.parse(localStorage.getItem("clientes") || "{}");
  const cliente = clientes[cpf.value];
  cpf.setCustomValidity(cliente ? "" : "CPF não cadastrado");
  document.getElementById("ag-cpf-erro").textContent = cpf.value ? "CPF não encontrado. Faça o cadastro primeiro." : "Informe o CPF usado no cadastro.";
  form.classList.add("was-validated");
  if (!form.checkValidity()) { form.querySelector(":invalid").focus(); return; }

  const metodo = form.querySelector('input[name="metodo"]:checked').value;
  const reg = { data: data.value, hora: hora.value, servico: document.getElementById("servico").value,
                metodo, cpf: cpf.value, pet: cliente.pet.nome,
                endereco: metodo === "Tele-busca" ? endereco.value : "Petshop" };
  const agenda = lerAgenda(); agenda.push(reg);
  localStorage.setItem("agenda", JSON.stringify(agenda));

  const msg = document.getElementById("msg-agenda");
  msg.textContent = `Agendamento confirmado: ${reg.servico} para ${reg.pet} em ${reg.data.split("-").reverse().join("/")} às ${reg.hora} (${reg.metodo}).`;
  msg.classList.remove("d-none"); msg.focus();
  form.reset(); form.classList.remove("was-validated");
  document.getElementById("bloco-endereco").classList.add("d-none");
  carregarHorarios(); mostrarLista();
});
mostrarLista();
