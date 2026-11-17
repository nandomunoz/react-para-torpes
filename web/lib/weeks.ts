export type WeekMeta = {
  n: number;
  title: string;
  tagline: string;
  /** Color del lomo del libro en el estante */
  spine: string;
};

export const WEEKS: WeekMeta[] = [
  { n: 1, title: "Fundamentos", tagline: "Vite, JSX, props, estado y eventos", spine: "bg-sun text-ink" },
  { n: 2, title: "Profundizando", tagline: "Listas, formularios y composición", spine: "bg-lime text-ink" },
  { n: 3, title: "Hooks y contexto", tagline: "useEffect, useReducer, useMemo y más", spine: "bg-paper text-ink" },
  { n: 4, title: "Avanzado y proyecto", tagline: "Router, Redux Toolkit, API, tests", spine: "bg-sun text-ink" },
  { n: 5, title: "Bonus: Next.js", tagline: "De Vite a Next.js y despliegue", spine: "bg-lime text-ink" },
];

export const weekByN = (n: number) => WEEKS.find((w) => w.n === n);
