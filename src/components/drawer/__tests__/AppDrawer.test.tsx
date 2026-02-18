import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { AppDrawer } from "../AppDrawer";
import { OpenStateActions } from "../../../context/OpenState";

const mockDispatch = jest.fn();

jest.mock("../../../context/AppContext", () => ({
  useUiStateContext: () => ({
    openState: { drawer: false, settings: false, snackbar: false },
    openStateDispatch: mockDispatch,
  }),
}));

jest.mock("../DrawerContent", () => ({
  DrawerContent: () => <div data-testid="drawer-content">content</div>,
}));

jest.mock("@mui/material/SwipeableDrawer", () => ({
  __esModule: true,
  default: (props: { children: React.ReactNode; "data-testid": string; onOpen: () => void; onClose: () => void }) => (
    <div data-testid={props["data-testid"]}>
      <button data-testid="temp-open" onClick={props.onOpen} />
      <button data-testid="temp-close" onClick={props.onClose} />
      {props.children}
    </div>
  ),
}));

jest.mock("@mui/material/Drawer", () => ({
  __esModule: true,
  default: (props: { children: React.ReactNode; "data-testid": string }) => (
    <div data-testid={props["data-testid"]}>{props.children}</div>
  ),
}));

describe("AppDrawer", () => {
  beforeEach(() => {
    mockDispatch.mockReset();
  });

  it("renders temporary drawer on mobile", () => {
    render(<AppDrawer drawerWidth={300} drawerItemWidth={284} />);

    expect(screen.getByTestId("temporary-drawer")).toBeInTheDocument();
    expect(screen.queryByTestId("permanent-drawer")).not.toBeInTheDocument();
    expect(screen.getAllByTestId("drawer-content")).toHaveLength(1);
  });

  it("dispatches open and close actions on temporary drawer callbacks", () => {
    render(<AppDrawer drawerWidth={300} drawerItemWidth={284} />);

    fireEvent.click(screen.getByTestId("temp-open"));
    fireEvent.click(screen.getByTestId("temp-close"));

    expect(mockDispatch).toHaveBeenNthCalledWith(1, { type: OpenStateActions.DRAWER_OPEN });
    expect(mockDispatch).toHaveBeenNthCalledWith(2, { type: OpenStateActions.DRAWER_CLOSE });
  });
});
