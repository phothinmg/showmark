import Showdown from 'showdown';
import frontmatter, { type FrontMatterResult } from '../frontmatter/index.js';
import {
  type SanitizeOptions,
  type ShowMarkOptions,
  getOptions,
  sanitizeOutput,
} from './index.js';
export default class Converter<
  T = Record<string, any>,
> extends Showdown.Converter {
  private _sanOpts: SanitizeOptions | undefined;
  private _content: string;
  private _rawContent: FrontMatterResult<T>;
  private _rawHtml: string;
  constructor(content: string, options?: ShowMarkOptions) {
    super(getOptions(options).sh_opts);
    this._sanOpts = getOptions(options).sanitizeOptions;
    this._content = content;
    this._rawContent = frontmatter<T>(this._content);
    this._rawHtml = this.makeHtml(this._rawContent.content);
    this.setFlavor(getOptions(options).flavor);
  }
  /**
   * Returns the raw HTML converted by Showdown from the markdown content.
   * Does not include any frontmatter data.
   */
  get rawHtml(): string {
    return this._rawHtml;
  }
  /**
   * Returns the HTML converted by Showdown from the markdown content,
   * stripped of any unwanted HTML tags or attributes via the
   * `sanitize-html` library. Does not include any frontmatter data.
   */
  get cleanHtml(): string {
    return sanitizeOutput(this._rawHtml, this._sanOpts);
  }
  /**
   * Retrieves the metadata extracted from the frontmatter of the markdown content.
   * @returns The metadata as a JSON object of type T.
   */
  get metadata(): T {
    return this._rawContent.data;
  }
}
