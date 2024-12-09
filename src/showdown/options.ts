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
  customClassJsx?: boolean;
  showdownOptions?: ShowDownOptions;
  sanitizeOptions?: SanitizeOptions;
};
export default function getOptions({
  customClassJsx,
  showdownOptions,
  sanitizeOptions,
}: ShowMarkOptions) {
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
