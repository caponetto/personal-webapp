import { OpenStateActions, openStateReducer } from "../OpenState";

const DEFAULT_OPEN_STATE = {
  drawer: false,
  settings: false,
  snackbar: false,
};

describe("OpenState :: openStateReducer", () => {
  it("should open the drawer", () => {
    const updatedState = openStateReducer(DEFAULT_OPEN_STATE, {
      type: OpenStateActions.DRAWER_OPEN,
    });
    expect(updatedState.drawer).toBeTruthy();
  });

  it("should close the drawer", () => {
    const updatedState = openStateReducer(
      { ...DEFAULT_OPEN_STATE, drawer: true },
      {
        type: OpenStateActions.DRAWER_CLOSE,
      },
    );
    expect(updatedState.drawer).toBeFalsy();
  });

  it("should toggle the drawer", () => {
    let updatedState = openStateReducer(DEFAULT_OPEN_STATE, {
      type: OpenStateActions.DRAWER_TOGGLE,
    });
    expect(updatedState.drawer).toBeTruthy();
    updatedState = openStateReducer(updatedState, {
      type: OpenStateActions.DRAWER_TOGGLE,
    });
    expect(updatedState.drawer).toBeFalsy();
  });

  it("should open the settings", () => {
    const updatedState = openStateReducer(DEFAULT_OPEN_STATE, {
      type: OpenStateActions.SETTINGS_OPEN,
    });
    expect(updatedState.settings).toBeTruthy();
  });

  it("should close the settings", () => {
    const updatedState = openStateReducer(
      { ...DEFAULT_OPEN_STATE, settings: true },
      {
        type: OpenStateActions.SETTINGS_CLOSE,
      },
    );
    expect(updatedState.settings).toBeFalsy();
  });

  it("should toggle the settings", () => {
    let updatedState = openStateReducer(DEFAULT_OPEN_STATE, {
      type: OpenStateActions.SETTINGS_TOGGLE,
    });
    expect(updatedState.settings).toBeTruthy();
    updatedState = openStateReducer(updatedState, {
      type: OpenStateActions.SETTINGS_TOGGLE,
    });
    expect(updatedState.settings).toBeFalsy();
  });

  it("should open the snackbar", () => {
    const updatedState = openStateReducer(DEFAULT_OPEN_STATE, {
      type: OpenStateActions.SNACKBAR_OPEN,
    });
    expect(updatedState.snackbar).toBeTruthy();
  });

  it("should close the snackbar", () => {
    const updatedState = openStateReducer(
      { ...DEFAULT_OPEN_STATE, snackbar: true },
      {
        type: OpenStateActions.SNACKBAR_CLOSE,
      },
    );
    expect(updatedState.snackbar).toBeFalsy();
  });

  it("should toggle the snackbar", () => {
    let updatedState = openStateReducer(DEFAULT_OPEN_STATE, {
      type: OpenStateActions.SNACKBAR_TOGGLE,
    });
    expect(updatedState.snackbar).toBeTruthy();
    updatedState = openStateReducer(updatedState, {
      type: OpenStateActions.SNACKBAR_TOGGLE,
    });
    expect(updatedState.snackbar).toBeFalsy();
  });

  it("should return the given state if the action is invalid", () => {
    const updatedState = openStateReducer(DEFAULT_OPEN_STATE, {
      type: "invalid" as unknown as OpenStateActions,
    });
    expect(updatedState).toBe(DEFAULT_OPEN_STATE);
  });
});
