import { parse } from "path";
import _ from "lodash";

export function splitCase(str: string, separator: string = "-") {
	return str
		.replace(/\_/g, separator)
		.split(/(?=[A-Z])/)
		.join(separator)
		.toLowerCase();
}
