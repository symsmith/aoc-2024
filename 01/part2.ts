import type { List, LocationId } from ".";

function get_frequence(list: List, location: LocationId): number {
	return list.filter((a) => location === a).length;
}

export function compute_similarity(list1: List, list2: List): number {
	const similarities = list1.map((a) => a * get_frequence(list2, a));
	return similarities.reduce((p, c) => p + c, 0);
}
