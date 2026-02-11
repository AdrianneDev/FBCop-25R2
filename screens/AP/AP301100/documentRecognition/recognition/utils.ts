import { piDegrees, quartPiDegrees, fieldRowSeparator } from "../../const";
import { RecognizedRectangle } from "./recognized-rectangle";

export function isOffsetNeeded(recognizedRect: RecognizedRectangle): boolean {
	const p0 = recognizedRect.polygon.points.getItem(0);
	const p1 = recognizedRect.polygon.points.getItem(1);

	// Vertical orientation
	if (p0.x === p1.x) {
		return false;
	}

	try {
		const tgAngle = (p0.y - p1.y) / (p1.x - p0.x);
		const angleInRad = Math.atan(tgAngle);
		const angleInGrad = angleInRad * (piDegrees / Math.PI);
		const offsetNeeded = angleInGrad < quartPiDegrees && angleInGrad > -quartPiDegrees;

		return offsetNeeded;
	}
	catch (e) {
		return false;
	}
}

export function getKeyFromValues(prefix: number | string, postfix: number | string): string {
	return `${prefix}${fieldRowSeparator}${postfix}`;
}

export function splitKey(key: NonNullable<string>): string[] {
	return key.split(fieldRowSeparator);
}

export function getFieldNameFromFullName(fieldFullName: string): string {
	const indexOfDot = fieldFullName.indexOf(".");
	if (indexOfDot === -1 || indexOfDot === fieldFullName.length - 1) {
		return fieldFullName;
	}
	return fieldFullName.slice(indexOfDot + 1);
}
