# Captura en Google Sheets

1. Crea una Google Sheet de HR y una pestaña llamada `respuestas`.
2. Abre **Extensiones → Apps Script** y pega el contenido de `google-apps-script/Code.gs`.
3. Pulsa **Implementar → Nueva implementación → Aplicación web**.
4. Configura **Ejecutar como: Yo** y **Quién tiene acceso: Cualquier persona**.
5. Copia la URL terminada en `/exec` en `CONFIG.sheetEndpoint` dentro de `config.js`.

El primer registro crea estos encabezados: `session_id`, `timestamp`, `equipo`, `idioma`, `inicio`, `características`, `arquetipo`, `sombra`, `radar_elecciones`, `radar_trampas`, `caso`, `caso_elección`, `timeouts`, `fin`.

La columna `session_id` es un identificador aleatorio del navegador, no un dato personal. Permite que cada checkpoint actualice la misma fila. La petición del navegador usa `no-cors`, por lo que la app nunca bloquea la sesión: conserva una copia local y deja disponible la exportación JSON.

Para publicar la app, sirve esta carpeta estática desde GitHub Pages, Netlify o Cloudflare Pages. Para probarla localmente, ejecuta `python -m http.server 8080` dentro de la carpeta del proyecto y abre `http://127.0.0.1:8080`.
