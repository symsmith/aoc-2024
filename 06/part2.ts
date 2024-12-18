import type { Input } from ".";
import {
	deserialize_guard,
	get_unique_pos_visited,
	serialize_guard,
} from "./part1";

function replace_char_at(string: string, replacement: string, index: number) {
	return (
		string.substring(0, index) +
		replacement +
		string.substring(index + replacement.length)
	);
}

function is_loop(input: Input, obs_i: number, obs_j: number): boolean {
	const input_with_obs = structuredClone(input);
	input_with_obs.board[obs_i] = replace_char_at(
		input_with_obs.board[obs_i],
		"#",
		obs_j
	);
	return get_unique_pos_visited(input_with_obs) === "loop";
}

export function count_obstructions(input: Input): number {
	const pos = get_unique_pos_visited(input);
	if (pos === "loop") return 0;

	const visited_pos = [
		...new Set(
			pos.map(({ position }) => serialize_guard({ position, direction: "^" }))
		),
	].map(deserialize_guard);

	let count = 0;

	for (const {
		position: [i, j],
	} of visited_pos) {
		if (i === input.guard.position[0] && j === input.guard.position[1]) {
			continue;
		}
		const loop = is_loop(input, i, j);
		count += loop ? 1 : 0;
	}

	return count;
}
