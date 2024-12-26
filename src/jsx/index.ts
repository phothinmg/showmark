import { type Node, transformFromAstSync } from "@babel/core";
import { parse } from "@babel/parser";

import { Converter, type ShowMarkOptions } from "../converter/index.js";

export type JSXSource = "react" | "preact";
export interface JSXCompilerOptions {
  /**
   * JSX runtime
   * @default "react"
   */
  jsxSource?: JSXSource;
  /**
   * @default "compiled.js"
   */
  fileName?: string;
  /**
   * @default "prose dark:prose-invert"
   */
  className?: string;
}

/**
 * Compiles markdown content into JSX content.
 * @param content The markdown content to be compiled.
 * @param compilerOptions Options for the compiler. See {@link JSXCompilerOptions}.
 * @param converterOptions Options for the markdown converter. See {@link ShowMarkOptions}.
 * @returns An object with the compiled code, source map, and metadata.
 */
const jsxCompiler = (
  content: string,
  compilerOptions?: JSXCompilerOptions,
  converterOptions?: ShowMarkOptions
) => {
  const _html = new Converter(content, converterOptions).cleanHtml;
  const _className = compilerOptions?.className ?? "prose dark:prose-invert";
  const _jsxSource = compilerOptions?.jsxSource ?? "react";
  const _fileName = compilerOptions?.fileName ?? "compiled.js";
  const _jsxReact = `
  import React from "react"
  export default function MarkdownContent(){
    return (
      <div className="${_className}">
        ${_html}
      </div>
    )
  }
  `;
  const _jsxPreact = `
  /** @jsx Preact.h */
  import Preact from "preact";

   export default function MarkdownContent(){
    return (
      <div class="${_className}">
        ${_html}
      </div>
    )
  }
  `;
  const _jsxContent = _jsxSource === "preact" ? _jsxPreact : _jsxReact;

  const parsedAst = parse(_jsxContent, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  //
  const result = transformFromAstSync(parsedAst as Node, _jsxContent, {
    filename: _fileName,
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            esmodules: true,
          },
          modules: false,
        },
      ],
      ["@babel/preset-react"],
      ["@babel/preset-typescript"],
    ],
    plugins: [
      "@babel/plugin-transform-typescript",

      ["@babel/plugin-transform-react-jsx"],
    ],
  });
  return {
    code: result?.code,
    map: result?.map,
    metadata: result?.metadata,
    ast: result?.ast,
    reactJsx: _jsxReact,
    preactJsx: _jsxPreact,
  };
};

export default jsxCompiler;
