import { Page } from "@playwright/test";
import { Locator } from "@playwright/test";

import { BasePage } from "./base.page";
import { LaunchesComponent } from "./components/launches.component";

export class LaunchesPage extends BasePage {
	readonly launchesComponent: LaunchesComponent;
	readonly allLaunches: Locator;

	constructor(page: Page) {
		super(page);
		this.launchesComponent = new LaunchesComponent(page);
		this.allLaunches = page.locator("div[class*=selected-value]");
	}
}
