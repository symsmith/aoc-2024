import { add_padding, find_positions, type Position } from "./part1";

function check_config(input: string[], i: number, j: number, config: string) {
	return (
		config[0] === input[i - 1][j - 1] &&
		config[1] === input[i - 1][j + 1] &&
		config[2] === input[i + 1][j - 1] &&
		config[3] === input[i + 1][j + 1]
	);
}

function is_pos_x_mas(input: string[], i: number, j: number) {
	return ["MMSS", "MSMS", "SSMM", "SMSM"]
		.map((config) => check_config(input, i, j, config))
		.reduce((p, c) => p || c, false);
}

function filter_for_x_mas(input: string[], a_pos: Position[]) {
	const ret_pos: Position[] = [];
	for (const pos of a_pos) {
		const {
			pos: [i, j],
		} = pos;
		if (is_pos_x_mas(input, i, j)) {
			ret_pos.push(pos);
		}
	}
	return ret_pos;
}

export function count_x_mas(input: string[]) {
	const table = add_padding(input);
	const a_positions = find_positions(table, "A");
	return filter_for_x_mas(table, a_positions).length;
}
