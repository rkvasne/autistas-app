# Guia TEA & Voto — Direitos Eleitorais e Acessibilidade (v0.0.1)

> **Iniciativa Cidadã e Independente:** Este portal é um guia informativo da sociedade civil destinado a pessoas autistas, suas famílias e representantes legais. **Não é uma página governamental oficial** do Tribunal Superior Eleitoral (TSE) ou dos Tribunais Regionais Eleitorais (TREs). Para serviços e certidões oficiais, consulte sempre o portal do TSE ([tse.jus.br](https://www.tse.jus.br)).

---

## 📌 Visão Geral

O projeto **Guia TEA & Voto** foi desenvolvido para desmistificar regras eleitorais, assegurar o exercício de direitos e fornecer ferramentas práticas de cidadania para pessoas com Transtorno do Espectro Autista (TEA).

### Principais Funcionalidades:
1. **Assistente de Triagem Orientada (Wizard):** Diagnóstico rápido em 3 etapas que orienta o cidadão de acordo com sua situação concreta (desejo de votar com acessibilidade, dificuldade excessiva para comparecer, registro de deficiência ou pendências cadastrais).
2. **Gerador Dinâmico de Requerimentos Jurídicos:** Editor em tempo real com pré-visualização instantânea para elaboração de petições fundamentadas no **Art. 15 da Resolução TSE nº 23.659/2021** (isenção de sanções ou certidão por prazo indeterminado), acessibilidade ou regularização.
3. **Formatação para Impressão (PDF/A4):** Estilos dedicados (`@media print`) que eliminam menus e elementos interativos, gerando um documento limpo e pronto para entrega ao Cartório Eleitoral.
4. **Cópia Instantânea:** Botão para cópia do texto com feedback visual (`toast`).
5. **Recursos de Acessibilidade (WCAG 2.1 AA/AAA):**
   - Alternador de Alto Contraste para baixa visão ou sensibilidade à luz.
   - Ajuste dinâmico de tamanho de tipografia (`A+`, `A`, `A-`).
   - Busca em tempo real com realce de tópicos e perguntas frequentes.
   - Navegação por teclado completa (`:focus-visible`).
6. **Esclarecimento sobre Benefícios e Documentos:** Orientações sobre a independência do CPF (Receita Federal) e do BPC/LOAS (INSS/MDS) em relação a faltas eleitorais.

---

## 📂 Estrutura de Arquivos

```
autistas-app/
├── index.html                   # Aplicação web principal de alta performance
├── assets/
│   ├── hero-illustration.png           # Principal (Hero): Jovem autista com olhar de esperança e cabine com urna eletrônica
│   ├── acessibilidade-inclusao.png     # Seção 1: Escola pública no dia da votação com rampa, piso tátil e acolhimento (2D editorial)
│   ├── orientacao-cidadania.png        # Seção 2: Organização familiar de documentos e requisitos (2D editorial oficial)
│   ├── atendimento-cartorio.png        # Seção 3: Atendimento acolhedor no Cartório Eleitoral com expressão serena (2D editorial)
│   ├── protecao-beneficios.png         # Seção 4: Família acolhida em casa, café, 1 RG e celular confirmando benefícios (2D editorial)
│   ├── hero-illustration-frontal.png   # Variação hero frontal preservada
│   ├── hero-illustration-pensativo.png # Variação hero pensativa preservada
│   ├── hero-illustration-eleitora.png  # Variação hero jovem eleitora preservada
│   ├── atendimento-cartorio-2d-triste.png # Variação 2D cartório anterior preservada
│   ├── atendimento-cartorio-consultorio.png # Variação estilo consultório preservada
│   ├── atendimento-cartorio-3d.png     # Variação 3D preservada
│   ├── acessibilidade-inclusao-comic.png # Variação comic preservada
│   ├── acessibilidade-inclusao-disney.png # Variação cartoon preservada
│   ├── acessibilidade-inclusao-clinica.png # Variação clínica preservada
│   ├── acessibilidade-inclusao-3d.png  # Variação 3D preservada
│   ├── orientacao-cidadania-v1.png     # Variação 2D original preservada
│   ├── orientacao-cidadania-3d.png     # Variação 3D preservada
│   ├── protecao-beneficios-antivirus.png # Variação escudo antivírus preservada
│   ├── protecao-beneficios-pintura.png # Variação pintura família preservada
│   ├── protecao-beneficios-telas.png   # Variação telas múltiplas preservada
│   └── protecao-beneficios-3d.png      # Variação 3D preservada
├── package.json                 # Metadados do projeto (v0.0.1) e scripts de execução
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
