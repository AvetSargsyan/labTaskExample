import {Page} from "@playwright/test";
import {Locator} from "@playwright/test";

import {BasePage} from "./base.page";


export class HomePage extends BasePage{
	readonly logo: Locator;

	constructor(page: Page) {
		super(page);
		this.logo = page.locator("[class^=layout__corner-area]");
		page.url();
	}
}