"use client";
import React from "react";
import { Highlight, themes } from "prism-react-renderer";
import { useOptions } from "@/store/options-context";

type EditorProps = {};

export default function Editor(props: EditorProps) {
  const {
    state: {
      strictness,
      tsTranspiling,
      buildingLib,
      buildingLibMonorepo,
      runsInDom,
    },
  } = useOptions();

  let tsconfig = `
  {
    "compilerOptions": {
      /* Base Options: */
      "esModuleInterop": true,
      "skipLibCheck": true,
      "target": "es2022",
      "allowJs": true,
      "resolveJsonModule": true,
      "moduleDetection": "force",
      "isolatedModules": true,
      "verbatimModuleSyntax": true,

      ${
        strictness
          ? `
      /* Strictness */
      "strict": true,
      "noUncheckedIndexedAccess": true,
      "noImplicitOverride": true,
      `
          : ""
      }

      ${
        tsTranspiling
          ? `
      /* If transpiling with TypeScript: */
      "module": "NodeNext",
      "outDir": "dist",
      "sourceMap": true,
      `
          : ""
      }

      ${
        buildingLib
          ? `
      /* AND if you're building for a library: */
      "declaration": true,
      `
          : ""
      }

      ${
        buildingLibMonorepo
          ? `
      /* AND if you're building for a library in a monorepo: */
      "composite": true,
      "declarationMap": true,
      `
          : ""
      }

      ${
        !tsTranspiling
          ? `
      /* If NOT transpiling with TypeScript: */
      "module": "preserve",
      "noEmit": true,
      `
          : ""
      }

      ${
        runsInDom
          ? `
      /* If your code runs in the DOM: */
      "lib": ["es2022", "dom", "dom.iterable"],
      `
          : ""
      }

      ${
        !runsInDom
          ? `
      /* If your code doesn't run in the DOM: */
      "lib": ["es2022"]
      `
          : ""
      }
    }
  }
  `;
  return (
    <div className="border border-white">
      <Highlight theme={themes.synthwave84} code={tsconfig} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span>{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
