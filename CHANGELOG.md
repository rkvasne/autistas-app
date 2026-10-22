# Changelog

Todas as alterações notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/), e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [0.1.2] - 2026-10-22

### Corrigido
- **Respostas do Atendente Virtual sobre Acomodações Sensoriais e Abafadores**:
  - Implementação de base semântica normalizada (sem acentos ou pontuação) para responder prontamente a dúvidas sobre o uso de **abafadores de ouvido**, fones antirruído e regulação sensorial (Leis 12.764/2012 e 13.146/2015).
  - Resolução de dúvidas sobre cordão de girassol (Lei 14.626/2023), prioridade na fila, biometria e laudos permanentes.
  - Autonomia e resiliência em protocolo local (`file:///`), eliminando o reset para a mensagem inicial e garantindo atendimento 100% funcional offline ou sem backend.
  - Inclusão do chip de sugestão rápida *"🎧 Posso ir com abafador de ouvido?"* na tela inicial de boas-vindas do chat.

---

## [0.1.1] - 2026-10-21

### Adicionado
- **Guia Virtual de Atendimento ("Guia Virtual Autismo & Direitos")**:
  - Widget flutuante de acolhimento e assistência ao cidadão, com respostas empáticas para dúvidas sobre votação com acessibilidade, acompanhante, justificativa e dispensa.
  - Integração Serverless na Vercel (`api/chat.js`) utilizando `openai/gpt-4o-mini` via OpenRouter com fallback local resiliente.
  - Navegação assistida que rola suavemente a página até as seções correspondentes (ex.: gerador de requerimento `#modelos`, triagem `#orientacao`).
  - Atendimento humanizado sem fricção técnica: modelos e chaves configurados internamente, sem expor configurações complexas de IA para o usuário final.
- **Identidade Visual e Favicons Oficiais**:
  - Favicon oficial do Quebra-Cabeça Colorido do Autismo (`favicon.svg`, `assets/favicon-puzzle.png`).
  - Favicon alternativo do Infinito da Neurodiversidade (`favicon-infinity.svg`, `assets/favicon-infinity.png`).
  - Metatags completas de Open Graph e Twitter Card para compartilhamento com prévia rica no WhatsApp e redes sociais.
- **Script de Integridade**: Inclusão de `npm run verify` (`node -c api/chat.js`) para validação estática de sintaxe.

### Modificado
- **Rebranding e Expansão da Marca**:
  - Transição de "Guia TEA & Voto" para **"Autismo & Direitos"** (com subtítulo "Módulo Direitos Eleitorais"), preparando a base para expansão contínua em outros direitos essenciais (saúde, educação e benefícios).
- **Ergonomia e Posicionamento do Modal de Atendimento**:
  - Ancoragem na base (`bottom: 20px; right: 20px;`), com recolhimento suave do botão circular quando o chat abre, eliminando a sensação de janela "alta demais".
  - Largura ajustada de 330px para **380px** (`max-width: calc(100vw - 32px)`), permitindo que mensagens e chips de dúvidas frequentes fluam em linha única sem quebras prematuras de termos jurídicos.
  - Responsividade mobile aprimorada (`width: 100%` com margem de 12px da base).
- **Precisão Jurídica sobre Título de Eleitor vs. CPF/BPC**:
  - Esclarecimento pedagógico em todas as seções e no atendente: o Título eleitoral pode ser cancelado após 3 eleições consecutivas sem justificativa/multa, mas o **CPF e o BPC/LOAS nunca são cancelados** por motivos eleitorais.
  - Destaque para a blindagem definitiva garantida pelo Art. 15 da Resolução TSE nº 23.659/2021.
- **Motor Empático e Respostas Sensoriais (Abafadores, Fones e Autonomia Local)**:
  - Adição de base de conhecimento empática normalizada para respostas imediatas sobre **abafadores de som/ruído, fones e sensibilidade sensorial** (Leis 12.764/2012 e 13.146/2015), cordão de girassol (Lei 14.626/2023), prioridade na fila, biometria e laudos.
  - Suporte total à execução local (`file:///`), eliminando o reset para mensagem genérica de boas-vindas e garantindo respostas precisas e acolhedoras em qualquer ambiente.

### Aprendizado da Release
- **Fato observado (Interação):** A exposição de engrenagens técnicas e seleção de modelos gerava ruído e insegurança para o público-alvo (famílias atípicas). A interface humanizada e pronta de fábrica entrega acolhimento superior.
- **Fato observado (Jurídico):** O temor de cancelamento de CPF é o maior boato que afasta pessoas autistas e responsáveis do cartório eleitoral; a distinção pedagógica entre o cancelamento do Título e a segurança do CPF/BPC transformou o Artigo 15 no remédio legal central e compreensível do app.

---

## [0.1.0] - 2026-10-20

### Adicionado
- **Download Direto em `.txt`**: Novo botão no gerador de requerimentos para baixar o documento preenchido com nomenclatura personalizada e sem necessidade de impressão.
- **Salvamento Automático de Rascunho (`localStorage`)**: Persistência em tempo real dos campos do formulário para evitar perda de dados por recarregamento acidental do navegador.
- **Máscara para Título de Eleitor**: Formatação automática em blocos de 4 dígitos (`0000 0000 0000`) ao digitar o número do título.
- **Arquivo de Licença Oficial**: Criação do arquivo `LICENSE` formal sob a licença MIT.
- **Preservação de Versões em Acervo**: Arquivamento das versões anteriores das artes em `assets/arquivo/atendimento-cartorio-afro.png` e `assets/arquivo/protecao-beneficios-afro.png`, totalizando 20 variações históricas salvas.

### Aprimorado
- **Diversidade Étnica e Pluralidade Visual Brasileira**:
  - Nova ilustração para a Seção 3 (**Atendimento no Cartório**): servidora pública atenciosa e família com diversidade de traços e tons de pele do mosaico demográfico brasileiro, mantendo o acolhimento, crachás e totem de atendimento.
  - Nova ilustração para a Seção 4 (**Proteção de Benefícios**): mãe e filho autista em ambiente acolhedor com nova composição étnica brasileira, confirmando a segurança do BPC/LOAS no smartphone com RG verde à mesa.
  - Equilíbrio visual harmônico em todo o portal, retratando pessoas pardas, negras, brancas e com diferentes traços regionais brasileiros.
- **Acessibilidade e Descrições `alt`**: Textos alternativos das imagens atualizados para leitores de tela com máxima precisão e clareza.

---

## [0.0.1] - 2026-10-19

### Adicionado
- **Lançamento do Portal Guia TEA & Voto**: Plataforma web de alta performance construída em HTML5, Vanilla CSS e JavaScript puro sem dependências pesadas de compilação.
- **Assistente de Triagem Orientada (Wizard)**: Fluxo rápido em 3 etapas orientando eleitores autistas e famílias (votar com acessibilidade, isenção por impossibilidade/onerosidade, registro de deficiência ou regularização).
- **Gerador Dinâmico de Requerimentos Jurídicos**: Editor em tempo real com pré-visualização instantânea fundamentado no **Artigo 15 da Resolução TSE nº 23.659/2021**, na **Lei Berenice Piana (12.764/2012)** e na **LBI (13.146/2015)**.
- **Impressão Formatada em Folha A4**: Regras `@media print` personalizadas que removem menus, botões e cabeçalhos para gerar petição impressa limpa para o cartório.
- **Cópia Rápida para Área de Transferência**: Botão com retorno dinâmico via toast.
- **Recursos de Acessibilidade (WCAG 2.1)**:
  - Alternador de Alto Contraste com persistência em `localStorage`.
  - Controle de escala tipográfica dinâmica (`A+`, `A`, `A-`).
  - Busca em tempo real com realce e atenuação visual.
  - Navegação fluida por teclado com `:focus-visible`.
- **Esclarecimentos sobre Benefícios Sociais**: Seções desmistificando mitos sobre cancelamento de CPF e BPC/LOAS decorrentes de faltas às urnas.
- **Direção de Arte Editorial Vetorial 2D**: Criação do acervo de ilustrações acolhedoras para o Hero e seções temáticas.
- **Configurações de Produção e Segurança**: Cabeçalhos de segurança configurados para Vercel (`vercel.json`) e Netlify (`netlify.toml`).
