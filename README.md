# ShowMark

## About

Markdown component with [Showdown.js](https://github.com/showdownjs/showdown) and [@types/mdx](https://www.npmjs.com/package/@types/mdx).

## Install

```bash
npm i showmark
```

```bash
pnpm i showmark
```

```bash
yarn add showmark
```

## Usage

### Convert to html

```ts
import Converter from "showmark";

const mdContent = `
---
title: "Hello"
date: "2024-12-12"
---

# Hello World

[.foo]Foo
`;

const converter = new Converter(mdContent, {
  customClassJsx: false,
  showdownOptions: {
    /** showdown-options */
  },
  sanitizeOptions: {
    /**sanitize-html-options */
  },
});

/* 
Frontmatter Data
{ title: 'Hello', date: '2024-12-12' } 
 */
console.log(converter.metadata);

/*
  Raw converted HTML

  <h1>Hello World</h1>
  <p class="foo">Foo</p>
 */
console.log(converter.rawHtml);

/*
 Sanitized HTML

  <h1>Hello World</h1>
  <p class="foo">Foo</p>
 */
console.log(converter.cleanHtml);
```

### Compile to JSX
