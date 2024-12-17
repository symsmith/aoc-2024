import input from "./input.txt";
import { count_xmas } from "./part1";
import { count_x_mas } from "./part2";

function parse(input: string) {
	return input.split("\n");
}

const parsed = parse(input);
const xmases = count_xmas(parsed);
const x_mases = count_x_mas(parsed);

console.log({ xmases, x_mases });
