import {Page} from "@playwright/test";
import {Locator} from "@playwright/test";


export class LoginWithEpamComponent {
	readonly loginLogo: Locator;
	readonly loginHeader: Locator;
	readonly loginAccountOptions: Locator;
	readonly loginEmailInput: Locator;
	readonly loginNextBtn: Locator;
	readonly loginDisplayedEmail: Locator;
	readonly loginPasswordInput: Locator;
	readonly loginSignInBtn: Locator;

	constructor(page: Page) {
		this.loginLogo = page.locator("#bannerLogo");
		this.loginHeader = page.locator("#loginHeader>div");
		this.loginAccountOptions = page.locator("#tilesHolder");
		this.loginEmailInput = page.locator("input[type='email']");
		this.loginNextBtn = page.locator("input[type='submit']");
		this.loginDisplayedEmail = page.locator("#displayName");
		this.loginPasswordInput = page.locator("input[type='password']");
		this.loginSignInBtn = page.locator("input.ext-primary");
	}
}