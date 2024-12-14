/**
 * All markdown extensions as JSX Elements
 */

declare module '*.md' {
  export default function MarkdownContents(
    props?: import('./types.d.ts').MarkdownProps,
  ): import('./types.d.ts').Element;
}

declare module '*.markdown' {
  export { default } from '*.md';
}

declare module '*.mdown' {
  export { default } from '*.md';
}

declare module '*.mkdn' {
  export { default } from '*.md';
}

declare module '*.mkd' {
  export { default } from '*.md';
}
declare module '*.mdwn' {
  export { default } from '*.md';
}
declare module '*.mkdown' {
  export { default } from '*.md';
}
declare module '*.ron' {
  export { default } from '*.md';
}
