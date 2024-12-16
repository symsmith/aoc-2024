import input from "./input.txt";

type Mul = [number, number];

function parse(input: string, withDonts = false): Mul[] {
	let indexOfMul = -1;
	let indexOfDont = -1;
	let enabled = true;
	let mul1 = -1;
	let mul2 = -1;
	const muls: Mul[] = [];
	for (let i = 0; i < input.length; i++) {
		const char = input[i];
		if (char === "m") {
			indexOfMul = 0;
		} else if (indexOfMul === 0 && char === "u") {
			indexOfMul = 1;
		} else if (indexOfMul === 1 && char === "l") {
			indexOfMul = 2;
		} else if (indexOfMul === 2 && char === "(") {
			indexOfMul = 3;
		} else if (indexOfMul === 3 && !isNaN(Number(char))) {
			mul1 = Number(char);
			indexOfMul = 11;
		} else if (indexOfMul === 11 && !isNaN(Number(char))) {
			mul1 = 10 * mul1 + Number(char);
			indexOfMul = 12;
		} else if (indexOfMul === 12 && !isNaN(Number(char))) {
			mul1 = 10 * mul1 + Number(char);
			indexOfMul = 13;
		} else if (
			(indexOfMul === 11 || indexOfMul === 12 || indexOfMul === 13) &&
			char === ","
		) {
			indexOfMul = 4;
		} else if (indexOfMul === 4 && !isNaN(Number(char))) {
			mul2 = Number(char);
			indexOfMul = 21;
		} else if (indexOfMul === 21 && !isNaN(Number(char))) {
			mul2 = 10 * mul2 + Number(char);
			indexOfMul = 22;
		} else if (indexOfMul === 22 && !isNaN(Number(char))) {
			mul2 = 10 * mul2 + Number(char);
			indexOfMul = 23;
		} else if (
			(indexOfMul === 21 || indexOfMul === 22 || indexOfMul === 23) &&
			char === ")"
		) {
			if (enabled || !withDonts) {
				muls.push([mul1, mul2]);
			}
			indexOfMul = 5;
		} else {
			indexOfMul = -1;
		}

		if (char === "d") {
			indexOfDont = 0;
		} else if (indexOfDont === 0 && char === "o") {
			indexOfDont = 1;
		} else if (indexOfDont === 1 && char === "n") {
			indexOfDont = 2;
		} else if (indexOfDont === 1 && char !== "n") {
			indexOfDont = -1;
			enabled = true;
		} else if (indexOfDont === 2 && char === "'") {
			indexOfDont = 3;
		} else if (indexOfDont === 3 && char === "t") {
			indexOfDont = 4;
			enabled = false;
		} else {
			indexOfDont = -1;
		}
	}
	return muls;
}

export function sum_muls(muls: Mul[]): number {
	return muls.reduce((p, c) => p + c[0] * c[1], 0);
}

const parsed = parse(input);
const sum_of_muls = sum_muls(parsed);
const parsed_with_donts = parse(input, true);
const sum_of_muls_with_donts = sum_muls(parsed_with_donts);

console.log({ sum_of_muls, sum_of_muls_with_donts });
