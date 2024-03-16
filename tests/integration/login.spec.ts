import { test, expect } from "@playwright/test";

import { POFactory } from "../../pages/pageFactory";
import { urlData } from "../../data/url.data";
import { credentialsData } from "../../data/credentials.data";
import { titles } from "../../data/titles.data";
import { waitForCondition } from "../../helpers/common.helper";
import { errorMessageData } from "../../data/errorMessage.data";

let loginPage: ReturnType<POFactory["getLoginPage"]>;
let homePage: ReturnType<POFactory["getHomePage"]>;

test.beforeEach(async ({ page }) => {
	loginPage = new POFactory(page).getLoginPage();
	homePage = new POFactory(page).getHomePage();

	await test.step("Open login page", async () => {
		await loginPage.goto(urlData.loginPage);
		await loginPage.logo.waitFor();
	});
});

test.describe("Check login page @integration", () => {
	test("Check elements on login page", async () => {
		await test.step("Check all elements visibility", async () => {
			await expect(
				loginPage.logo,
				"Logo element should be visible",
			).toBeVisible();
			await expect(
				loginPage.newsBlock,
				"News block should be visible",
			).toBeVisible();
			await expect(
				loginPage.header,
				"Header container should be visible",
			).toBeVisible();
			await expect(
				loginPage.header,
				"Header text should be correct",
			).toHaveText(titles.welcome);
			await expect(
				loginPage.loginWithEpamBtn,
				"Login With EPAM btn should be visible",
			).toBeVisible();
			await expect(
				loginPage.loginBtn,
				"Login btn should be visible",
			).toBeVisible();
			await expect(
				loginPage.loginInput,
				"Login input should be visible",
			).toBeVisible();
			await expect(
				loginPage.passwordInput,
				"Password input should be visible",
			).toBeVisible();
			await expect(
				loginPage.forgotPasswordLink,
				"Forgot password link should be visible",
			).toBeVisible();
			await expect(
				loginPage.privacyPolicyLink,
				"Privacy policy link should be visible",
			).toBeVisible();
		});
	});

	test("Check login with EPAM flow with valid credentials", async () => {
		await test.step("Click on 'Sign in with Epam' button", async () => {
			await loginPage.loginWithEpamBtn.click();
			await loginPage.loginWithEpamComponent.loginLogo.waitFor();

			await expect(
				loginPage.loginWithEpamComponent.loginHeader,
				`Login component header title should be '${titles.signIn}'`,
			).toHaveText(titles.signIn);
		});

		await test.step("Fill email and click 'Next button'", async () => {
			await loginPage.loginWithEpamComponent.loginEmailInput.fill(
        credentialsData.validUser.email!,
			);
			await loginPage.loginWithEpamComponent.loginNextBtn.click();
			await loginPage.loginWithEpamComponent.loginDisplayedEmail.waitFor();

			await expect(
				loginPage.loginWithEpamComponent.loginDisplayedEmail,
				"Displayed email in header should be correct",
			).toHaveText(credentialsData.validUser.email!.toLowerCase());
			await expect(
				loginPage.loginWithEpamComponent.loginHeader,
				"Password component header title should be correct",
			).toHaveText(titles.enterPassword);
		});

		await test.step("Fill password and click 'Sign In' button", async () => {
			await loginPage.loginWithEpamComponent.loginPasswordInput.fill(
        credentialsData.validUser.password!,
			);
			await loginPage.loginWithEpamComponent.loginSignInBtn.click();
		});

		// toDo: Complete OTP step
		// await test.step("Complete OTP", async () => {
		//      await homePage.logo.waitFor()
		// })
	});

	test("Check login with invalid credentials on login page", async () => {
		await test.step("Fill invalid email into email input", async () => {
			await loginPage.loginInput.fill(credentialsData.invalidUser.email!);
			const valueAttribute = await loginPage.loginInput.getAttribute("value");

			expect(valueAttribute, "Email field should be filled correct").toBe(
				credentialsData.invalidUser.email,
			);
		});

		await test.step("Fill invalid password into password input", async () => {
			await loginPage.passwordInput.fill(credentialsData.invalidUser.password!);
			const valueAttribute =
        await loginPage.passwordInput.getAttribute("value");

			expect(valueAttribute, "Password field should be filled correct").toBe(
				credentialsData.invalidUser.password,
			);
		});

		await test.step("Check page is not changed after click on 'Login' button", async () => {
			await loginPage.loginBtn.click();

			await expect(
				loginPage.header,
				"Page header should be visible",
			).toBeVisible();
			expect(
				await loginPage.url(),
				`Page url should be "${urlData.loginPage}"`,
			).toBe(urlData.loginPage);
		});
	});

	test("Check forgot password error message", async ({ page }) => {
		let restoreData: any;

		await test.step("Open Forgot password component", async () => {
			await loginPage.forgotPasswordLink.click();
			await loginPage.forgotPasswordComponent.header.waitFor();
		});

		await test.step("Check Forgot password components", async () => {
			await expect(
				loginPage.forgotPasswordComponent.header,
				"Page header should be visible",
			).toHaveText(titles.forgotPassword);
			await expect(
				loginPage.forgotPasswordComponent.emailInput,
				"Email input should be visible",
			).toBeVisible();
			await expect(
				loginPage.forgotPasswordComponent.sendEmailBtn,
				"Send email button should be visible",
			).toBeVisible();
			await expect(
				loginPage.forgotPasswordComponent.cancelBtn,
				"Cancel button should be visible",
			).toBeVisible();
		});

		await test.step("Input fake mail and get API response", async () => {
			await page.route("**/user/password/restore", (route, request) => {
				restoreData = request.postDataJSON();

				route.continue();
			});

			await loginPage.forgotPasswordComponent.emailInput.fill(
				credentialsData.invalidUser.email,
			);
			const condition = async () => {
				await loginPage.forgotPasswordComponent.sendEmailBtn.click();

				await page.waitForResponse("**/user/password/restore");

				return !!restoreData;
			};

			await waitForCondition("Get network error", condition);
		});

		await test.step("Check error message on UI and API side", async () => {
			await loginPage.forgotPasswordComponent.errorMessage.waitFor();

			await expect(
				loginPage.forgotPasswordComponent.errorMessage,
				"Error message text should be correct",
			).toContainText(credentialsData.invalidUser.email);
			expect(
				restoreData.email,
				"API error message should contain correct mail",
			).toBe(credentialsData.invalidUser.email);
		});
	});

	test("Check login for project member with valid credentials", async ({
		page,
	}) => {
		await test.step("Login with valid credentials", async () => {
			await loginPage.loginForNotEpamUser(
        credentialsData.validMember.email!,
        credentialsData.validMember.password!,
			);
			await homePage.logo.waitFor();

			await expect(page, "Page should have correct url").toHaveURL(
				urlData.dashboardPage(credentialsData.user!),
			);
		});
	});

	test("Check login for project member with not valid credentials", async () => {
		await test.step("Fill inputs with not valid credentials", async () => {
			await loginPage.loginForNotEpamUser(
        credentialsData.invalidMember.email!,
        credentialsData.invalidMember.password!,
			);
			await loginPage.errorMessage.waitFor();

			await expect(
				loginPage.errorMessage,
				"Error message text should be correct",
			).toHaveText(errorMessageData.loginPageInvalidCredentials);
		});
	});
});
