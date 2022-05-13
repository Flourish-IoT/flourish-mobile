import { parseISO } from 'date-fns';

declare global {
	interface JSON {
		_parseSaved?: typeof JSON.parse;
	}
}

const reISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;

const dateParser = function (_key: string, value: any) {
	if (typeof value === 'string' && reISO.test(value)) {
		return parseISO(value);
	}

	return value;
};

const parseWithDate = function (json: string) {
	let parse = JSON._parseSaved ? JSON._parseSaved : JSON.parse;
	try {
		let res = parse(json, dateParser);
		return res;
	} catch (e) {
		// orignal error thrown has no error message so rethrow with message
		throw new Error('JSON content could not be parsed');
	}
};

export default function useJSONDateParser() {
	if (!JSON._parseSaved) {
		JSON._parseSaved = JSON.parse;
		JSON.parse = parseWithDate;
	}
}
