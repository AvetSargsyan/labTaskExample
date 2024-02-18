import {Page} from "@playwright/test";
import {Locator} from "@playwright/test";

import {BasePage} from "./base.page";
import {LoginWithEpamComponent} from "./components/loginWithEpam.component";

export class LoginPage extends BasePage{
	readonly loginWithEpamComponent: LoginWithEpamComponent;
	readonly logo : Locator;
	readonly newsBlock: Locator;
	readonly header: Locator;
	readonly loginWithEpamBtn: Locator;
	readonly loginBtn: Locator;
	readonly loginInput: Locator;
	readonly passwordInput: Locator;
	readonly forgotPasswordLink: Locator;
	readonly privacyPolicyLink: Locator;

	constructor(page:Page) {
		super(page);
		this.loginWithEpamComponent = new LoginWithEpamComponent(page);
		this.logo = page.locator("[class^=loginPage__logo]");
		this.newsBlock = page.locator("[class^=newsBlock__twitter-block]");
		this.header = page.locator("[class^=blockHeader__block-header]");
		this.loginWithEpamBtn = page.locator("[class^=externalLoginBlock]>button");
		this.loginBtn = page.locator("[class*=login-button]>button");
		this.loginInput = page.locator("input[name=login]");
		this.passwordInput = page.locator("input[name=password]");
		this.forgotPasswordLink = page.locator("[class^=loginForm__forgot-pass]");
		this.privacyPolicyLink = page.locator("a[href$=PrivacyPolicy]")
	}
}