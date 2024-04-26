"use client";
import { useOptions } from "@/store/options-context";
import { parse, stringify } from "comment-json";
import { Highlight, themes } from "prism-react-renderer";
import { useRef, useState } from "react";
import Confetti from "react-confetti";
import { TSConfigJSON } from "types-tsconfig";

type EditorProps = {};

export default function Editor(props: EditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  const [isExploding, setIsExploding] = useState(false);
  const {
    state: {
      strictness,
      tsTranspiling,
      buildingLib,
      buildingLibMonorepo,
      runsInDom,
      removeComments,
    },
  } = useOptions();

  let config: TSConfigJSON = {
    compilerOptions: {
      esModuleInterop: true,
      skipLibCheck: true,
      target: "es2022",
      allowJs: true,
      resolveJsonModule: true,
      moduleDetection: "force",
      isolatedModules: true,
      verbatimModuleSyntax: true,
    },
    include: ["**/*.ts", "**/*.tsx"],
    exclude: ["node_modules"],
  };

  if (strictness) {
    config.compilerOptions = {
      ...config.compilerOptions,
      strict: true,
      noUncheckedIndexedAccess: true,
      noImplicitOverride: true,
    };
  }

  if (tsTranspiling) {
    config.compilerOptions = {
      ...config.compilerOptions,
      module: "NodeNext",
      outDir: "dist",
    };
  } else {
    config.compilerOptions = {
      ...config.compilerOptions,
      module: "preserve",
      noEmit: true,
    };
  }

  if (buildingLib) {
    config.compilerOptions = {
      ...config.compilerOptions,
      declaration: true,
    };
  }

  if (buildingLibMonorepo) {
    config.compilerOptions = {
      ...config.compilerOptions,
      composite: true,
      declarationMap: true,
      sourceMap: true,
    };
  }

  if (runsInDom) {
    config.compilerOptions = {
      ...config.compilerOptions,
      lib: ["esnext", "dom", "dom.iterable"],
    };
  } else {
    config.compilerOptions = {
      ...config.compilerOptions,
      lib: ["esnext"],
    };
  }

  let parsed = parse(JSON.stringify(config));

  if (!parsed) {
    return null;
  }

  if (!removeComments) {
    parsed[Symbol.for("before:include")] = [
      {
        type: "LineComment",
        inline: false,
        value: " Include the necessary files for your project",
      },
    ];

    parsed.compilerOptions[Symbol.for("before:esModuleInterop")] = [
      {
        type: "LineComment",
        inline: false,
        value: " Base Options recommended for all projects",
      },
    ];

    parsed.compilerOptions[Symbol.for("before:strict")] = [
      {
        type: "LineComment",
        inline: false,
        value: " Enable strict type checking so you can catch bugs early",
      },
    ];

    parsed.compilerOptions[Symbol.for("before:module")] = [
      {
        type: "LineComment",
        inline: false,
        value: tsTranspiling
          ? "Transpile our TypeScript code to JavaScript"
          : "We are not transpiling, so preserve our source code and do not emit files",
      },
    ];

    parsed.compilerOptions[Symbol.for("before:declaration")] = [
      {
        type: "LineComment",
        inline: false,
        value: "Emit type declarations",
      },
    ];

    parsed.compilerOptions[Symbol.for("before:composite")] = [
      {
        type: "LineComment",
        inline: false,
        value:
          " Emit source maps and enable the composite option for monorepos",
      },
    ];

    if (runsInDom) {
      parsed.compilerOptions[Symbol.for("before:lib")] = [
        {
          type: "LineComment",
          inline: false,
          value: " Include the DOM types",
        },
      ];
    }
  }

  const prettyTSConfig = stringify(parsed, null, 2);

  return (
    <>
      <div
        ref={editorRef}
        className="relative overflow-hidden lg:h-full z-10 lg:-ml-10 col-span-3 bg-[#011627] rounded-xl shadow-lg xl:ml-0 dark:shadow-none dark:ring-1 dark:ring-inset dark:ring-white/10"
      >
        <div className="relative flex justify-between items-center bg-[#0a2030] border-b border-b-[#1d3344] text-slate-400 text-md leading-6">
          <div className="my-2 flex-none text-slate-300 px-4 py-2 flex items-center">
            tsconfig.json
          </div>
          <div className="h-8 flex items-center pr-16">
            <div className="relative flex -mr-2">
              <button
                type="button"
                onClick={() => {
                  setIsExploding(true);
                  navigator.clipboard.writeText(prettyTSConfig);
                  setTimeout(() => {
                    setIsExploding(false);
                  }, 6000);
                }}
                className="text-slate-500 hover:text-slate-400"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                  className="w-8 h-8"
                >
                  <path d="M13 10.75h-1.25a2 2 0 0 0-2 2v8.5a2 2 0 0 0 2 2h8.5a2 2 0 0 0 2-2v-8.5a2 2 0 0 0-2-2H19"></path>
                  <path d="M18 12.25h-4a1 1 0 0 1-1-1v-1.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.5a1 1 0 0 1-1 1ZM13.75 16.25h4.5M13.75 19.25h4.5"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="relative h-full overflow-y-auto">
          <Highlight
            theme={themes.nightOwl}
            code={prettyTSConfig}
            language="tsx"
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className="h-full" style={style}>
                <code className="block min-w-full p-5">
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  ))}
                </code>
              </pre>
            )}
          </Highlight>
        </div>
      </div>
      {isExploding && (
        <Confetti
          style={{ zIndex: 100 }}
          width={editorRef.current?.clientWidth}
          height={editorRef.current?.clientHeight}
          gravity={0.25}
          numberOfPieces={400}
          recycle={false}
        />
      )}
    </>
  );
}
