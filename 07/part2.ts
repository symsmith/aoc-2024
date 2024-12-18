import type { Problem } from ".";

function dec2ter(dec: number, length: number): string {
	return (dec >>> 0).toString(3).padStart(length, "0");
}

function check_problem(problem: Problem): boolean {
	for (let i = 0; i < Math.pow(3, problem.values.length - 1); i++) {
		const ternary = dec2ter(i, problem.values.length - 1);
		let running_total = problem.values[0];
		for (let b = 0; b < ternary.length; b++) {
			const bit = ternary[b];
			switch (bit) {
				case "0": {
					const concatenation = Number(
						String(running_total) + String(problem.values[b + 1])
					);
					running_total = concatenation;
					break;
				}
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

export function sum_test_values_ternary(problems: Problem[]): number {
	const valid = problems.filter(check_problem);
	return valid.reduce((p, c) => p + c.result, 0);
}
