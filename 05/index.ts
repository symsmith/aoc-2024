import input from "./input.txt";
import { get_sum_of_middles } from "./part1";
import { get_sum_of_wrong_middles } from "./part2";

export type Order = `${number}|${number}`;
export type Update = number[];
export type Input = {
	orders: Order[];
	updates: Update[];
};

function parse(input: string): Input {
	const [str_orders, str_updates] = input.split("\n\n");
	return {
		orders: str_orders.split("\n") as Order[],
		updates: str_updates
			.split("\n")
			.map((update) => update.split(",").map(Number)),
	};
}

const parsed = parse(input);
const sum_of_middles = get_sum_of_middles(parsed);
const sum_of_wrong_middles = get_sum_of_wrong_middles(parsed);

console.log({ sum_of_middles, sum_of_wrong_middles });
