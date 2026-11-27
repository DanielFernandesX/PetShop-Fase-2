/* main.js – funções comuns a todas as páginas */
"use strict";

/* ---- Funções temporais (somente na página inicial) ---- */
function saudacao() {
  const h = new Date().getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
}

// Horário de funcionamento: [abre, fecha] por dia da semana (0 = domingo)
const HORARIOS = { 0: null, 1: [8, 18], 2: [8, 18], 3: [8, 18], 4: [8, 18], 5: [8, 18], 6: [8, 13] };

function atualizarStatus() {
  const el = document.getElementById("status-loja");
  if (!el) return;
  const agora = new Date();
  const faixa = HORARIOS[agora.getDay()];
  const hora = agora.getHours() + agora.getMinutes() / 60;
  const aberto = faixa && hora >= faixa[0] && hora < faixa[1];
  el.textContent = aberto ? "Estamos abertos agora!" : "Estamos fechados no momento.";
  el.className = aberto ? "aberto" : "fechado";
}

function atualizarRelogio() {
  const el = document.getElementById("relogio");
  if (el) el.textContent = new Date().toLocaleString("pt-BR", { dateStyle: "full", timeStyle: "short" });
}

const titulo = document.getElementById("saudacao");
if (titulo) {
  titulo.textContent = saudacao() + "! Bem-vindo ao Pata Feliz";
  atualizarStatus(); atualizarRelogio();
  setInterval(() => { atualizarStatus(); atualizarRelogio(); }, 30000); // atualiza a cada 30 s
}

/* ---- Rodapé: ano atual ---- */
const ano = document.getElementById("ano");
if (ano) ano.textContent = new Date().getFullYear();

/* ---- Acessibilidade: tamanho da fonte e alto contraste (preferência salva) ---- */
let tamanho = parseInt(localStorage.getItem("fonte")) || 100;
const aplicarFonte = () => { document.documentElement.style.fontSize = tamanho + "%"; localStorage.setItem("fonte", tamanho); };
aplicarFonte();
document.getElementById("btn-aumentar").addEventListener("click", () => { tamanho = Math.min(tamanho + 10, 150); aplicarFonte(); });
document.getElementById("btn-diminuir").addEventListener("click", () => { tamanho = Math.max(tamanho - 10, 80); aplicarFonte(); });

const btnC = document.getElementById("btn-contraste");
function aplicarContraste(on) {
  document.body.classList.toggle("alto-contraste", on);
  btnC.setAttribute("aria-pressed", on);
  localStorage.setItem("contraste", on);
}
aplicarContraste(localStorage.getItem("contraste") === "true");
btnC.addEventListener("click", () => aplicarContraste(!document.body.classList.contains("alto-contraste")));

/* ---- Utilitários compartilhados (CPF) ---- */
function mascaraCPF(v) {
  v = v.replace(/\D/g, "").slice(0, 11);
  return v.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}
function cpfValido(cpf) {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  for (let t = 9; t < 11; t++) {
    let soma = 0;
    for (let i = 0; i < t; i++) soma += cpf[i] * (t + 1 - i);
    if ((soma * 10) % 11 % 10 !== parseInt(cpf[t])) return false;
  }
  return true;
}
