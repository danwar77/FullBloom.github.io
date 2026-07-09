# Supabase · Captura anónima

## Modelo

La app envía una sesión completa a una Edge Function. La función valida un token simple de evento y escribe en Postgres usando variables seguras del entorno de Supabase.

## Privacidad

Se guarda alias de equipo, idioma, decisiones, trampas, timeouts y seguimiento. No se guardan nombres reales, correos ni datos personales.

## Variables

Frontend:

- `VITE_SUPABASE_SYNC_URL`
- `VITE_SUPABASE_SYNC_TOKEN`

Edge Function:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SYNC_TOKEN`

## Verificación esperada

1. Crear tabla con la migración.
2. Desplegar la función `sync-session`.
3. Configurar URL y token en frontend.
4. Completar partida, sincronizar y comprobar fila en `game_sessions`.
