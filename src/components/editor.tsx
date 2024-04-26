"use client";
import { useOptions } from "@/store/options-context";
import { parse, stringify } from "comment-json";
import { Highlight, themes } from "prism-react-renderer";
import { TSConfigJSON } from "types-tsconfig";

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
      lib: ["es2022", "dom", "dom.iterable"],
    };
  } else {
    config.compilerOptions = {
      ...config.compilerOptions,
      lib: ["es2022"],
    };
  }

  let parsed = parse(JSON.stringify(config));

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
      value: " Base Options",
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
        ? "We are transpiling with TypeScript"
        : "We are not transpiling with TypeScript, so preserve our source code",
    },
  ];

  parsed.compilerOptions[Symbol.for("before:declaration")] = [
    {
      type: "LineComment",
      inline: false,
      value: " Type declarations for users of your library",
    },
  ];

  parsed.compilerOptions[Symbol.for("before:composite")] = [
    {
      type: "LineComment",
      inline: false,
      value:
        " We're building a library in a monorepo. These options help with caching builds and source maps for your users",
    },
  ];

  if (runsInDom) {
    parsed.compilerOptions[Symbol.for("before:lib")] = [
      {
        type: "LineComment",
        inline: false,
        value:
          "Our project will be ran in the browser, so include the proper dom libs",
      },
    ];
  }

  return (
    <div className="relative h-full z-10 -ml-10 col-span-3 bg-slate-800 rounded-xl shadow-lg xl:ml-0 dark:shadow-none dark:ring-1 dark:ring-inset dark:ring-white/10">
      <div className="relative flex justify-between items-center text-slate-400 text-xs leading-6">
        <div className="mt-2 flex-none text-sky-300 border-t border-b border-t-transparent border-b-sky-300 px-4 py-1 flex items-center">
          tsconfig.json
        </div>
        <div className="h-8 flex items-center pr-16">
          <div className="relative flex -mr-2">
            <button
              type="button"
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
          code={stringify(parsed, null, 2)}
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
  );
}
