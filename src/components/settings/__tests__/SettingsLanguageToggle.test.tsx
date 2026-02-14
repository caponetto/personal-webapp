import { fireEvent, render, screen } from "@testing-library/react";
import { TFunction } from "i18next";
import { SupportedLanguages } from "../../../i18n";
import { SettingsLanguageToggle } from "../SettingsLanguageToggle";

jest.mock("../../../i18n", () => ({
  SupportedLanguages: {
    English: "en",
    Portuguese: "pt",
    Spanish: "es",
  },
}));

describe("SettingsLanguageToggle", () => {
  it("calls onChange with selected language", () => {
    const onChange = jest.fn();
    const t = ((key: string) => key) as unknown as TFunction;

    render(<SettingsLanguageToggle value={SupportedLanguages.English} onChange={onChange} t={t} />);

    fireEvent.click(screen.getByTestId("language-toggle-pt"));
    fireEvent.click(screen.getByTestId("language-toggle-es"));

    expect(onChange).toHaveBeenNthCalledWith(1, SupportedLanguages.Portuguese);
    expect(onChange).toHaveBeenNthCalledWith(2, SupportedLanguages.Spanish);
  });
});
