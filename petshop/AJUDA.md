# PetShop Pata Feliz – Arquivo de ajuda (Fase 2)

## Estrutura
```
index.html          página inicial (carrossel, serviços, horário, status aberto/fechado)
cadastro.html       cadastro do cliente e do pet
agendamento.html    escolha de serviço, método e data/hora
css/style.css       estilos próprios (complementam o Bootstrap)
js/main.js          saudação, relógio, status, acessibilidade, CPF
js/cadastro.js      máscaras, validação e gravação do cadastro
js/agendamento.js   calendário, horários livres e gravação do agendamento
img/                imagens do carrossel (SVG)
```

## Funcionalidades
1. **Carrossel** (Bootstrap) com 3 destaques, troca automática, setas e indicadores.
2. **Funções temporais (JavaScript):** saudação (bom dia/tarde/noite), relógio e aviso "aberto/fechado" conforme o horário real.
3. **Cadastro:** nome, CPF, nascimento, sexo (radio), telefone, e-mail, endereço, cidade/UF (select), dados do pet (nome, espécie, raça, idade, peso, porte, cuidados em checkbox, observações). Campos obrigatórios, `placeholder`, `type=email/tel/number/date`, máscara e validação de CPF.
4. **Agendamento:** serviço (Banho, Tosa ou Banho e Tosa); método **tele-busca** (pede endereço) ou **entrega no local**; calendário (`input type=date`) sem datas passadas e sem domingos; lista de horários livres (evita horário duplicado).
5. **Acessibilidade (deficientes visuais):** `alt` descritivo nas imagens, link "pular para o conteúdo", `label` em todos os campos, `aria-label`/`aria-live`/`role="status"`, foco visível, botões A+/A− e modo **alto contraste** (preferência salva).

## Como usar
Cadastre-se em *Cadastro* → vá em *Agendamento* → informe o CPF, serviço, método, data e horário → confirme.
Os dados ficam salvos no próprio navegador (`localStorage`); não há servidor.

## Publicação no GitHub Pages
1. Crie conta em github.com e um repositório público (ex.: `petshop`).
2. Envie todos os arquivos (Add file → Upload files, mantendo as pastas `css`, `js`, `img`).
3. Em **Settings → Pages**, em *Branch* escolha `main` e pasta `/ (root)` → Save.
4. Aguarde 1–2 minutos: o site fica em `https://SEU-USUARIO.github.io/petshop/`.

## Ajustes realizados antes da publicação
- Caminhos relativos (`css/…`, `js/…`) para funcionar no GitHub Pages.
- `lang="pt-BR"`, `meta viewport` e `<title>` por página (responsividade e leitores de tela).
- Validação de CPF (dígitos verificadores), idade mínima de 18 anos e telefone com DDD.
- Datas passadas, domingos e horários já ocupados bloqueados no agendamento.
- Texto do usuário escapado na mensagem de confirmação (evita injeção de HTML).
- Tratamento de erro (`try/catch`) ao gravar no `localStorage`.
- Tamanho das imagens do carrossel reduzido em telas pequenas; respeito a `prefers-reduced-motion`.
- Código separado em arquivos HTML, CSS e JS, todos comentados.
