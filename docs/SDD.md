# SDD · La Gema del Tiempo

## Objetivo

Web app móvil para guiar equipos por tres actos de una dinámica de 90 minutos, sin puntuación visible, con captura anónima y resiliencia ante red intermitente.

## Stack

- Vite + React + TypeScript para una app web móvil ligera.
- CSS tokenizado para el sistema visual premium temporal.
- Zod para validar la capa de contenido.
- LocalStorage en v1 para reanudar partida y outbox offline.
- Supabase Edge Function + Postgres para captura anónima.

## Contratos

- Todo contenido editable vive fuera de componentes visuales.
- El flujo nunca bloquea la partida por fallo de red.
- El resumen final permite sincronizar o exportar respaldo JSON.
- La UI no muestra puntos, ranking ni aciertos visibles de liderazgo.

## Fase siguiente

Migrar `src/content.ts` a JSON externo validado, conectar Supabase real y sustituir placeholders por contenido final de producto.
