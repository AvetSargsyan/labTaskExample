import { Page } from "@playwright/test";
import { Locator } from "@playwright/test";

export class SidebarComponent {
	readonly layoutIcon: Locator;
	readonly projectIcon: Locator;
	readonly dashboardsIcon: Locator;
	readonly launchesIcon: Locator;
	readonly filtersIcon: Locator;
	readonly debugIcon: Locator;
	readonly membersIcon: Locator;
	readonly settingsIcon: Locator;
	readonly projectMembersDashboard: Locator;

	constructor(page: Page) {
		this.layoutIcon = page.locator("[class^=layout__corner-area]");
		this.projectIcon = page.locator(
			"aside [class*=projectSelector__project-selector]",
		);
		this.dashboardsIcon = page.locator("a[href$='/dashboard']");
		this.launchesIcon = page.locator("a[href$='/launches']");
		this.filtersIcon = page.locator("a[href$='/filters']");
		this.debugIcon = page.locator("a[href$='userdebug/all']");
		this.membersIcon = page.locator("a[href$='/members']");
		this.settingsIcon = page.locator("a[href$='/settings']");
		this.projectMembersDashboard = page.locator(
			"aside div[class*=scrolling-content]",
		);
	}

	async clickOnPMDashboardByName(name: string) {
		await this.projectIcon.click();
		await this.projectMembersDashboard.waitFor();
		await this.projectMembersDashboard
			.locator(`[href="#${name}_personal"]`)
			.click();
	}
}
