import { renderHook } from "@testing-library/react";
import { useTimeout } from "../../hooks/useTimeout";

describe("useTimeout", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("should call the callback on the right time", () => {
    const delay = 1000 * 60;
    const callback = jest.fn();

    renderHook(() => useTimeout(callback, delay));

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(delay);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should not call the callback when timeout is cancelled", () => {
    const delay = 1000 * 60;
    const callback = jest.fn();

    const { result } = renderHook(() => useTimeout(callback, delay));

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(delay * 0.9);
    result.current.clear();
    jest.advanceTimersByTime(delay);
    expect(callback).not.toHaveBeenCalled();
  });

  it("should call the callback on the right time after reset", () => {
    const delay = 1000 * 60;
    const callback = jest.fn();

    const { result } = renderHook(() => useTimeout(callback, delay));

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(delay * 0.9);
    result.current.reset();
    jest.advanceTimersByTime(delay * 0.9);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(delay * 0.1);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
