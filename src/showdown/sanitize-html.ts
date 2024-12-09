import sanitizeHtml from 'sanitize-html';

export type SanitizeOptions = Omit<sanitizeHtml.IOptions, ' allowedAttributes'>;
/**
 * Sanitizes HTML in a string, removing all HTML tags and attributes.
 * See https://www.npmjs.com/package/sanitize-html for more information.
 * @param text The string to be sanitized.
 * @param options Options to be passed to sanitizeHtml.
 * @returns The sanitized string.
 */
export default function sanitizeOutput(
  text: string,
  options?: SanitizeOptions,
): string {
  return sanitizeHtml(text, {
    allowedAttributes: false,
    ...options,
  }) as string;
}
