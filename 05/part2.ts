import type { Input, Order, Update } from ".";
import { check_update } from "./part1";

function get_incorrect_updates(input: Input): Update[] {
	const ret = [];
	for (const update of input.updates) {
		if (!check_update(update, input.orders)) {
			ret.push(update);
		}
	}
	return ret;
}

function get_sort(input: Input): (a: number, b: number) => number {
	return (a, b) => {
		const couple: Order = `${a}|${b}`;
		if (input.orders.includes(couple)) {
			return -1;
		}
		if (a === b) return 0;
		return 1;
	};
}

export function get_sum_of_wrong_middles(input: Input): number {
	const incorrect_updates = get_incorrect_updates(input);
	const sorted_updates = incorrect_updates.map((update) =>
		update.toSorted(get_sort(input))
	);
	const middle_values = sorted_updates.map(
		(update) => update[(update.length - 1) / 2]
	);
	return middle_values.reduce((p, c) => p + c, 0);
}
