import {Page} from "@playwright/test";
import {Locator} from "@playwright/test";


export class ForgotPasswordComponent {
	readonly header: Locator;
	readonly emailInput: Locator;
	readonly cancelBtn: Locator;
	readonly sendEmailBtn: Locator;
	readonly loadingSpinner: Locator;
	readonly errorMessage: Locator;
	constructor(page: Page) {
		this.header = page.locator("[class^=blockHeader__block]");
		this.emailInput = page.locator("input[class^=inputOutside__input]");
		this.cancelBtn = page.locator("div[class*=password-buttons-container]>div:first-of-type");
		this.sendEmailBtn = page.locator("div[class*=password-buttons-container]>div:nth-of-type(2)");
		this.loadingSpinner = page.locator("div[class*='__spinning-preloader']>div>div:first-of-type");
		this.errorMessage = page.locator("[class*=notificationItem__error]>p");
	}
}