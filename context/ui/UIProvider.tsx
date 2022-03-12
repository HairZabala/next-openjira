import { FC, useReducer } from "react";
import { UIContext, uiReducer } from "./";

export interface UIState {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

const initialState: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
};

export const UIProvider: FC = ({ children }: any) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const openSideMenu = () => {
    dispatch({
      type: "UI - Open Sidebar",
    });
  };

  const closeSideMenu = () => {
    dispatch({
      type: "UI - Close Sidebar",
    });
  };

  const setIsAddingEntry = (isAddingEntry: boolean) => {
    dispatch({
      type: "UI - Adding Entry",
      payload: isAddingEntry
    });
  }

  const startDragging = () => {
    dispatch({
      type: 'UI - Start Dragging'
    })
  }

  const endDragging = () => {
    dispatch({
      type: 'UI - End Dragging'
    })
  }

  return (
    <UIContext.Provider
      value={{
        ...state,
        openSideMenu,
        closeSideMenu,
        setIsAddingEntry,
        startDragging,
        endDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
