import { Page } from "@playwright/test";
import { Locator } from "@playwright/test";

import { BasePage } from "./base.page";
import { SidebarComponent } from "./components/sidebar.component";

export class HomePage extends BasePage {
	readonly sidebarComponent: SidebarComponent;
	readonly logo: Locator;

	constructor(page: Page) {
		super(page);
		this.sidebarComponent = new SidebarComponent(page);
		this.logo = page.locator("[class^=layout__corner-area]");
	}
}
