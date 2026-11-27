# PetShop Pata Feliz – Ajuda

Este arquivo descreve as funcionalidades do site do petshop.

## Páginas
- **Início:** carrossel de destaques, serviços oferecidos, horário de funcionamento e aviso se a loja está aberta ou fechada.
- **Cadastro:** formulário com os dados do cliente e do pet.
- **Agendamento:** escolha do serviço, do método de atendimento, da data e do horário.

## Funcionalidades
1. **Carrossel:** três destaques com troca automática, setas e indicadores.
2. **Saudação e horário:** mensagem de bom dia, boa tarde ou boa noite, relógio atualizado e aviso de loja aberta ou fechada.
3. **Cadastro do cliente e do pet:**
   - Cliente: nome, CPF, data de nascimento, sexo, telefone, e-mail, endereço, bairro, cidade e estado.
   - Pet: nome, espécie, raça, idade, peso, porte, cuidados especiais e observações.
   - Campos obrigatórios, máscara de CPF e telefone, e validação do CPF e do e-mail.
4. **Agendamento:**
   - Serviços: banho, tosa ou banho e tosa.
   - Métodos: **tele-busca** (o petshop busca e devolve o pet; é solicitado o endereço) ou **entrega no local** (o cliente leva o pet ao petshop).
   - Calendário para escolher o dia, sem datas passadas e sem domingos.
   - Lista de horários livres: um horário já reservado não aparece novamente.
5. **Acessibilidade para deficientes visuais:**
   - Texto alternativo (`alt`) descrevendo cada imagem.
   - Link "Pular para o conteúdo principal".
   - Todos os campos com rótulo (`label`) e mensagens lidas por leitores de tela.
   - Botões A+ e A− para aumentar e diminuir a fonte.
   - Modo de alto contraste.

## Como usar
1. Em **Cadastro**, preencha os dados do cliente e do pet e clique em *Salvar cadastro*.
2. Em **Agendamento**, informe o CPF cadastrado, escolha o serviço e o método, selecione a data e o horário, e clique em *Confirmar agendamento*.

Os dados ficam salvos no próprio navegador do usuário.

## Ajustes realizados
- Caminhos relativos nos arquivos, para o site funcionar na hospedagem.
- Idioma da página (`pt-BR`), configuração para celular e título em cada página.
- Validação de CPF, idade mínima de 18 anos e telefone com DDD.
- Bloqueio de datas passadas, domingos e horários já ocupados.
- Proteção do texto digitado na mensagem de confirmação.
- Tratamento de erro ao salvar os dados no navegador.
- Imagens do carrossel menores em telas pequenas e respeito à preferência de movimento reduzido.
- Código separado em arquivos HTML, CSS e JavaScript, todos comentados.
