"use client";
import { useState } from "react";
import CheckboxInput from "./checkbox";
import { useOptions } from "@/store/options-context";

export default function Options() {
  const {
    state: {
      strictness,
      tsTranspiling,
      buildingLib,
      buildingLibMonorepo,
      runsInDom,
    },
    dispatch,
  } = useOptions();

  return (
    <form>
      <CheckboxInput
        name="Strictness"
        description="How strict do you want it?"
        checked={strictness}
        setChecked={(value: boolean) =>
          dispatch({
            type: "setStrictness",
            payload: value,
          })
        }
      />
      <CheckboxInput
        name="Are you Transpiling with TypeScript?"
        description="Most likely yes"
        checked={tsTranspiling}
        setChecked={(value: boolean) =>
          dispatch({
            type: "setTSTranspiling",
            payload: value,
          })
        }
      />
      <CheckboxInput
        name="Are you building for a library?"
        description="If so, we'll add type declarations."
        checked={buildingLib}
        setChecked={(value: boolean) =>
          dispatch({
            type: "setBuildingLib",
            payload: value,
          })
        }
      />
      <CheckboxInput
        name="Are you building this library in a monorepo?"
        description="Explanation here."
        checked={buildingLibMonorepo}
        setChecked={(value: boolean) =>
          dispatch({
            type: "setBuildingLibMonorepo",
            payload: value,
          })
        }
      />
      <CheckboxInput
        name="Will your code run in the DOM?"
        description="If you are building for a frontend library like React, Next.js, etc. Select this. If you are building for the backend, you can leave this untoggled."
        checked={runsInDom}
        setChecked={(value: boolean) =>
          dispatch({
            type: "setRunsInDom",
            payload: value,
          })
        }
      />
    </form>
  );
}
