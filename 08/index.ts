import input from "./input.txt";
import { count_antinodes } from "./part1";
import { count_antinodes_resonant } from "./part2";

export type Position = [number, number];
export type Input = Record<string, Position[]>;

function parse(input: string) {
	const rows = input.split("\n");
	const ret: Input = {};
	for (let i = 0; i < rows.length; i++) {
		const row = rows[i];
		for (let j = 0; j < row.length; j++) {
			const letter = row[j];
			if (letter === ".") {
				continue;
			}
			ret[letter] ??= [];
			ret[letter].push([i, j]);
		}
	}
	return [ret, rows.length - 1, rows[0].length - 1] as const;
}

const parsed = parse(input);
const antinodes = count_antinodes(...parsed);
const antinodes_resonant = count_antinodes_resonant(...parsed);

console.log({ antinodes, antinodes_resonant });
