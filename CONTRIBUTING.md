# Contribuir

¡Gracias por ayudar! Este proyecto usa **pnpm** (nunca `npm`/`npx`: usa `pnpm` y `pnpm dlx`).

## Flujo

1. Crea una rama desde `main` (`feature/…`, `fix/…`, `docs/…`).
2. `pnpm install`
3. Haz tus cambios y comprueba: `pnpm typecheck && pnpm lint && pnpm test && pnpm build`.
4. Abre un Pull Request describiendo qué cambia y por qué.

## Añadir o editar una lección

- Archivo: `content/semanaN/dia-XX.mdx` con el frontmatter completo (ver cualquier lección existente).
- Estructura: Concepto → Paso a paso → Pruébalo en vivo → Error típico → Ejercicio (con solución) → Resumen.
- El código vive en `examples/src/dia-XX/` y se referencia con `<Playground file="…" />`, `<Snippet file="…" />` o `<Solution file="…" />`. Cada ejemplo debe ser **autocontenido** (un `export default` de un componente, sin imports relativos).
- En MDX, escribe `<`, `{` y `}` solo dentro de bloques de código o entre backticks.
- Enlaces de lectura solo a documentación oficial (react.dev, typescriptlang.org, vite.dev, nextjs.org…).
- Valida con `pnpm --filter web check:content`.

## Estilo

- TypeScript estricto, sin `any`.
- Tailwind CSS para el sitio (tokens en `web/app/globals.css`). Tema oscuro únicamente.
- Componentes de función y hooks; no se enseñan componentes de clase.
- Texto en español, tuteo y tono cercano.
