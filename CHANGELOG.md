# Changelog

Todas as alterações notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/), e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [0.1.8] - 2026-10-22

### Adicionado
- **Integração com Banco de Dados Compartilhado Supabase (`jegtoehoywfemrtsdkpc`)**:
  - Configuração do `autistas-app` para utilizar o mesmo projeto Supabase compartilhado dos projetos irmãos `eleitores-app` e `locais-app` (`https://jegtoehoywfemrtsdkpc.supabase.co`).
  - Aplicação da tabela `public.assistant_messages` com retenção estrita de 180 dias, índices de busca (`created_at`, `expires_at`, `session_id`), rotina de expurgo automático `delete_expired_assistant_messages()` e política RLS de inserção anônima.
  - Suporte à gravação tanto no backend serverless (`api/chat.js`) com injeção automática de `.env.local` quanto no cliente (`index.html`) para execuções locais ou sem backend.
  - Arquivos `.env.local` e `.env.example` padronizados no repositório.

### Modificado
- **Ampliação e Rebalanceamento do Modal de Consentimento e Privacidade (LGPD)**:
  - Eliminação do aspecto excessivamente compacto: ampliação da largura para `min(620px, calc(100vw - 36px))` e posicionamento centralizado na margem inferior (`left: 50%; transform: translateX(-50%); bottom: 28px`), deixando mais de 400px de folga até o launcher do chat no canto direito em telas normais.
  - Aumento da ergonomia visual com acolchoamento generoso (`22px 26px`), cantos arredondados suaves (`18px`), ícone de escudo ampliado (`40px`), botões táteis de ação com altura mínima de `44px` e tipografia legível e relaxada.
  - Limpeza de media queries duplicadas e readequação de responsividade mobile fluida (`max-width: 680px`).

---

## [0.1.7] - 2026-10-22

### Modificado
- **Redesign Visual do Componente de Consentimento e Privacidade (LGPD)**:
  - Substituição da barra inferior fixa de largura total por um **card flutuante moderno no canto inferior esquerdo** (`.privacy-card`), eliminando a sobreposição visual com o atendente virtual no canto inferior direito.
  - Inclusão de cabeçalho padronizado com ícone protetor `🛡️`, título *"Sua Privacidade & LGPD"*, badge de fundamentação legal (*Lei Federal nº 13.709/2018*) e botão de fechamento rápido `✕`.
  - Caixa de destaque (*callout box*) amigável e visível detalhando a retenção anônima de 180 dias das perguntas enviadas ao assistente para aprimoramento pedagógico do site (Art. 7º, V e IX da LGPD), mesmo em caso de recusa de cookies opcionais.
  - Alinhamento lado a lado dos botões de ação (*"Aceitar Todos"* com estilo primário elevado e *"Apenas Essenciais"* com contorno suave secundário) e link direto para os termos completos.
  - Readequação completa do modo **Alto Contraste** (`body.high-contrast`) com bordas amarelas `#ffeb3b`, tipografia nítida e botões de alto contraste em conformidade com WCAG 2.1 AAA.

---

## [0.1.6] - 2026-10-22

### Corrigido
- **Correção de Sintaxe no Backend Serverless (`api/chat.js`)**:
  - Inclusão do bloco `try {` ausente no início do processamento da rota `handler`, eliminando o erro de sintaxe `Unexpected token 'catch'` e `'try' expected` detectado pelo analisador estático da IDE.
  - Adição de `"type": "module"` no `package.json` para reconhecimento explícito de ES Modules pelo Node.js, assegurando compilação estrita e sem avisos de performance durante `npm run verify`.

---

## [0.1.5] - 2026-10-22

### Adicionado
- **Retenção de Mensagens do Assistente por 180 Dias para Melhoria do Conteúdo**:
  - Armazenamento de todas as dúvidas e interações submetidas ao Guia Virtual por 180 dias para fins exclusivos de auditoria pedagógica, calibração e aprimoramento contínuo das orientações cidadãs do site.
  - **Script de Migração Supabase/PostgreSQL (`supabase_assistant_messages.sql`)**: Estrutura com tabela `assistant_messages`, campos indexados (`session_id`, `created_at`, `expires_at`), políticas de segurança RLS e função para expurgo automatizado de mensagens após 180 dias.
  - **Persistência Dupla e Resiliente no Backend (`api/chat.js`)**: Integração assíncrona com Supabase REST API (com timeout seguro de 3s) e fallback para logs estruturados JSON (`ASSISTANT_CONVERSATION_RECORD`) em plataformas serverless (Vercel/Netlify).
  - **Cofre Local de Auditoria (`tea_chat_vault`)**: Armazenamento seguro no navegador com expurgo preventivo automático que purga conversas com mais de 180 dias.
- **Conformidade LGPD e Avisos Obrigatórios de Privacidade**:
  - **Banner Flutuante de Privacidade e Cookies (`#privacy-banner`)**: Aviso claro com ações para "Aceitar Todos" e "Apenas Essenciais (Recusar Telemetria)", informando expressamente que, mesmo com a recusa de cookies ou telemetria, as perguntas enviadas voluntariamente ao assistente permanecem guardadas por 180 dias para aprimoramento pedagógico (Art. 7º, V e IX da Lei Federal nº 13.709/2018).
  - **Seção Completa de Privacidade (`#privacidade`)**: Nova seção com 4 cards explicativos sobre finalidade cidadã, retenção de 180 dias, sigilo dos rascunhos (100% locais no navegador) e direitos do titular com canal direto para o Encarregado de Dados.
  - **Avisos no Atendente Virtual**: Inclusão de alerta preventivo na mensagem de acolhimento inicial e no rodapé do chat (`.chat-disclaimer`), orientando a não digitação de dados sigilosos ou documentos bancários/médicos.
  - **Gerenciador de Preferências**: Botões no rodapé e na seção de termos para rever e reabrir as preferências de consentimento a qualquer momento.
  - **Modo Alto Contraste (WCAG AAA)**: Estilização do banner de privacidade, botões de ação e links com contraste superior a 19:1 para acessibilidade total.

---

## [0.1.4] - 2026-10-22

### Corrigido
- **Consistência Visual e Acessibilidade do Modo Alto Contraste (WCAG AAA)**:
  - **Barra de Navegação Principal (`.nav`)**: Correção crítica que resolvia a faixa branca com links invisíveis; agora renderiza com fundo escuro sólido `#000000`, borda inferior `#4b5563` e links em branco com hover amarelo `#ffeb3b`.
  - **Botões de Ação (`.btn-primary` e `.btn-secondary`)**: Resolução do texto branco ilegível sobre fundo amarelo (`#ffeb3b`) em botões como *"Entenda como proceder →"* e *"🖨️ Imprimir / Salvar em PDF"*; agora apresentam tipografia em preto sólido `#000000` em peso `800` (proporção de contraste superior a 19:1).
  - **Cards de Ação Rápida (`.action-card`)**: Eliminação de texto branco/cinza sobre fundos pastéis claros; os cards agora adotam superfícies escuras `#111827` com bordas luminosas de alta fidelidade nas cores de cada categoria (azul céu, esmeralda, violeta e âmbar) e badges de seta com fundo escuro e foco amarelo.
  - **Caixa de Pré-visualização do Requerimento (`.document-preview-box`)**: Ajuste de tela para modo escuro de alto contraste (`#000000` com texto `#ffffff` e borda `2px solid #ffffff`), eliminando o ofuscamento visual provocado pela folha branca no meio do tema escuro (a impressão física continua preservada como folha de papel preto e branco limpa).
  - **Campos de Formulário e Entradas**: Contornos de `2px` reforçados em `#6b7280`, com realce de foco amarelo `#ffeb3b` e labels nítidas em branco.
  - **Botão Flutuante do Guia Virtual (`.chat-launcher-btn`)**: Substituição do emoji `💬` por ícone vetorial SVG com traço adaptativo, exibindo contorno preto sólido sobre o círculo amarelo em modo alto contraste.
  - **Numeração de Passos (`.step-badge`) e FAQ**: Badges com fundo de alto contraste e texto escuro legível, e acordeão de perguntas frequentes com realce ao abrir.

---

## [0.1.3] - 2026-10-22

### Modificado
- **Identidade Visual e Cores dos Ícones de Ação Rápida**:
  - Substituição das antigas caixas sólidas escuras e emojis de sistema operacional (`🗳️`, `📝`, `👤`, `⚠️`) por ícones vetoriais SVG nítidos e padronizados com traço moderno e responsivo.
  - Aplicação de gradientes luminosos e harmoniosos com as cores de cada card temático:
    - **Quero votar (Azul)**: Gradiente `linear-gradient(135deg, #0284c7, #0369a1)` com brilho difuso suave e ícone de urna eleitoral / cédula validada.
    - **Tenho dificuldade para votar (Verde/Esmeralda)**: Gradiente `linear-gradient(135deg, #10b981, #059669)` e ícone de documento / requerimento formal.
    - **Quero registrar a deficiência (Roxo/Violeta)**: Gradiente `linear-gradient(135deg, #a855f7, #7c3aed)` e ícone de perfil de eleitor com verificação de acessibilidade, eliminando a silhueta escura ilegível anterior.
    - **Tenho pendência eleitoral (Âmbar/Laranja)**: Gradiente `linear-gradient(135deg, #f59e0b, #d97706)` e ícone amigável de alerta/regularização cadastral.
  - Micro-interações táticas: animação sutil de elevação e escala (`transform: translateY(-2px) scale(1.06)`) ao passar o mouse sobre o card.
  - Efeito hover coordenado no botão de seta (`.arrow-badge`) assumindo a tonalidade vibrante da categoria correspondente.
  - Regras específicas para o modo de **Alto Contraste** (`body.high-contrast`) com bordas brancas e contraste pleno para baixa visão.

---

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
