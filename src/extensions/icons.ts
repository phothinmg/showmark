import type { ShowdownExtension } from "showdown";
import Showdown from "showdown";

function icons(): ShowdownExtension[] {
  return [
    {
      type: "lang",
      regex: "\\B(\\\\)?@fa-([\\S]+)\\b",
      /**
       * Replace the matched text with either the original text or
       * an `<i>` element with the correct font awesome icon class.
       *
       * @param match The entire matched text.
       * @param escaped The escaped prefix of the match, if any.
       * @param iconName The name of the icon without the `fa-` prefix.
       * @returns The replaced text.
       */
      replace: (match: string, escaped: string, iconName: string) => {
        return escaped === "\\" ? match : `<i class="fa fa-${iconName}"></i>`;
      },
    },
    {
      type: "output",
      /**
       * Replace any `<p>` elements containing only a font awesome icon
       * with just the icon.
       *
       * Also, add a script tag to the output to import the font awesome
       * library unless the library has already been imported.
       *
       * @param text The text to filter.
       * @returns The filtered text.
       */
      filter: (text: string) => {
        if (text) {
          text = text.replace(/<p>(<i class="fa fa-[^"]+"><\/i>)<\/p>/g, "$1");
        }
        return text;
      },
    },
  ];
}

Showdown.extension("icons", icons());

export default icons;
