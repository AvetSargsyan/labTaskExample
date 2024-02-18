import {Page} from "@playwright/test";

export class BasePage {
	private readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async goto(url: string, options?: {referer?: string, timeout?: number, waitUntil?: "load" | "domcontentloaded" | "networkidle" | "commit"}): Promise<void>{
		await this.page.goto(url, options);
	}

	async url(): Promise<string> {
		return this.page.url();
	}
}