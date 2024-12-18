import input from "./input.txt";
import { sum_test_values_binary } from "./part1";
import { sum_test_values_ternary } from "./part2";

export type Problem = {
	result: number;
	values: number[];
};

function parse(input: string): Problem[] {
	return input.split("\n").map((line) => {
		const [result, numbers] = line.split(":");
		return {
			result: Number(result),
			values: numbers.split(" ").slice(1).map(Number),
		};
	});
}

const parsed = parse(input);
const total_calibration_binary = sum_test_values_binary(parsed);
const total_calibration_ternary = sum_test_values_ternary(parsed);

console.log({ total_calibration_binary, total_calibration_ternary });
