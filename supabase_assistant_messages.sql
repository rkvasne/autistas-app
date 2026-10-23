-- ==============================================================================
-- Autismo & Direitos — Tabela de Registro de Mensagens do Assistente (LGPD 180 dias)
-- ==============================================================================
-- Armazena anonimamente as mensagens e dúvidas dos cidadãos com o objetivo exclusivo
-- de melhoria pedagógica e aprimoramento do conteúdo do portal (Lei 13.709/2018).
--
-- Para aplicar no Supabase:
-- 1. Abra o painel do seu projeto no Supabase (https://app.supabase.com)
-- 2. Vá em "SQL Editor" -> "New query"
-- 3. Cole o script abaixo e clique em "Run"
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.assistant_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL,
    user_message TEXT NOT NULL,
    assistant_response TEXT,
    model TEXT DEFAULT 'openai/gpt-4o-mini',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Índices de performance para expiração e relatórios de curadoria
CREATE INDEX IF NOT EXISTS idx_assistant_messages_created ON public.assistant_messages (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_assistant_messages_expires ON public.assistant_messages (expires_at);
CREATE INDEX IF NOT EXISTS idx_assistant_messages_session ON public.assistant_messages (session_id);

-- Ativar Row Level Security (RLS)
ALTER TABLE public.assistant_messages ENABLE ROW LEVEL SECURITY;

-- Conceder permissões para os papéis padrão do Supabase
GRANT ALL ON public.assistant_messages TO postgres, service_role;
GRANT INSERT, SELECT ON public.assistant_messages TO anon, authenticated;

-- Política: Service Role pode ler e escrever tudo
DROP POLICY IF EXISTS "Service role full access on assistant_messages" ON public.assistant_messages;
CREATE POLICY "Service role full access on assistant_messages"
    ON public.assistant_messages
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Política: Chave pública anon pode apenas inserir novos registros (sem leitura pública de dúvidas de outros usuários)
DROP POLICY IF EXISTS "Anon can insert assistant_messages" ON public.assistant_messages;
CREATE POLICY "Anon can insert assistant_messages"
    ON public.assistant_messages
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Função opcional para limpeza automática de mensagens expiradas (> 180 dias)
CREATE OR REPLACE FUNCTION delete_expired_assistant_messages()
RETURNS void AS $$
BEGIN
    DELETE FROM public.assistant_messages
    WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Comentários normativos para conformidade LGPD
COMMENT ON TABLE public.assistant_messages IS 'Registro de mensagens enviadas ao Guia Virtual com retenção de 180 dias para melhoria contínua de conteúdo (LGPD Art. 7, V e IX)';
COMMENT ON COLUMN public.assistant_messages.session_id IS 'Identificador anônimo efêmero de sessão sem cruzamento com CPF ou identidade';
COMMENT ON COLUMN public.assistant_messages.expires_at IS 'Data limite estrita de expiração e expurgo programado (180 dias após o envio)';
