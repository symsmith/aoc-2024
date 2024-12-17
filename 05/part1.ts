import type { Input, Order, Update } from ".";

export function check_update(update: Update, orders: Order[]): boolean {
	for (let i = 0; i < update.length - 1; i++) {
		const couple: Order = `${update[i]}|${update[i + 1]}`;
		if (!orders.includes(couple)) {
			return false;
		}
	}
	return true;
}

function get_correct_updates(input: Input): Update[] {
	const ret = [];
	for (const update of input.updates) {
		if (check_update(update, input.orders)) {
			ret.push(update);
		}
	}
	return ret;
}

export function get_sum_of_middles(input: Input): number {
	const correct_updates = get_correct_updates(input);
	const middle_values = correct_updates.map(
		(update) => update[(update.length - 1) / 2]
	);
	return middle_values.reduce((p, c) => p + c, 0);
}
