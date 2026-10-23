# Autismo & Direitos — Guia Prático de Cidadania e Inclusão (v0.1.9)

> **Iniciativa Cidadã e Independente:** Este portal é uma plataforma informativa da sociedade civil destinada a pessoas autistas, suas famílias e representantes legais. **Não é uma página governamental oficial** do Tribunal Superior Eleitoral (TSE) ou dos Tribunais Regionais Eleitorais (TREs). Para serviços e certidões oficiais, consulte sempre o portal do TSE ([tse.jus.br](https://www.tse.jus.br)).

---

## 📌 Visão Geral

O portal **Autismo & Direitos** foi concebido para simplificar a legislação, assegurar o exercício da cidadania e fornecer ferramentas práticas para pessoas autistas e suas famílias. O módulo atual contempla detalhadamente os **Direitos Eleitorais e Acessibilidade nas Eleições**, com arquitetura preparada para novos módulos (saúde, educação, carteira CIPTEA e benefícios sociais).

### Principais Funcionalidades:
1. **Guia Virtual de Atendimento ("Pegando na Mão do Cidadão"):** Atendente conversacional no canto inferior direito que acolhe o cidadão de forma calorosa, didática e empática, esclarecendo dúvidas sobre voto, Artigo 15, BPC/LOAS, acompanhante e geração de petições.
   - **Operação Transparente e Sem Fricção:** O atendente já vem pronto e 100% configurado de fábrica no backend, sem exigir configurações nem expor termos técnicos ou seleção de modelos para o usuário final.
   - **Arquitetura Resiliente:** Rota serverless segura `/api/chat` integrada ao OpenRouter (GPT-4o-mini), aliada a uma base empática local que responde prontamente mesmo sem conexão.
   - **Banco Compartilhado Supabase (Eleições & Cidadania):** Conectado ao mesmo banco de dados do ecossistema eleitoral (`eleitores-app` e `locais-app`, projeto `jegtoehoywfemrtsdkpc`). As mensagens enviadas ao assistente são arquivadas na tabela `assistant_messages` com retenção estrita de 180 dias (LGPD Art. 7º, V e IX) para melhoria pedagógica contínua, com rotina de expurgo programado e segurança RLS.
   - **Persistência Dupla (Supabase / Structured Logging):** Script SQL `supabase_assistant_messages.sql` com políticas RLS, gravação assíncrona tanto no backend serverless quanto no cliente (`index.html`) e fallback para logs estruturados JSON em ambientes isolados.
   - **Navegação Guiada Interativa:** O atendente insere atalhos interativos que rolam suavemente a página até a ferramenta correta (ex: gerador de requerimento).
2. **Conformidade LGPD e Transparência de Privacidade:**
   - **Modal Flutuante de Consentimento Amplo e Confortável (`.privacy-card`):** Posicionado centralizadamente na margem inferior (`min(620px, ...)`), com espaçamento relaxado, acolchoamento generoso (`22px 26px`), cantos arredondados suaves (`18px`) e botões ergonômicos ("Aceitar Todos" e "Apenas Essenciais"), mantendo folga generosa de mais de 400px em relação ao widget do chat no canto direito.
   - Esclarecimento explícito sobre a retenção de 180 dias das perguntas do chat.
   - Seção dedicada `#privacidade` no portal com 4 cartões explicativos, direitos do titular (Art. 18) e canal com Encarregado de Dados.
   - Botão para reabrir e gerenciar preferências de privacidade a qualquer momento no rodapé e na seção de termos.
3. **Assistente de Triagem Orientada (Wizard):** Diagnóstico rápido em 3 etapas que orienta o cidadão de acordo com sua situação concreta (desejo de votar com acessibilidade, dificuldade excessiva para comparecer, registro de deficiência ou pendências cadastrais).
4. **Gerador Dinâmico de Requerimentos Jurídicos:** Editor em tempo real com pré-visualização instantânea para elaboração de petições fundamentadas no **Art. 15 da Resolução TSE nº 23.659/2021** (isenção de sanções ou certidão por prazo indeterminado), acessibilidade ou regularização.
   - **Salvamento Automático de Rascunho (`localStorage`):** Os dados digitados são preservados estritamente na máquina do usuário e nunca transmitidos a servidores externos.
   - **Máscara Automática de Título de Eleitor:** Formatação inteligente em blocos (`0000 0000 0000`).
5. **Download Direto (.txt) e Impressão (PDF/A4):** Opção de baixar o requerimento preenchido em arquivo de texto plano formatado e estilos dedicados (`@media print`) para impressão direta e limpa.
6. **Cópia Instantânea:** Botão para cópia do texto com feedback visual (`toast`).
7. **Recursos de Acessibilidade (WCAG 2.1 AA/AAA):**
   - Alternador de Alto Contraste para baixa visão ou sensibilidade à luz (aplicado também ao chat, card de privacidade e rodapé).
   - Ajuste dinâmico de tamanho de tipografia (`A+`, `A`, `A-`).
   - Busca em tempo real com realce de tópicos e perguntas frequentes.
   - Navegação por teclado completa (`:focus-visible`).
8. **Representatividade e Diversidade Étnica:** Direção de arte editorial 2D que reflete o mosaico plural da população brasileira (pessoas pardas, negras, brancas e com diferentes traços regionais).
9. **Esclarecimento Preciso sobre Documentos e Benefícios:** Informações exatas sobre a independência do CPF (Receita Federal) e do BPC/LOAS (INSS/MDS) — que nunca são cancelados por falta de voto —, diferenciando do Título de Eleitor (que pode ser cancelado após 3 eleições sem justificativa) e demonstrando como o Art. 15 da Resolução TSE nº 23.659/2021 protege a pessoa autista contra qualquer penalidade.

---

## 📂 Estrutura de Arquivos

```
autistas-app/
├── index.html                   # Aplicação web principal com widget de chat integrado
├── favicon.svg                  # Favicon vetorial oficial (Quebra-Cabeça Colorido)
├── favicon-infinity.svg         # Favicon vetorial alternativo (Infinito da Neurodiversidade)
├── api/
│   └── chat.js                  # Serverless function (Vercel) intermediando OpenRouter
├── assets/
│   ├── favicon-puzzle.png              # Ícone HD (Quebra-Cabeça Colorido)
│   ├── favicon-infinity.png            # Ícone HD (Infinito da Neurodiversidade)
│   ├── hero-illustration.png           # Principal (Hero): Jovem autista com olhar de esperança e cabine com urna eletrônica
│   ├── acessibilidade-inclusao.png     # Seção 1: Jovem mulher autista com fones abafadores e pai em escola acessível (2D editorial)
│   ├── orientacao-cidadania.png        # Seção 2: Apoio familiar e organização de documentos e triagem (2D editorial)
│   ├── atendimento-cartorio.png        # Seção 3: Atendimento acolhedor de servidora pública e família no Cartório Eleitoral (2D editorial)
│   ├── protecao-beneficios.png         # Seção 4: Mãe e jovem adulto autista confirmando segurança de benefícios e BPC (2D editorial)
│   └── arquivo/                        # Acervo histórico com todas as 20 variações e versões de estudo preservadas
├── CHANGELOG.md                 # Registro cronológico detalhado de lançamentos e versões
├── HISTORICO_CONVERSA.txt       # Registro completo de todas as 19 interações da sessão de desenvolvimento
├── LICENSE                      # Licença de código aberto MIT
├── package.json                 # Metadados do projeto (v0.1.9) e scripts de execução
├── supabase_assistant_messages.sql # Script SQL para Supabase/PostgreSQL com retenção de 180 dias
├── .env.example                 # Modelo de variáveis de ambiente para o Supabase compartilhado
├── .gitignore                   # Filtro de arquivos do SO, IDEs e dependências
├── vercel.json                  # Configuração de segurança e deploy na Vercel
├── netlify.toml                 # Configuração de deploy no Netlify
└── README.md                    # Documentação do projeto
```

---

## 🚀 Como Executar Localmente

Como a aplicação é construída em tecnologias web nativas (HTML5, Vanilla CSS e JavaScript puro), ela não requer etapas pesadas de compilação ou instalação de dependências.

### Opção 1: Abrir diretamente no navegador
Basta dar dois cliques no arquivo `index.html` ou abri-lo pelo seu navegador favorito.

### Opção 2: Servidor local via Node.js
```bash
npm start
# ou
npx serve -l 3000 .
```
Acesse `http://localhost:3000` no navegador.

### Opção 3: Servidor local via Python
```bash
python -m http.server 3000
```
Acesse `http://localhost:3000`.

### Verificação de Integridade
```bash
npm run verify
```
Executa a validação sintática das funções serverless e rotas da API.

---

## 🌐 Deploy em Produção

O repositório já está configurado para deploy imediato com zero fricção em qualquer provedor de hospedagem estática:

- **GitHub Pages:** Ative nas configurações do repositório (`Settings > Pages > Deploy from a branch: main / root`).
- **Vercel:** Conecte o repositório no dashboard da Vercel; o arquivo `vercel.json` cuidará dos cabeçalhos de segurança e rotas limpas.
- **Netlify:** Conecte o repositório; o arquivo `netlify.toml` publicará o diretório raiz automaticamente.
- **Cloudflare Pages:** Crie um novo projeto apontando para a raiz do repositório sem comando de build.

---

## ⚖️ Base Normativa Citada

- **Resolução TSE nº 23.659/2021 (Artigo 15):** Procedimento de isenção de sanções e quitação por prazo indeterminado para eleitores com deficiência.
- **Lei nº 12.764/2012 (Lei Berenice Piana):** Política Nacional de Proteção dos Direitos da Pessoa com TEA.
- **Lei nº 13.146/2015 (Lei Brasileira de Inclusão - LBI):** Plena capacidade civil e garantias de participação política.
- **Resolução TSE nº 23.750/2026 e 23.751/2026:** Cronograma e atos das eleições.

---

## 📄 Licença

Distribuído sob a licença [MIT](LICENSE). Código aberto para apoiar a cidadania e a inclusão.
