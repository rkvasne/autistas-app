/**
 * Registra a mensagem enviada ao assistente para conformidade LGPD e ciclo de melhoria de 180 dias.
 * Tenta gravar no Supabase via REST API (se configurado); caso contrário, persiste em log estruturado serverless.
 */
async function recordInteractionLog({ sessionId, userMessage, assistantResponse, model, ipAddress, userAgent }) {
  const RETENTION_DAYS = 180;
  const createdAt = new Date().toISOString();
  const expiresAt = new Date(Date.now() + RETENTION_DAYS * 24 * 60 * 60 * 1000).toISOString();

  const logPayload = {
    event: 'ASSISTANT_CONVERSATION_RECORD',
    session_id: sessionId,
    user_message: (userMessage || '').trim(),
    assistant_response: (assistantResponse || '').trim().substring(0, 1500),
    model: model || 'openai/gpt-4o-mini',
    created_at: createdAt,
    expires_at: expiresAt,
    retention_days: RETENTION_DAYS,
    legal_basis: 'LGPD Art. 7, V (execução de serviço a pedido do titular) e IX (legítimo interesse para aprimoramento pedagógico)',
    metadata: {
      user_agent: (userAgent || '').substring(0, 120),
      ip_masked: ipAddress ? ipAddress.replace(/(\d+)\.(\d+)\.(\d+)\.(\d+)/, '$1.$2.***.***') : 'anonymized'
    }
  };

  // 1. Log Estruturado Serverless (garante retenção nos Vercel Logs / Log Drains)
  console.log(JSON.stringify(logPayload));

  // 2. Supabase / PostgreSQL (se as variáveis SUPABASE_URL e SUPABASE_ANON_KEY / SERVICE_ROLE_KEY existirem)
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const endpoint = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/assistant_messages`;
      const sbRes = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          session_id: sessionId,
          user_message: logPayload.user_message,
          assistant_response: logPayload.assistant_response,
          model: logPayload.model,
          created_at: createdAt,
          expires_at: expiresAt,
          metadata: logPayload.metadata
        }),
        signal: AbortSignal.timeout(3000)
      });

      if (!sbRes.ok) {
        const sbErr = await sbRes.text();
        console.warn('Aviso: Falha ao persistir no Supabase (fallback ativo):', sbErr);
      }
    } catch (sbError) {
      console.warn('Aviso: Erro de conexão com Supabase (fallback para logs ativo):', sbError.message);
    }
  }

  return { createdAt, expiresAt, retentionDays: RETENTION_DAYS };
}

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

    const { messages, apiKey: clientApiKey, model: clientModel, sessionId: clientSessionId } = req.body || {};

    // Identificador de sessão anônimo para auditoria LGPD
    const sessionId = clientSessionId || `anon_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const userAgent = req.headers['user-agent'] || '';
    const ipAddress = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '';

    // Extrai a última mensagem formulada pelo usuário
    const userMessages = (Array.isArray(messages) ? messages : []).filter(m => m.role === 'user');
    const lastUserMessage = userMessages.length > 0 ? userMessages[userMessages.length - 1].content : '';

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
    const assistantText = data?.choices?.[0]?.message?.content || '';

    // Registra a interação para conformidade e melhoria (180 dias)
    const retentionInfo = await recordInteractionLog({
      sessionId: sessionId,
      userMessage: lastUserMessage,
      assistantResponse: assistantText,
      model: model,
      ipAddress: ipAddress,
      userAgent: userAgent
    });

    data.retention = {
      days: 180,
      expiresAt: retentionInfo.expiresAt,
      sessionId: sessionId,
      legalBasis: 'LGPD Art. 7, V e IX'
    };

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
