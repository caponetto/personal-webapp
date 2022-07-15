import { act, renderHook } from "@testing-library/react-hooks/dom";
import { usePageActive } from "../../hooks/usePageActive";

describe("usePageActive", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("should return false right after creation", () => {
    const { result } = renderHook(() => usePageActive(0));
    expect(result.current).toBeFalsy();
  });

  it("should return true after delay", () => {
    const delay = 1000;
    const { result } = renderHook(() => usePageActive(delay));
    expect(result.current).toBeFalsy();
    act(() => {
      jest.advanceTimersByTime(delay);
    });
    expect(result.current).toBeTruthy();
  });
});
