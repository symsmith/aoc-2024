import type { Report } from ".";

export function is_safe(report: Report): boolean {
	const first_diff = report[0] - report[1];
	if (Math.abs(first_diff) > 3 || first_diff === 0) {
		return false;
	}
	for (let i = 1; i < report.length - 1; i++) {
		const diff = report[i] - report[i + 1];
		if (
			diff === 0 ||
			Math.sign(diff) !== Math.sign(first_diff) ||
			Math.abs(diff) > 3
		) {
			return false;
		}
	}
	return true;
}

export function compute_safeness_level(reports: Report[]): number {
	return reports.map(is_safe).filter((x) => !!x).length;
}
