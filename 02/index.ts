import input from "./input.txt";
import { compute_safeness_level } from "./part1";
import { compute_dampened_safeness_level } from "./part2";

export type Report = number[];

function parse(input: string): Report[] {
	return input.split("\n").map((line) => line.split(" ").map(Number));
}

const parsed = parse(input);
const safeness = compute_safeness_level(parsed);
const dampened_safeness = compute_dampened_safeness_level(parsed);

console.log({ safeness, dampened_safeness });
