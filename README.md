# React para torpes

Curso **gratuito** en español de **React 19 + TypeScript** en 30 días, con un bonus de **Next.js**. Incluye una landing interactiva, lecciones con editor en vivo, ejercicios con solución y ejemplos de código que se compilan y prueban en CI.

> Un concepto por día · código que corre en el navegador · errores típicos explicados.

## El plan

| Semana | Tema |
| --- | --- |
| 1 | Fundamentos: Vite, JSX, props, estado y eventos |
| 2 | Listas, formularios, elevación de estado, composición y primer proyecto |
| 3 | Hooks (`useEffect`, `useReducer`, `useContext`, `useMemo`…) y proyecto |
| 4 | React Router, Redux Toolkit, APIs, tests y proyecto final |
| 5 (bonus) | De Vite a Next.js: App Router, Server Components y despliegue |

Las lecciones están en [`content/`](content) (MDX) y los ejemplos ejecutables en [`examples/`](examples).

## Estructura del repo

```
content/     lecciones en MDX (content/semanaN/dia-XX.mdx)
examples/    proyecto Vite con todos los ejemplos (y tests con Vitest)
web/         sitio Next.js (App Router, export estático) + Tailwind CSS
```

Los fragmentos de código que ves en el sitio se leen directamente de `examples/src`, así que nunca se desactualizan: si un ejemplo no compila, falla el CI.

## Empezar

Requisitos: Node 20+ y [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev            # sitio en http://localhost:3000
pnpm examples       # galería de ejemplos con Vite
pnpm typecheck      # TypeScript en todo el monorepo
pnpm lint
pnpm test           # tests de los ejemplos y del sitio
pnpm build          # genera web/out (sitio estático)
```

Para validar el contenido (frontmatter, MDX, ejemplos referenciados):

```bash
pnpm --filter web check:content
```

## Despliegue

El sitio se exporta como HTML estático. El workflow [`deploy.yml`](.github/workflows/deploy.yml) lo publica en GitHub Pages con `NEXT_PUBLIC_BASE_PATH=/react-para-torpes`.

## Contribuir

Lee [CONTRIBUTING.md](CONTRIBUTING.md). Las correcciones de contenido y los nuevos ejemplos son bienvenidos.

## Licencia

[MIT](LICENSE)
