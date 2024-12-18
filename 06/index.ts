import input from "./input.txt";
import { count_unique_pos_visited } from "./part1";
import { count_obstructions } from "./part2";

export type Position = [number, number];
export type Direction = "^" | ">" | "v" | "<";
export type Guard = { position: Position; direction: Direction };
export type Input = {
	guard: Guard;
	board: string[];
	max_col: number;
	max_row: number;
};

function parse(input: string): Input {
	const rows = input.split("\n");
	const ret: Input = {
		guard: { position: [0, 0], direction: "^" },
		board: rows,
		max_row: rows.length - 1,
		max_col: rows[0].length - 1,
	};
	for (let i = 0; i < rows.length; i++) {
		const row = rows[i];
		for (let j = 0; j < row.length; j++) {
			const char = row[j];
			if (char === "^") {
				ret.guard.position = [i, j];
			}
		}
	}
	return ret;
}

const parsed = parse(input);
const visited = count_unique_pos_visited(parsed);
const obstructions = count_obstructions(parsed);

console.log({ visited, obstructions });
