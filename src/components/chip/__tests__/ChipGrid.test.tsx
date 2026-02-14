import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { fireEvent, render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../jest/I18nForTests";
import { ChipGrid } from "../ChipGrid";

jest.mock("@mui/material/useMediaQuery", () => jest.fn());
const mockUseMediaQuery = useMediaQuery as jest.MockedFunction<typeof useMediaQuery>;

function renderChipGrid(items: string[]) {
  return render(
    <ThemeProvider theme={createTheme()}>
      <I18nextProvider i18n={i18n}>
        <ChipGrid groupName="skills" items={items} />
      </I18nextProvider>
    </ThemeProvider>,
  );
}

describe("ChipGrid", () => {
  beforeEach(() => {
    mockUseMediaQuery.mockReset();
  });

  it("collapses toolbox chips on small screens and toggles show more/less", () => {
    mockUseMediaQuery
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false);

    const items = Array.from({ length: 30 }, (_, index) => `Skill ${String(index + 1).padStart(2, "0")}`);
    renderChipGrid(items);

    expect(screen.getByText("toolboxShowMore")).toBeInTheDocument();
    expect(screen.queryByText("Skill 15")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("toolboxShowMore"));

    expect(screen.getByText("toolboxShowLess")).toBeInTheDocument();
    expect(screen.getByText("Skill 15")).toBeInTheDocument();
  });

  it("does not render toggle button when item count is under visible limit", () => {
    mockUseMediaQuery
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false);

    renderChipGrid(["Git", "React", "TypeScript"]);

    expect(screen.queryByText("toolboxShowMore")).not.toBeInTheDocument();
    expect(screen.getByText("Git")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });
});
