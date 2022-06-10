export enum OpenStateActions {
  DRAWER_OPEN,
  DRAWER_CLOSE,
  DRAWER_TOGGLE,
  SETTINGS_OPEN,
  SETTINGS_CLOSE,
  SETTINGS_TOGGLE,
  SNACKBAR_OPEN,
  SNACKBAR_CLOSE,
  SNACKBAR_TOGGLE,
}

export interface OpenStateAction {
  type: OpenStateActions;
}

export interface OpenState {
  drawer: boolean;
  settings: boolean;
  snackbar: boolean;
}

export const openStateReducer = (openState: OpenState, action: OpenStateAction) => {
  switch (action.type) {
    case OpenStateActions.DRAWER_OPEN:
      return { ...openState, drawer: true };
    case OpenStateActions.DRAWER_CLOSE:
      return { ...openState, drawer: false };
    case OpenStateActions.DRAWER_TOGGLE:
      return { ...openState, drawer: !openState.drawer };
    case OpenStateActions.SETTINGS_OPEN:
      return { ...openState, settings: true };
    case OpenStateActions.SETTINGS_CLOSE:
      return { ...openState, settings: false };
    case OpenStateActions.SETTINGS_TOGGLE:
      return { ...openState, settings: !openState.settings };
    case OpenStateActions.SNACKBAR_OPEN:
      return { ...openState, snackbar: true };
    case OpenStateActions.SNACKBAR_CLOSE:
      return { ...openState, snackbar: false };
    case OpenStateActions.SNACKBAR_TOGGLE:
      return { ...openState, snackbar: !openState.snackbar };
    default:
      return openState;
  }
};
