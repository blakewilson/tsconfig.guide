"use client";
import { useOptions } from "@/store/options-context";
import { Transition } from "@headlessui/react";
import {
  CommentArray,
  CommentJSONValue,
  CommentObject,
  CommentSymbol,
  CommentToken,
  parse,
  stringify,
} from "comment-json";
import { Highlight, themes } from "prism-react-renderer";
import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import { TsConfigJson } from "type-fest";

function writeCommentBeforeLine(
  parsedConfig: CommentJSONValue,
  symbolKey: string,
  comment: string
) {
  (parsedConfig as CommentArray<string>)[
    Symbol.for(symbolKey) as CommentSymbol
  ] = [
    {
      type: "LineComment",
      inline: false,
      value: ` ${comment}`,
    } as CommentToken,
  ];
}

export default function Editor() {
  const editorRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<HTMLDivElement[]>([])
  const [lines, setLines] = useState<Map<string, HTMLDivElement>>(new Map<string, HTMLDivElement>())
  const [isExploding, setIsExploding] = useState(false);
  const [showCopyText, setShowCopyText] = useState(false);
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

  let config: TsConfigJson = {
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

  if (tsTranspiling && buildingLib) {
    config.compilerOptions = {
      ...config.compilerOptions,
      declaration: true,
    };
  }

  if (tsTranspiling && buildingLib && buildingLibMonorepo) {
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

  let parsed = parse(JSON.stringify(config)) as CommentObject;

  if (!parsed) {
    return null;
  }

  if (!removeComments) {
    writeCommentBeforeLine(
      parsed,
      "before:include",
      "Include the necessary files for your project"
    );

    writeCommentBeforeLine(
      parsed.compilerOptions,
      "before:esModuleInterop",
      "Base Options recommended for all projects"
    );

    if (strictness) {
      writeCommentBeforeLine(
        parsed.compilerOptions,
        "before:strict",
        "Enable strict type checking so you can catch bugs early"
      );
    }

    if (tsTranspiling) {
      writeCommentBeforeLine(
        parsed.compilerOptions,
        "before:module",
        "Transpile our TypeScript code to JavaScript"
      );

      if (buildingLib) {
        writeCommentBeforeLine(
          parsed.compilerOptions,
          "before:declaration",
          "Emit type declarations"
        );

        if (buildingLibMonorepo) {
          writeCommentBeforeLine(
            parsed.compilerOptions,
            "before:composite",
            "Emit source maps and enable the composite option for monorepos"
          );
        }
      }
    } else {
      writeCommentBeforeLine(
        parsed.compilerOptions,
        "before:module",
        "We are not transpiling, so preserve our source code and do not emit files"
      );
    }

    if (runsInDom) {
      writeCommentBeforeLine(
        parsed.compilerOptions,
        "before:lib",
        "Include the DOM types"
      );
    }
  }

  const prettyTSConfig = stringify(parsed, null, 2);

  useEffect(() => {
      let map = new Map<string, HTMLDivElement>()

      for(let i = 0; i < lineRefs.current.length; i++) {
        map.set(lineRefs.current[i].innerText, lineRefs.current[i])
      }

      setLines(map)
  }, [])

  useEffect(() => {
    if(lines.size === 0) {
      return;
    }

    let newLines: HTMLDivElement[] = []

    let newMap = new Map<string, HTMLDivElement>()
    for(let i = 0; i < lineRefs.current.length; i++) {
      newMap.set(lineRefs.current[i].innerText, lineRefs.current[i])
    }

    newMap.forEach((value, key) => {
      if(!lines.has(key)) {
        newLines.push(value)
      }
    })


    for(let i = 0; i < newLines.length; i++) {
      newLines[i].classList.add('animate-fade')
    }

    setTimeout(() => {
      for(let i = 0; i < newLines.length; i++) {
        newLines[i].classList.remove('animate-fade')
      }
    }, 2500)

    setLines(newMap)
  }, [
      strictness,
      tsTranspiling,
      buildingLib,
      buildingLibMonorepo,
      runsInDom,
      removeComments,
  ])

  return (
    <>
      <div
        ref={editorRef}
        className="m-auto relative bg-[#011627] overflow-hidden rounded-xl shadow-lg xl:ml-0 dark:shadow-none dark:ring-1 dark:ring-inset dark:ring-white/10"
      >
        <div className="relative flex justify-between items-center bg-[#0a2030] border-b border-b-[#1d3344] text-slate-400 text-md leading-6">
          <div className="my-2 flex-none text-slate-300 px-4 py-2 flex items-center">
            tsconfig.json
          </div>
          <div className="h-8 flex items-center pr-4 lg:pr-8">
            <div className="relative flex -mr-2 items-center">
              <Transition
                show={showCopyText}
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <span className="mr-2 text-green-500">Copied!</span>
              </Transition>
              <button
                type="button"
                onClick={() => {
                  setIsExploding(true);
                  setShowCopyText(true);
                  navigator.clipboard.writeText(prettyTSConfig);
                  setTimeout(() => {
                    setShowCopyText(false);
                  }, 2000);
                  setTimeout(() => {
                    setIsExploding(false);
                  }, 10000);
                }}
                className="text-slate-500 hover:text-slate-400"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
        <div className="relative lg:max-h-[75vh] overflow-y-auto">
          <Highlight
            theme={themes.nightOwl}
            code={prettyTSConfig}
            language="tsx"
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => {
              lineRefs.current = []
              return (
                <pre className="" style={style}>
                  <code className="block p-5">
                    {tokens.map((line, i) => {
                      return (
                        <div
                          key={i}
                          {...getLineProps({ line })}
                          ref={(el) => {
                            if(!el) {
                              return;
                            }

                            lineRefs.current.push(el)
                          }}
                        >
                          {line.map((token, key) => (
                            <span key={key} {...getTokenProps({ token })} />
                          ))}
                        </div>
                      );
                    })}
                  </code>
                </pre>
              );
            }}
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
