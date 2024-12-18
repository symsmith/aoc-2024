import type { Problem } from ".";

function dec2bin(dec: number, length: number): string {
	return (dec >>> 0).toString(2).padStart(length, "0");
}

function check_problem(problem: Problem): boolean {
	for (let i = 0; i < Math.pow(2, problem.values.length - 1); i++) {
		const binary = dec2bin(i, problem.values.length - 1);
		let running_total = problem.values[0];
		for (let b = 0; b < binary.length; b++) {
			const bit = binary[b];
			switch (bit) {
				case "1":
					running_total *= problem.values[b + 1];
					break;
				default:
					running_total += problem.values[b + 1];
					break;
			}
		}
		if (running_total === problem.result) {
			return true;
		}
	}
	return false;
}

export function sum_test_values_binary(problems: Problem[]): number {
	const valid = problems.filter(check_problem);
	return valid.reduce((p, c) => p + c.result, 0);
}
