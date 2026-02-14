import { fireEvent, render, screen } from "@testing-library/react";
import { TFunction } from "i18next";
import { SettingsModeToggle } from "../SettingsModeToggle";

describe("SettingsModeToggle", () => {
  it("calls onChange with selected theme mode", () => {
    const onChange = jest.fn();
    const t = ((key: string) => key) as unknown as TFunction;

    render(<SettingsModeToggle colorMode="light" onChange={onChange} t={t} />);

    fireEvent.click(screen.getByTestId("theme-toggle-dark"));

    expect(onChange).toHaveBeenNthCalledWith(1, "dark");
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
