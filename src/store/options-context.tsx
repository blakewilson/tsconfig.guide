"use client";
import * as React from "react";

type Actions =
  | { type: "setStrictness"; payload: boolean }
  | { type: "setTSTranspiling"; payload: boolean }
  | { type: "setBuildingLib"; payload: boolean }
  | { type: "setBuildingLibMonorepo"; payload: boolean }
  | { type: "setRunsInDom"; payload: boolean }
  | { type: "setRemoveComments"; payload: boolean };
type Dispatch = (action: Actions) => void;
type State = {
  strictness: boolean;
  tsTranspiling: boolean;
  buildingLib: boolean;
  buildingLibMonorepo: boolean;
  runsInDom: boolean;
  removeComments: boolean;
};
type CountProviderProps = { children: React.ReactNode };

const OptionsStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function countReducer(state: State, action: Actions) {
  switch (action.type) {
    case "setStrictness": {
      return { ...state, strictness: action.payload } as State;
    }
    case "setTSTranspiling": {
      return { ...state, tsTranspiling: action.payload } as State;
    }
    case "setBuildingLib": {
      return { ...state, buildingLib: action.payload } as State;
    }
    case "setBuildingLibMonorepo": {
      return { ...state, buildingLibMonorepo: action.payload } as State;
    }
    case "setRunsInDom": {
      return { ...state, runsInDom: action.payload } as State;
    }
    case "setRemoveComments": {
      return { ...state, removeComments: action.payload } as State;
    }
    default: {
      throw new Error(`Unhandled action type: ${(action as any).type}`);
    }
  }
}

function OptionsProvider({ children }: CountProviderProps) {
  const [state, dispatch] = React.useReducer(countReducer, {
    strictness: true,
    tsTranspiling: false,
    buildingLib: false,
    buildingLibMonorepo: false,
    runsInDom: true,
    removeComments: false,
  } as State);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };
  return (
    <OptionsStateContext.Provider value={value}>
      {children}
    </OptionsStateContext.Provider>
  );
}

function useOptions() {
  const context = React.useContext(OptionsStateContext);
  if (context === undefined) {
    throw new Error("useOptions must be used within an OptionsProvider");
  }
  return context;
}

export { OptionsProvider, useOptions };
