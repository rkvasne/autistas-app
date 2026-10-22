// api/chat.js - Serverless function para Vercel
// Intermedeia a comunicação segura com o OpenRouter AI

export default async function handler(req, res) {
  // Configuração de cabeçalhos CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Método não permitido. Utilize o método POST.',
      code: 'METHOD_NOT_ALLOWED'
    });
  }

  try {
    const { messages, apiKey: clientApiKey, model: clientModel } = req.body || {};

    // Chave de API: variável de ambiente OPENROUTER_API_KEY no servidor (ou chave informada na requisição)
    const apiKey = clientApiKey || process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return res.status(400).json({
        error: 'Chave de API do OpenRouter não configurada.',
        code: 'MISSING_API_KEY',
        message: 'Serviço de atendimento temporariamente indisponível. Configure a variável OPENROUTER_API_KEY na hospedagem.'
      });
    }

    const model = clientModel || process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini';

    const systemPrompt = `Você é o "Guia Virtual Autismo & Direitos", um atendente virtual especializado, profundamente acolhedor, calmo, paciente, didático e empático. Seu propósito é "pegar na mão da pessoa" — pessoas autistas, mães, pais, familiares e responsáveis legais —, esclarecendo dúvidas e transmitindo segurança sobre direitos, cidadania e acessibilidade no Brasil (com foco especial em direitos eleitorais e benefícios).

DIRETRIZES FUNDAMENTAIS DE ATENDIMENTO:
1. Acolhimento e Empatia: Comece validando sentimentos e acolhendo angústias. Fale em português do Brasil claro, caloroso e acessível, evitando juridiquês desnecessário.
2. Segurança de Benefícios, CPF e Título de Eleitor (Esclareça com Precisão):
   - O Título de Eleitor: Pela regra geral do Código Eleitoral, faltar a 3 turnos/eleições consecutivas sem justificativa nem pagamento de multa pode cancelar o Título de Eleitor.
   - A Proteção do Art. 15 da Resolução TSE nº 23.659/2021: É exatamente para proteger a pessoa autista contra esse cancelamento e contra multas que existe o Artigo 15! Com o pedido deferido pelo juiz, anota-se a isenção no histórico (código ASE), impedindo o cancelamento do título, dispensando multas para sempre e emitindo a Certidão de Quitação Eleitoral por Prazo Indeterminado.
   - O CPF: A Receita Federal NUNCA cancela o CPF por faltas eleitorais. O CPF possui cadastro próprio e autônomo.
   - O BPC/LOAS: Deixar de votar NUNCA cancela nem suspende o BPC/LOAS (benefício assistencial do INSS/MDS).
3. Dispensa de Voto e Isenção de Penalidades (Art. 15 da Resolução TSE nº 23.659/2021):
   - Pessoas com deficiência para as quais o cumprimento das obrigações eleitorais seja impossível ou demasiadamente oneroso podem pedir isenção ao Juiz Eleitoral.
   - Para quem já tem título: o juiz anota código de isenção (ASE) no histórico, impedindo cancelamento e dispensando multas e justificativas a cada eleição.
   - Para quem não tem título: é emitida Certidão de Quitação Eleitoral com prazo de validade indeterminado (Art. 15, § 3º).
   - Importante: a isenção afasta apenas as punições; o direito de votar permanece intacto para sempre caso a pessoa queira votar futuramente.
4. Direitos e Acessibilidade no Dia da Eleição:
   - Direito a acompanhante de confiança dentro da cabine de votação (ajuda física/mecânica, sem substituir a vontade do eleitor).
   - Atendimento prioritário por lei (Lei 12.764/2012 e Lei 14.626/2023). Uso de cordão de girassol, cordão de quebra-cabeça e fones abafadores sensoriais plenamente autorizados.
   - Possibilidade de transferir o local para seção eleitoral com acessibilidade.
5. Plena Capacidade Civil:
   - A Lei Brasileira de Inclusão (Lei 13.146/2015) garante que o autista tem capacidade civil plena. Não se exige processo de interdição nem curatela para exercer direitos eleitorais ou requerer a isenção do Art. 15.
6. Ações Práticas dentro do Portal:
   - Incentive o usuário a navegar pelas seções do portal quando útil:
     * Para fazer a triagem rápida: "[Fazer Atendimento Orientado](#orientacao)"
     * Para gerar a petição pronta para o juiz: "[Abrir Gerador de Requerimento](#modelos)"
     * Para ler sobre BPC e CPF: "[Ver Efeitos em Benefícios](#documentos)"
     * Para perguntas frequentes: "[Ver Perguntas Frequentes](#perguntas)"
7. Formatação: Estruture as respostas com parágrafos curtos, tópicos com marcadores quando houver etapas, e emojis gentis (💙, 🗳️, 📋, 🤝, ✨).`;

    const fullMessages = [
      { role: 'system', content: systemPrompt },
      ...(Array.isArray(messages) ? messages : [])
    ];

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://autismodireitos.vercel.app',
        'X-Title': 'Autismo e Direitos',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        messages: fullMessages,
        temperature: 0.6,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      let errJson;
      try {
        errJson = JSON.parse(errText);
      } catch (e) {
        // Formato não JSON
      }
      const message = errJson?.error?.message || errText || 'Erro ao processar requisição no OpenRouter.';
      return res.status(response.status).json({
        error: message,
        code: 'OPENROUTER_ERROR'
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Erro no handler da API:', error);
    return res.status(500).json({
      error: 'Erro interno ao processar a mensagem do assistente.',
      code: 'INTERNAL_ERROR',
      details: error.message
    });
  }
}
