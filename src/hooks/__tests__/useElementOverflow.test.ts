import { act, renderHook } from "@testing-library/react";
import { useElementOverflow } from "../useElementOverflow";

function createElementSizeMock(dimensions: {
  clientHeight: number;
  scrollHeight: number;
  clientWidth: number;
  scrollWidth: number;
}) {
  const element = document.createElement("div");
  Object.defineProperty(element, "clientHeight", { configurable: true, value: dimensions.clientHeight });
  Object.defineProperty(element, "scrollHeight", { configurable: true, value: dimensions.scrollHeight });
  Object.defineProperty(element, "clientWidth", { configurable: true, value: dimensions.clientWidth });
  Object.defineProperty(element, "scrollWidth", { configurable: true, value: dimensions.scrollWidth });
  return element;
}

describe("useElementOverflow", () => {
  const originalRequestAnimationFrame = globalThis.requestAnimationFrame;
  const originalCancelAnimationFrame = globalThis.cancelAnimationFrame;
  const originalResizeObserver = globalThis.ResizeObserver;

  beforeEach(() => {
    globalThis.requestAnimationFrame = (callback: (time: number) => void): number => {
      callback(0);
      return 1;
    };
    globalThis.cancelAnimationFrame = jest.fn();
  });

  afterEach(() => {
    globalThis.requestAnimationFrame = originalRequestAnimationFrame;
    globalThis.cancelAnimationFrame = originalCancelAnimationFrame;
    (globalThis as unknown as { ResizeObserver?: typeof ResizeObserver }).ResizeObserver = originalResizeObserver;
  });

  it("returns true when the element overflows", () => {
    const { result, rerender } = renderHook(({ dependencyKey }) => useElementOverflow<HTMLElement>(dependencyKey), {
      initialProps: { dependencyKey: "initial" },
    });

    const overflowingElement = createElementSizeMock({
      clientHeight: 40,
      scrollHeight: 80,
      clientWidth: 200,
      scrollWidth: 200,
    });

    act(() => {
      result.current.elementRef.current = overflowingElement;
      rerender({ dependencyKey: "updated" });
    });

    expect(result.current.isOverflowing).toBe(true);
  });

  it("returns false when the element does not overflow", () => {
    const { result, rerender } = renderHook(({ dependencyKey }) => useElementOverflow<HTMLElement>(dependencyKey), {
      initialProps: { dependencyKey: "initial" },
    });

    const nonOverflowingElement = createElementSizeMock({
      clientHeight: 80,
      scrollHeight: 80,
      clientWidth: 200,
      scrollWidth: 200,
    });

    act(() => {
      result.current.elementRef.current = nonOverflowingElement;
      rerender({ dependencyKey: "updated" });
    });

    expect(result.current.isOverflowing).toBe(false);
  });

  it("reacts to resize observer updates", () => {
    let resizeCallback: ((entries: unknown[], observer: unknown) => void) | undefined;
    class MockResizeObserver {
      observe = jest.fn();
      disconnect = jest.fn();

      constructor(callback: (entries: unknown[], observer: unknown) => void) {
        resizeCallback = callback;
      }
    }

    globalThis.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

    const { result, rerender } = renderHook(({ dependencyKey }) => useElementOverflow<HTMLElement>(dependencyKey), {
      initialProps: { dependencyKey: "initial" },
    });

    const element = createElementSizeMock({
      clientHeight: 80,
      scrollHeight: 80,
      clientWidth: 200,
      scrollWidth: 200,
    });

    act(() => {
      result.current.elementRef.current = element;
      rerender({ dependencyKey: "updated" });
    });

    expect(result.current.isOverflowing).toBe(false);

    Object.defineProperty(element, "scrollWidth", { configurable: true, value: 240 });

    act(() => {
      resizeCallback?.([], {});
    });

    expect(result.current.isOverflowing).toBe(true);
  });

  it("falls back to window resize when ResizeObserver is unavailable", () => {
    (globalThis as unknown as { ResizeObserver?: typeof ResizeObserver }).ResizeObserver = undefined;

    const { result, rerender } = renderHook(({ dependencyKey }) => useElementOverflow<HTMLElement>(dependencyKey), {
      initialProps: { dependencyKey: "initial" },
    });

    const element = createElementSizeMock({
      clientHeight: 80,
      scrollHeight: 80,
      clientWidth: 200,
      scrollWidth: 200,
    });

    act(() => {
      result.current.elementRef.current = element;
      rerender({ dependencyKey: "updated" });
    });

    expect(result.current.isOverflowing).toBe(false);

    Object.defineProperty(element, "scrollHeight", { configurable: true, value: 120 });

    act(() => {
      globalThis.window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.isOverflowing).toBe(true);
  });
});
