import type { Report } from ".";
import { is_safe } from "./part1";

function is_safe_dampened(report: Report): boolean {
	if (is_safe(report)) {
		return true;
	}
	for (let i = 0; i < report.length; i++) {
		if (is_safe(report.toSpliced(i, 1))) {
			return true;
		}
	}
	return false;
}

export function compute_dampened_safeness_level(reports: Report[]): number {
	return reports.map(is_safe_dampened).filter((x) => !!x).length;
}
