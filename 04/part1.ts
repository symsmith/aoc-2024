export function add_padding(input: string[]): string[] {
	const ret = input.map((row) => `...${row}...`);
	const cols = ret[0].length;
	const empty_row = ".".repeat(cols);
	ret.splice(0, 0, empty_row, empty_row, empty_row);
	ret.push(empty_row, empty_row, empty_row);
	return ret;
}

type Dir =
	| "up-right"
	| "up"
	| "up-left"
	| "left"
	| "right"
	| "down-left"
	| "down"
	| "down-right";

export type Position = {
	pos: [number, number];
	dir?: Dir;
};

export function find_positions(input: string[], letter: string): Position[] {
	const pos: Position[] = [];
	for (let i = 3; i < input.length - 3; i++) {
		const row = input[i];
		for (let j = 3; j < row.length - 3; j++) {
			const current_letter = row[j];
			if (current_letter === letter) {
				pos.push({ pos: [i, j] });
			}
		}
	}
	return pos;
}

function find_corresponding_neighbors_for_pos(
	input: string[],
	letter: string,
	i: number,
	j: number,
	dir?: Dir
): Position[] {
	const neighbors = !dir
		? [
				[i - 1, j - 1],
				[i - 1, j],
				[i - 1, j + 1],
				[i, j - 1],
				[i, j + 1],
				[i + 1, j - 1],
				[i + 1, j],
				[i + 1, j + 1],
		  ]
		: dir === "up-left"
		? [[i - 1, j - 1]]
		: dir === "up"
		? [[i - 1, j]]
		: dir === "up-right"
		? [[i - 1, j + 1]]
		: dir === "left"
		? [[i, j - 1]]
		: dir === "right"
		? [[i, j + 1]]
		: dir === "down-left"
		? [[i + 1, j - 1]]
		: dir === "down"
		? [[i + 1, j]]
		: [[i + 1, j + 1]];
	const pos: Position[] = [];
	for (const [cur_i, cur_j] of neighbors) {
		if (input[cur_i][cur_j] === letter) {
			pos.push({
				pos: [cur_i, cur_j],
				dir:
					dir ||
					(cur_i === i - 1
						? cur_j === j - 1
							? "up-left"
							: cur_j === j
							? "up"
							: "up-right"
						: cur_i === i
						? cur_j === j - 1
							? "left"
							: "right"
						: cur_j === j - 1
						? "down-left"
						: cur_j === j
						? "down"
						: "down-right"),
			});
		}
	}
	return pos;
}

function find_corresponding_neighbors(
	input: string[],
	letter: string,
	pos: Position[]
): Position[] {
	const ret_pos: Position[] = [];
	for (const {
		pos: [i, j],
		dir,
	} of pos) {
		const neighbors = find_corresponding_neighbors_for_pos(
			input,
			letter,
			i,
			j,
			dir
		);
		ret_pos.push(...neighbors);
	}
	return ret_pos;
}

export function count_xmas(input: string[]): number {
	const table = add_padding(input);

	const x_positions = find_positions(table, "X");
	const m_positions = find_corresponding_neighbors(table, "M", x_positions);
	const a_positions = find_corresponding_neighbors(table, "A", m_positions);
	const s_positions = find_corresponding_neighbors(table, "S", a_positions);

	return s_positions.length;
}
