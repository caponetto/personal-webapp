import { act, renderHook } from "@testing-library/react";
import { ColorMode } from "../../colors";
import { useLocalStorage } from "../useLocalStorage";

describe("useLocalStorage", () => {
  const originalLocalStorage = globalThis.localStorage;

  beforeEach(() => {
    globalThis.localStorage.clear();
  });

  afterEach(() => {
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: originalLocalStorage,
    });
    jest.restoreAllMocks();
  });

  it("should save and return the default value when the key has not been set", () => {
    const { result } = renderHook(() => useLocalStorage<ColorMode>("color_mode", "dark"));
    const [storedValue] = result.current;

    expect(storedValue).toEqual("dark");
    expect(globalThis.localStorage.getItem("color_mode")).toEqual(JSON.stringify("dark"));
  });

  it("should save and return the default value when the stored value is invalid", () => {
    globalThis.localStorage.setItem("color_mode", "not-json");
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => undefined);

    const { result } = renderHook(() => useLocalStorage<ColorMode>("color_mode", "dark"));
    const [storedValue] = result.current;

    expect(storedValue).toEqual("dark");
    expect(globalThis.localStorage.getItem("color_mode")).toEqual(JSON.stringify("dark"));
    expect(consoleSpy).toHaveBeenCalledWith('Cannot parse localStorage key "color_mode"; using default value instead');
  });

  it("should return the stored value", () => {
    globalThis.localStorage.setItem("color_mode", JSON.stringify("light"));

    const { result } = renderHook(() => useLocalStorage<ColorMode>("color_mode", "dark"));
    const [storedValue] = result.current;

    expect(storedValue).toEqual("light");
  });

  it("should update the stored value", () => {
    globalThis.localStorage.setItem("color_mode", JSON.stringify("light"));

    const { result } = renderHook(() => useLocalStorage<ColorMode>("color_mode", "dark"));
    const [storedValue, updateStoredValue] = result.current;

    expect(storedValue).toEqual("light");

    act(() => {
      updateStoredValue("dark");
    });

    expect(globalThis.localStorage.getItem("color_mode")).toEqual(JSON.stringify("dark"));
  });

  it("returns default value when localStorage is unavailable", () => {
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      get: () => undefined,
    });

    const { result } = renderHook(() => useLocalStorage<ColorMode>("color_mode", "dark"));

    expect(result.current[0]).toEqual("dark");
  });

  it("returns default value when setting default value fails", () => {
    const mockStorage = {
      getItem: jest.fn(() => null),
      setItem: jest.fn(() => {
        throw new Error("storage blocked");
      }),
      removeItem: jest.fn(),
      clear: jest.fn(),
    };

    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: mockStorage,
    });

    const { result } = renderHook(() => useLocalStorage<ColorMode>("color_mode", "dark"));

    expect(result.current[0]).toEqual("dark");
  });

  it("updates React state even when persistence write fails", () => {
    const failingSetItem = jest.fn();
    failingSetItem.mockImplementationOnce(() => undefined);
    failingSetItem.mockImplementationOnce(() => undefined);
    failingSetItem.mockImplementation(() => {
      throw new Error("quota exceeded");
    });

    const mockStorage = {
      getItem: jest.fn(() => null),
      setItem: failingSetItem,
      removeItem: jest.fn(),
      clear: jest.fn(),
    };

    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: mockStorage,
    });

    const { result } = renderHook(() => useLocalStorage<ColorMode>("color_mode", "light"));

    act(() => {
      result.current[1]("dark");
    });

    expect(result.current[0]).toEqual("dark");
  });
});
