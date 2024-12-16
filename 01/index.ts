import input from "./input.txt";
import { compute_distance } from "./part1";
import { compute_similarity } from "./part2";

export type LocationId = number;
export type List = LocationId[];

function parse(input: string): [List, List] {
	const list1 = [];
	const list2 = [];
	for (const line of input.split("\n")) {
		const [loc1, loc2] = line.split("   ");
		list1.push(Number(loc1));
		list2.push(Number(loc2));
	}
	return [list1, list2];
}

const parsed = parse(input);
const distance = compute_distance(...parsed);
const similarity = compute_similarity(...parsed);

console.log({ distance, similarity });
