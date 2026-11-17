import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useProgress } from "@/lib/progress";

describe("useProgress", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("marca y desmarca una lección como hecha", () => {
    const { result } = renderHook(() => useProgress());
    expect(result.current.progress.done).toEqual([]);

    act(() => result.current.toggleDone("dia-01"));
    expect(result.current.progress.done).toEqual(["dia-01"]);
    expect(JSON.parse(window.localStorage.getItem("rpt:progress")!).done).toEqual(["dia-01"]);

    act(() => result.current.toggleDone("dia-01"));
    expect(result.current.progress.done).toEqual([]);
  });

  it("guarda los criterios de ejercicio por lección", () => {
    const { result } = renderHook(() => useProgress());
    act(() => result.current.toggleCriterion("dia-04", 1));
    act(() => result.current.toggleCriterion("dia-04", 2));
    expect(result.current.progress.exercises["dia-04"]).toEqual([1, 2]);
    act(() => result.current.toggleCriterion("dia-04", 1));
    expect(result.current.progress.exercises["dia-04"]).toEqual([2]);
  });

  it("reinicia todo el progreso", () => {
    const { result } = renderHook(() => useProgress());
    act(() => result.current.toggleDone("dia-02"));
    act(() => result.current.reset());
    expect(result.current.progress.done).toEqual([]);
  });
});
