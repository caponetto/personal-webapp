import { act, renderHook } from "@testing-library/react";
import Cookies from "js-cookie";
import { ColorMode } from "../../colors";
import { useCookie } from "../useCookie";

describe("useCookie", () => {
  beforeEach(() => {
    Cookies.set = jest.fn();
  });

  it("should save and return the default value when the cookie has not been set", () => {
    Cookies.get = jest.fn().mockImplementation(() => undefined);
    const { result } = renderHook(() => useCookie<ColorMode>("color_mode", "dark"));
    const [cookie] = result.current;
    expect(cookie).toEqual("dark");
    expect(Cookies.set).toHaveBeenCalled();
  });

  it("should save and return the default value when the stored value is invalid", () => {
    Cookies.get = jest.fn().mockImplementation(() => "not-json");
    const { result } = renderHook(() => useCookie<ColorMode>("color_mode", "dark"));
    const [cookie] = result.current;
    expect(cookie).toEqual("dark");
    expect(Cookies.set).toHaveBeenCalled();
  });

  it("should return the stored value", () => {
    Cookies.get = jest.fn().mockImplementation(() => JSON.stringify("light"));
    const { result } = renderHook(() => useCookie<ColorMode>("color_mode", "dark"));
    const [cookie] = result.current;
    expect(cookie).toEqual("light");
    expect(Cookies.set).not.toHaveBeenCalled();
  });

  it("should update the stored value", () => {
    Cookies.get = jest.fn().mockImplementation(() => JSON.stringify("light"));
    const { result } = renderHook(() => useCookie<ColorMode>("color_mode", "dark"));
    const [cookie, updateCookie] = result.current;
    expect(cookie).toEqual("light");
    act(() => {
      updateCookie("dark");
    });
    expect(Cookies.set).toHaveBeenCalled();
  });
});
