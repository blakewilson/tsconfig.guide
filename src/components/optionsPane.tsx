"use client";
import { useOptions } from "@/store/options-context";
import CheckboxInput from "./checkbox";

export default function Options() {
  const {
    state: {
      strictness,
      tsTranspiling,
      buildingLib,
      buildingLibMonorepo,
      runsInDom,
      removeComments,
    },
    dispatch,
  } = useOptions();

  return (
    <>
      <div className="mb-12">
        <h2 className="text-4xl font-semibold mb-4 leading-normal text-white">
          Sick of scouring the TypeScript docs to setup your TSConfig?
        </h2>
        <p className="mb-4 text-2xl text-slate-500">
          I was too, so I built this tool to get you started with some smart
          defaults!
        </p>
        <p className="text-2xl text-slate-500">
          This TSConfig builder is heavily influenced by{" "}
          <a
            className="text-white "
            target="_blank"
            href="https://www.totaltypescript.com/tsconfig-cheat-sheet"
          >
            Matt Pocock&apos;s TSConfig Cheat Sheet
          </a>
          {". "}I highly encourage you to check it out for further explanation
          of these properties.
        </p>
      </div>
      <form>
        <CheckboxInput
          name="Use Strict Type Checking?"
          description="Toggle strict type checking so you can catch bugs early"
          checked={strictness}
          setChecked={(value: boolean) =>
            dispatch({
              type: "setStrictness",
              payload: value,
            })
          }
        />
        <CheckboxInput
          name={() => (
            <>
              Are you using{" "}
              <code className="inline bg-slate-800 px-1 py-0.5 font-bold text-white font-mono rounded">
                tsc
              </code>{" "}
              to transpile your TypeScript?
            </>
          )}
          description="Toggle if you using tsc to transpile your TypeScript, or not if you are not emitting files (i.e. using TypeScript for linting)"
          checked={tsTranspiling}
          setChecked={(value: boolean) =>
            dispatch({
              type: "setTSTranspiling",
              payload: value,
            })
          }
        />

        {tsTranspiling && (
          <>
            <CheckboxInput
              name="Are you building a library or something that will be used by others?"
              description="Toggle this option so you can get those sweeeeeet type declarations"
              checked={buildingLib}
              setChecked={(value: boolean) =>
                dispatch({
                  type: "setBuildingLib",
                  payload: value,
                })
              }
            />

            {buildingLib && (
              <CheckboxInput
                name="Are you building this library in a monorepo?"
                description="Toggling this will add source maps and other helpers for users of your library when debugging"
                checked={buildingLibMonorepo}
                setChecked={(value: boolean) =>
                  dispatch({
                    type: "setBuildingLibMonorepo",
                    payload: value,
                  })
                }
              />
            )}
          </>
        )}
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

        <CheckboxInput
          name="Remove Comments?"
          description="Toggle if you want to just copy the JSON."
          checked={removeComments}
          setChecked={(value: boolean) =>
            dispatch({
              type: "setRemoveComments",
              payload: value,
            })
          }
        />
      </form>
    </>
  );
}
