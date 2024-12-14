// All of these are from https://www.npmjs.com/package/@types/mdx
import type { JSX } from 'react';

// JSX runtimes may optionally define JSX.ElementType ,to work regardless whether this is
// defined or not.
type ElementType = any extends JSX.ElementType ? never : JSX.ElementType;
/**
 * This type alias IntrinsicComponent extracts the keys of JSX.IntrinsicElements that match the type JSX.ElementType,
 * which represents the type of a React element.
 */
type IntrinsicComponent = Extract<
  keyof JSX.IntrinsicElements,
  ElementType extends never ? string : ElementType
>;
/**
 * FunctionElementType is a type alias that extracts a subset of ElementType that matches the type of a function that takes an object with
 * any string keys and any values (Record<string, any>) and returns any value (any).
 * In other words, FunctionElementType represents the type of a functional component in React.
 */
type FunctionElementType = Extract<
  ElementType,
  (props: Record<string, any>) => any
>;
/**
 * ClassElementType is a type alias that extracts a subset of ElementType that matches the type of a class constructor that takes
 * an object with any string keys and any values (Record<string, any>) and returns any value (any).
 */
type ClassElementType = Extract<
  ElementType,
  new (
    props: Record<string, any>,
  ) => any
>;

export type Element = JSX.Element;

/**
 * The FunctionComponent type is a type definition that describes the shape of a functional component in React.
 */
type FunctionComponent<Props> = ElementType extends never
  ? // If JSX.ElementType isn’t defined, the valid return type is JSX.Element
    (props: Props) => Element | null
  : FunctionElementType extends never
    ? // If JSX.ElementType is defined, but doesn’t allow function components, function components are disallowed.
      never
    : // If JSX.ElementType allows function components, its return value determines what is a valid.
      (props: Props) => ReturnType<FunctionElementType>;
/**
 * The ClassComponent type alias defines the shape of a class component in React.
It has three possible type definitions based on the existence and type of JSX.ElementType:
 */
type ClassComponent<Props> = ElementType extends never
  ? // If JSX.ElementType isn’t defined, the valid return type is a constructor that returns JSX.ElementClass
    new (
      props: Props,
    ) => JSX.ElementClass
  : ClassElementType extends never
    ? // If JSX.ElementType is defined, but doesn’t allow constructors, function components are disallowed.
      never
    : // If JSX.ElementType allows class components, its return value determines what is a valid.
      new (
        props: Props,
      ) => InstanceType<ClassElementType>;

type Component<Props> =
  | FunctionComponent<Props>
  | ClassComponent<Props>
  | IntrinsicComponent;

interface NestedComponents {
  [key: string]: NestedComponents | Component<any>;
}

export type MarkdownComponents = NestedComponents & {
  [Key in IntrinsicComponent]?: Component<JSX.IntrinsicElements[Key]>;
} & {
  /**
   * If a wrapper component is defined, the MDX content will be wrapped inside of it.
   */
  wrapper?: Component<any>;
};

export interface MarkdownProps {
  /**
   * Which props exactly may be passed into the component depends on the contents of the MDX
   * file.
   */
  [key: string]: unknown;

  /**
   * This prop may be used to customize how certain components are rendered.
   */
  components?: MarkdownComponents;
}

export type MarkdownContent = (props: MarkdownProps) => Element;

export interface MarkdownModule {
  /**
   * This could be any value that is exported from the MDX file.
   */
  [key: string]: unknown;

  /**
   * A functional JSX component which renders the content of the MDX file.
   */
  default: MarkdownContent;
}
