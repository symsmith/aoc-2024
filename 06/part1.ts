import type { Direction, Guard, Input, Position } from ".";

export function serialize_guard(
	guard: Guard
): `${number},${number},${Direction}` {
	return `${guard.position[0]},${guard.position[1]},${guard.direction}`;
}

export function deserialize_guard(
	str: `${number},${number},${Direction}`
): Guard {
	const [i, j, dir] = str.split(",");
	return { position: [Number(i), Number(j)], direction: dir as Direction };
}

function compute_next_guard(state: Input): Guard {
	switch (state.guard.direction) {
		case "^": {
			const next_pos: Position = [
				state.guard.position[0] - 1,
				state.guard.position[1],
			];
			if (state.board[next_pos[0]]?.[next_pos[1]] === "#") {
				return { position: state.guard.position, direction: ">" };
			}
			return { position: next_pos, direction: "^" };
		}
		case ">": {
			const next_pos: Position = [
				state.guard.position[0],
				state.guard.position[1] + 1,
			];
			if (state.board[next_pos[0]]?.[next_pos[1]] === "#") {
				return { position: state.guard.position, direction: "v" };
			}
			return { position: next_pos, direction: ">" };
		}
		case "v": {
			const next_pos: Position = [
				state.guard.position[0] + 1,
				state.guard.position[1],
			];
			if (state.board[next_pos[0]]?.[next_pos[1]] === "#") {
				return { position: state.guard.position, direction: "<" };
			}
			return { position: next_pos, direction: "v" };
		}
		default: {
			const next_pos: Position = [
				state.guard.position[0],
				state.guard.position[1] - 1,
			];
			if (state.board[next_pos[0]]?.[next_pos[1]] === "#") {
				return { position: state.guard.position, direction: "^" };
			}
			return { position: next_pos, direction: "<" };
		}
	}
}

export function get_unique_pos_visited(input: Input): Guard[] | "loop" {
	const visited_pos = new Set([serialize_guard(input.guard)]);
	const current_state = structuredClone(input);
	let is_out_of_map = false;
	let step = 0;
	while (
		!(
			is_out_of_map ||
			(step > 0 && visited_pos.has(serialize_guard(current_state.guard)))
		)
	) {
		visited_pos.add(serialize_guard(current_state.guard));

		current_state.guard = compute_next_guard(current_state);

		is_out_of_map =
			current_state.guard.position[0] < 0 ||
			current_state.guard.position[0] > current_state.max_row ||
			current_state.guard.position[1] < 0 ||
			current_state.guard.position[1] > current_state.max_col;

		step++;
	}

	if (!is_out_of_map && step > 0) {
		return "loop";
	}

	return [...visited_pos].map(deserialize_guard);
}

export function count_unique_pos_visited(input: Input): number {
	const guards = get_unique_pos_visited(input);
	if (guards === "loop") return 0;
	const pos = new Set(
		guards.map(({ position }) => serialize_guard({ position, direction: "^" }))
	);
	return pos.size;
}
