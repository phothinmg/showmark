import Showdown from 'showdown';
import {
  type FrontMatterResult,
  type SanitizeOptions,
  type ShowMarkOptions,
  frontmatter,
  getOptions,
  sanitizeOutput,
} from '.';

export default class Converter<
  T = Record<string, any>,
> extends Showdown.Converter {
  private _sanOpts: SanitizeOptions | undefined;
  private _content: string;
  private _rawContent: FrontMatterResult<T>;
  private _rawHtml: string;
  constructor(
    content: string,
    {
      customClassJsx = false,
      showdownOptions,
      sanitizeOptions,
    }: ShowMarkOptions,
  ) {
    super(
      getOptions({ customClassJsx, showdownOptions, sanitizeOptions }).sh_opts,
    );
    this._sanOpts = getOptions({
      customClassJsx,
      showdownOptions,
      sanitizeOptions,
    }).sanitizeOptions;
    this._content = content;
    this._rawContent = frontmatter<T>(this._content);
    this._rawHtml = this.makeHtml(this._rawContent.content);
  }
  get rawHtml(): string {
    return this._rawHtml;
  }
  get cleanHtml(): string {
    return sanitizeOutput(this._rawHtml, this._sanOpts);
  }
  get metadata(): T {
    return this._rawContent.data;
  }
}
