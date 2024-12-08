import Showdown from "showdown";

export type ShconverterOptions = {
  openLinksInNewWindow: boolean;
  headerLevelStart: 1 | 2 | 3 | 4 | 5 | 6;
  simpleLineBreaks: boolean;
  extensions: (
    | string
    | (() => Showdown.ShowdownExtension[] | Showdown.ShowdownExtension)
    | Showdown.ShowdownExtension
    | Showdown.ShowdownExtension[]
  )[];
};

export default function getDefaultOptions(restOpts?: ShconverterOptions) {
  const defaultOptions: Showdown.ConverterOptions = {
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
    openLinksInNewWindow: restOpts?.openLinksInNewWindow ?? false,
    parseImgDimensions: true,
    headerLevelStart: restOpts?.headerLevelStart ?? 1,
    prefixHeaderId: false,
    rawHeaderId: false,
    rawPrefixHeaderId: false,
    requireSpaceBeforeHeadingText: true,
    simpleLineBreaks: restOpts?.simpleLineBreaks ?? false,
    simplifiedAutoLink: true,
    smartIndentationFix: false,
    smoothLivePreview: false,
    splitAdjacentBlockquotes: false,
    strikethrough: true,
    tables: true,
    tablesHeaderId: false,
    tasklists: true,
    underline: true,
    extensions: [...restOpts.extensions],
  };
  return defaultOptions;
}
