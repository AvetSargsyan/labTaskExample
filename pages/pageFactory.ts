import { Page } from "@playwright/test";
import { LoginPage } from "./login.page";
import { HomePage } from "./home.page";
import { LaunchesPage } from "./launches.page";

export class POFactory {
	private readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	getLoginPage() {
		return new LoginPage(this.page);
	}

	getHomePage() {
		return new HomePage(this.page);
	}

	getLaunchesPage() {
		return new LaunchesPage(this.page);
	}
}
