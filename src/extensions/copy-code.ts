import type { ShowdownExtension } from "showdown";
import Showdown from "showdown";

function addListener(className: string) {
  if (
    typeof global !== "undefined" &&
    (global as { copyCodeListener?: boolean }).copyCodeListener !== true
  ) {
    global.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (
        target?.classList?.contains(className) &&
        target.nextElementSibling?.tagName === "PRE"
      ) {
        navigator.clipboard.writeText(
          (target.nextElementSibling as HTMLPreElement).innerText
        );
      }
    });
    (global as { copyCodeListener?: boolean }).copyCodeListener = true;
  }
}

/**
 * showdownCopyCode
 *
 * Showdown extension that adds a button above code blocks to quickly and easily copy code to the clipboard.
 *
 * @function
 */
function copyCode({ className = "copy-code" } = {}): ShowdownExtension[] {
  return [
    {
      type: "output",
      filter: (text: string) => {
        addListener(className);

        return text.replace(
          /<pre.*><code/g,
          `<button class="${className}">Copy</button>$&`
        );
      },
    },
  ];
}

Showdown.extension("copyCode", copyCode());

export default copyCode;
