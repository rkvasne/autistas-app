# Changelog

Todas as alterações notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/), e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

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
