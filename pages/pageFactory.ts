import {Page} from "@playwright/test";
import {LoginPage} from "./login.page";
import {HomePage} from "./home.page";


export class POFactory {
	private readonly page: Page;

	constructor(page:Page) {
		this.page = page;
	}

	getLoginPage () {
		return new LoginPage(this.page);
	}

	getHomePage () {
		return new HomePage(this.page)
	}
}