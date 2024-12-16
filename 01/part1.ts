import type { List, LocationId } from ".";

export function sort(a: LocationId, b: LocationId): number {
	return a - b;
}

export function compute_distance(list1: List, list2: List): number {
	const sorted1 = list1.toSorted(sort);
	const sorted2 = list2.toSorted(sort);
	const distances = sorted1.map((a, i) => Math.abs(sorted2[i] - a));
	return distances.reduce((p, c) => p + c, 0);
}
