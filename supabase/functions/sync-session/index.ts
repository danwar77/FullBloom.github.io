import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return Response.json({ error: 'method_not_allowed' }, { status: 405, headers: corsHeaders });
  }

  const expectedToken = Deno.env.get('SYNC_TOKEN');
  const receivedToken = request.headers.get('authorization')?.replace('Bearer ', '');

  if (expectedToken && receivedToken !== expectedToken) {
    return Response.json({ error: 'unauthorized' }, { status: 401, headers: corsHeaders });
  }

  const payload = await request.json();
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );

  const { error } = await supabase.from('game_sessions').upsert(
    {
      team_alias: payload.teamAlias,
      lang: payload.lang,
      started_at: payload.startedAt,
      finished_at: payload.finishedAt ?? null,
      payload,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'team_alias,started_at' },
  );

  if (error) {
    return Response.json({ error: error.message }, { status: 500, headers: corsHeaders });
  }

  return Response.json({ ok: true }, { headers: corsHeaders });
});
