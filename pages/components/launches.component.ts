import { Page } from "@playwright/test";
import { Locator } from "@playwright/test";

export class LaunchesComponent {
	// readonly description: (nth: number) => Promise<Locator>;
	readonly name: (nth: number) => Promise<Locator>;
	readonly number: (nth: number) => Promise<Locator>;
	readonly duration: (nth: number) => Promise<Locator>;
	readonly total: (nth: number) => Promise<Locator>;
	readonly passed: (nth: number) => Promise<Locator>;
	readonly failed: (nth: number) => Promise<Locator>;
	readonly skipped: (nth: number) => Promise<Locator>;
	readonly attributes: (nth: number) => Promise<Locator>;
	readonly hasRetries: (nth: number) => Promise<Locator>;

	constructor(page: Page) {
		// this.description = async (nth: number) =>
		//   page.locator(
		//     `${this.getResultBlock(nth)} [class*=gridRow__description] [class*=markdown-viewer]`,
		//   );
		this.name = async (nth: number) =>
			page.locator(
				`${this.getResultBlock(nth)} td div[class*=itemInfo__name]>span`,
			);
		this.number = async (nth: number) =>
			page.locator(
				`${this.getResultBlock(nth)} td span[class^=itemInfo__number]`,
			);
		this.duration = async (nth: number) =>
			page.locator(
				`${this.getResultBlock(nth)}  td span[class^=durationBlock__duration]`,
			);
		this.total = async (nth: number) =>
			page.locator(
				`${this.getResultBlock(nth)} ${this.getExecutions("total")}`,
			);
		this.passed = async (nth: number) =>
			page.locator(
				`${this.getResultBlock(nth)} ${this.getExecutions("passed")}`,
			);
		this.failed = async (nth: number) =>
			page.locator(
				`${this.getResultBlock(nth)} ${this.getExecutions("failed")}`,
			);
		this.skipped = async (nth: number) =>
			page.locator(
				`${this.getResultBlock(nth)} ${this.getExecutions("skipped")}`,
			);
		this.attributes = async (nth: number) =>
			page.locator(
				`${this.getResultBlock(nth)} td div[class*=attributes-block]`,
			);
		this.hasRetries = async (nth: number) =>
			page.locator(`${this.getResultBlock(nth)} td div[class*=retry-icon]`);
	}

	private readonly getResultBlock = (nth: number) =>
		`div[class^=gridRow__grid-row-wrapper]:nth-of-type(${nth + 2})`;
	private readonly getExecutions = (status: string) =>
		`div[class*=${status}-col] a`;
}
