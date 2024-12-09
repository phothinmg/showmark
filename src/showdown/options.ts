import type Showdown from 'showdown';
import { customClass } from '../extensions';
import type { SanitizeOptions } from './index';

// Types
type DefaultExt = Pick<Showdown.ConverterOptions, 'extensions'>;
export type ShowDownOptions = Pick<
  Showdown.ConverterOptions,
  | 'openLinksInNewWindow'
  | 'headerLevelStart'
  | 'simpleLineBreaks'
  | 'extensions'
>;
export type ShowMarkOptions = {
  /**
   * Class for custom-css extension
   * false = <h1 class="foo">Foo</h1>
   * true = <h1 className="foo">Foo</h1>
   *
   * @default false
   */
  customClassJsx?: boolean;
  /**
   * Only 4 options of Showdown Converter Options
   * Reast of the all are already set.
   */
  showdownOptions?: ShowDownOptions;
  /**
   * sanitize-html libray options
   * @see https://github.com/apostrophecms/sanitize-html#default-options
   */
  sanitizeOptions?: SanitizeOptions;
};
/**
 * Gets the options for showdown. This function takes care of merging the
 * default options with the user-provided options.
 *
 * @param {ShowMarkOptions} opts The options to merge with the default options.
 *
 * @returns {Object} An object with two properties, `sh_opts` and `sanitizeOptions`.
 * `sh_opts` is the merged options for showdown, and `sanitizeOptions` is the
 * user-provided options for sanitize-html.
 */
export default function getOptions({
  customClassJsx,
  showdownOptions,
  sanitizeOptions,
}: ShowMarkOptions): {
  sh_opts: ShowDownOptions;
  sanitizeOptions: SanitizeOptions | undefined;
} {
  const dfext: DefaultExt['extensions'] = [customClass(customClassJsx)];
  const sh_opts: Showdown.ConverterOptions = {
    backslashEscapesHTMLTags: false,
    completeHTMLDocument: false,
    customizedHeaderId: false,
    disableForced4SpacesIndentedSublists: false,
    ellipsis: false,
    emoji: true,
    encodeEmails: false,
    ghCodeBlocks: true,
    ghCompatibleHeaderId: false,
    ghMentions: true,
    literalMidWordUnderscores: false,
    metadata: true,
    noHeaderId: true,
    omitExtraWLInCodeBlocks: false,
    openLinksInNewWindow: showdownOptions?.openLinksInNewWindow ?? false,
    parseImgDimensions: true,
    headerLevelStart: showdownOptions?.headerLevelStart ?? 1,
    prefixHeaderId: false,
    rawHeaderId: false,
    rawPrefixHeaderId: false,
    requireSpaceBeforeHeadingText: true,
    simpleLineBreaks: showdownOptions?.simpleLineBreaks ?? false,
    simplifiedAutoLink: true,
    smartIndentationFix: false,
    smoothLivePreview: false,
    splitAdjacentBlockquotes: false,
    strikethrough: true,
    tables: true,
    tablesHeaderId: false,
    tasklists: true,
    underline: true,
    extensions: dfext.concat(showdownOptions?.extensions ?? []),
  };
  return { sh_opts, sanitizeOptions };
}
