import type { Input, Position } from ".";

function get_couples(positions: Position[]): [Position, Position][] {
	return positions.flatMap((v, i) => positions.slice(i + 1).map((w) => [v, w]));
}

function get_couple_antinodes(
	couple: [Position, Position],
	max_row: number,
	max_col: number
): Position[] {
	const delta_i = couple[0][0] - couple[1][0];
	const delta_j = couple[0][1] - couple[1][1];
	const antinodes: Position[] = [];
	let running_pos_0 = couple[0];
	while (is_in_bounds(max_row, max_col)(running_pos_0)) {
		running_pos_0 = [running_pos_0[0] + delta_i, running_pos_0[1] + delta_j];
		antinodes.push(running_pos_0);
	}

	let running_pos_1 = couple[1];
	while (is_in_bounds(max_row, max_col)(running_pos_1)) {
		running_pos_1 = [running_pos_1[0] - delta_i, running_pos_1[1] - delta_j];
		antinodes.push(running_pos_1);
	}

	return antinodes;
}

function get_antinodes(
	positions: Position[],
	max_row: number,
	max_col: number
): Position[] {
	const couples = get_couples(positions);
	const antinodes: Position[] = [];
	for (const couple of couples) {
		const couple_antinodes = get_couple_antinodes(couple, max_row, max_col);
		antinodes.push(...couple_antinodes, ...couple);
	}
	return antinodes;
}

function is_in_bounds(
	max_row: number,
	max_col: number
): (value: Position) => boolean {
	return ([row, col]) =>
		row >= 0 && row <= max_row && col >= 0 && col <= max_col;
}

function serialize_position([row, col]: Position) {
	return `${row},${col}`;
}

function deserialize_position(serialized: string): Position {
	const [row, col] = serialized.split(",");
	return [Number(row), Number(col)];
}

function remove_duplicates(positions: Position[]): Position[] {
	const serialized = new Set(positions.map(serialize_position));
	return Array.from(serialized).map(deserialize_position);
}

export function count_antinodes_resonant(
	input: Input,
	max_row: number,
	max_col: number
) {
	let all_antinodes: Position[] = [];
	for (const freq in input) {
		if (Object.prototype.hasOwnProperty.call(input, freq)) {
			const positions = input[freq];
			all_antinodes = all_antinodes.concat(
				get_antinodes(positions, max_row, max_col)
			);
		}
	}
	all_antinodes = remove_duplicates(
		all_antinodes.filter(is_in_bounds(max_row, max_col))
	);
	return all_antinodes.length;
}
