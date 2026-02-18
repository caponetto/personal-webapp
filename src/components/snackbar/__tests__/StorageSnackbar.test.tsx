import { fireEvent, render, screen } from "@testing-library/react";
import { StorageSnackbar } from "../StorageSnackbar";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("StorageSnackbar", () => {
  it("renders translated message when open", () => {
    render(<StorageSnackbar isOpen={true} onClose={jest.fn()} />);

    expect(screen.getByText("common:messages.storedPreferences")).toBeInTheDocument();
  });

  it("calls onClose when action button is clicked", () => {
    const onClose = jest.fn();
    render(<StorageSnackbar isOpen={true} onClose={onClose} />);

    fireEvent.click(screen.getByLabelText("literal:close"));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
