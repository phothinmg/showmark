import { type LoadOptions, load, loadAll } from "js-yaml";
import Showdown from "showdown";

namespace ShowMark {
	type DataProps = {
		lines: string[];
		metaIndices: number[];
	};

	export type FrontMatterResult<T = Record<string, any>> = {
		/**
		 *  Yaml data form a markdown files
		 */
		data: T;
		/**
		 * Body content of markdown file
		 */
		content: string;
	};
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

	// ============================== END TYPES ============================ //
	/**
	 * Loads a YAML document from a given string.
	 *
	 * @param str The input string containing YAML document.
	 * @param options Optional configuration options for parsing YAML.
	 * @returns The parsed YAML document as a JSON object.
	 */
	export function loadYaml(str: string, options?: LoadOptions) {
		return load(str, options);
	}
	/**
	 * Loads all YAML documents from a given string and processes
	 * them using an optional iterator function.
	 *
	 * @param str The input string containing YAML documents.
	 * @param iterator An optional function to process each document.
	 * @param opts Optional configuration options for parsing YAML.
	 * @returns An array of parsed YAML documents.
	 */
	export function loadAllYaml(
		str: string,
		iterator?: null,
		opts?: LoadOptions,
	) {
		return loadAll(str, iterator, opts);
	}
	/**
	 * Finds indices of lines in a markdown file that contain a metadata delimiter.
	 * @param mem An array of indices to be populated.
	 * @param item A line of the markdown file.
	 * @param i The index of the line in the markdown file.
	 * @returns The updated array of indices.
	 */
	function findMetaIndices(mem: number[], item: string, i: number): number[] {
		// If the line starts with ---, it's a metadata delimiter
		if (/^---/.test(item)) {
			// Add the index of the line to the array of indices
			mem.push(i);
		}

		return mem;
	}
	/**
	 * Extracts and parses metadata from a markdown file.
	 *
	 * @param linesPros An object containing `lines` and `metaIndices` properties.
	 * - `lines`: An array of strings representing lines of a markdown file.
	 * - `metaIndices`: An array of numbers marking the start and end of the metadata block.
	 *
	 * @returns A JSON object containing the parsed metadata if present, otherwise an empty object.
	 */
	function getData(linesPros: DataProps) {
		const { lines, metaIndices } = linesPros;
		if (metaIndices.length > 0) {
			const dat = lines.slice(metaIndices[0] + 1, metaIndices[1]);
			const data = load(dat.join("\n"));
			return data;
		}
		return {};
	}

	/**
	 * Returns the content of a markdown file as a string, optionally
	 * skipping over a metadata block.
	 *
	 * If the file contains a metadata block, the content will be
	 * everything after the second `---` delimiter. Otherwise, the
	 * content will be the entire file.
	 *
	 * @param linesPros An object with `lines` and `metaIndices` properties.
	 * @returns A string containing the content of the markdown file.
	 */
	function getContent(linesPros: DataProps): string {
		const { lines, metaIndices } = linesPros;
		return metaIndices.length > 0
			? lines.slice(metaIndices[1] + 1).join("\n")
			: lines.join("\n");
	}

	/**
	 * Extracts frontmatter data from a markdown string.
	 *
	 * @param mdcontent A string that contains markdown content.
	 * @returns An object with two properties: data and content.
	 * - data: A JSON object that contains the frontmatter data,
	 *   parsed from the markdown string.
	 * - content: A string that contains the remainder of the
	 *   markdown content after the frontmatter has been stripped.
	 */
	export function frontmatter<T = Record<string, any>>(
		mdcontent: string,
	): FrontMatterResult<T> {
		const lines = mdcontent.split("\n");
		const metaIndices = lines.reduce(findMetaIndices, [] as number[]);
		const data = getData({ lines, metaIndices }) as T;
		const content: string = getContent({ lines, metaIndices });

		return { data, content };
	}

	/**
	 * Returns an object containing default options for a Showdown converter.
	 * Options that are not specified will be set to their default values.
	 *
	 * @param restOpts An object containing options that should be used instead of the default.
	 * @returns An object containing the default options for a Showdown converter.
	 */
	function getDefaultOptions(restOpts?: ShconverterOptions) {
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
	/**
	 * Creates a new Showdown converter with customized options.
	 *
	 * @param options - An object containing configuration options for the converter.
	 * @returns A Showdown.Converter instance configured with the specified options.
	 */
	export const shConverter = (options: ShconverterOptions) => {
		const opts = getDefaultOptions(options);
		return new Showdown.Converter(opts);
	};
	export const Showdowns = Showdown;
}

export default ShowMark;
