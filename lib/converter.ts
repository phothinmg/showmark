import Showdown from "showdown";
import getDefaultOptions, { type ShconverterOptions } from "./options";
/**
 * Creates a new Showdown converter with customized options.
 *
 * @param options - An object containing configuration options for the converter.
 * @returns A Showdown.Converter instance configured with the specified options.
 */
const shConverter = (options: ShconverterOptions) => {
  const opts = getDefaultOptions(options);
  return new Showdown.Converter(opts);
};

export default shConverter;
