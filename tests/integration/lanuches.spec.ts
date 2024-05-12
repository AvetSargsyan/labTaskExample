import {expect, test} from "@playwright/test";
import jsonpath from "jsonpath/index";

import {POFactory} from "../../pages/pageFactory";
import {urlData} from "../../data/url.data";
import {credentialsData} from "../../data/credentials.data";
import {waitForCondition} from "../../helpers/common.helper";
import {getLaunchesComponentsData} from "../../helpers/apiRequest.helper";
import {LaunchesAPIDataType, LaunchesUIDataType} from "../../data/types.data";

let loginPage: ReturnType<POFactory["getLoginPage"]>;
let homePage: ReturnType<POFactory["getHomePage"]>;
let launchesPage: ReturnType<POFactory["getLaunchesPage"]>;
const USER = "Avet_Sargsyan";

test.beforeEach(async ({page}) => {
  loginPage = new POFactory(page).getLoginPage();
  homePage = new POFactory(page).getHomePage();
  launchesPage = new POFactory(page).getLaunchesPage();

  await test.step("Open login page", async () => {
    await loginPage.goto(urlData.loginPage, {waitUntil: "load"});
    await loginPage.logo.waitFor();
  });

  await test.step("Login with valid credentials", async () => {
    await loginPage.loginForNotEpamUser(
      credentialsData.validMember.email!,
      credentialsData.validMember.password!,
    );
    await homePage.logo.waitFor();
  });

  //Somehow sometimes after login with member account it opens page for personal account
  if (page.url().includes(credentialsData.validMember.email.toLowerCase())) {
    await test.step("Checkout to Personal account", async () => {
      await homePage.sidebarComponent.clickOnPMDashboardByName(USER);
      const condition = async () => {
        const url = page.url();
        return url.includes(USER);
      };
      await waitForCondition("Page url is changed", condition);
    });
  }

  await test.step("Open Launches page", async () => {
    await homePage.sidebarComponent.launchesIcon.click();
    await launchesPage.allLaunches.waitFor();
  });
});

test.describe("Check Launches page @integration", () => {
  test("Check correctness of data for Launches components", async () => {
    const launchesData = await getLaunchesComponentsData(USER);
    const launchesCount = Object.keys(launchesData).length;

    for (let launchIndex = 0; launchIndex < launchesCount; launchIndex++) {
      const launchesAPIData: LaunchesAPIDataType = {};
      const launchesUIData: LaunchesUIDataType = {};

      await test.step("Get data from API", async () => {
        launchesAPIData.nameData = jsonpath.query(
          launchesData[launchIndex],
          "$..name",
        )[0];
        launchesAPIData.numberData = jsonpath.query(
          launchesData[launchIndex],
          "$..number",
        )[0];
        const startDate = jsonpath.query(
          launchesData[launchIndex],
          "$..startTime",
        )[0];

        const endDate = jsonpath.query(
          launchesData[launchIndex],
          "$..endTime",
        )[0];
        launchesAPIData.durationData = new Date(
          endDate - startDate,
        ).getSeconds();
        launchesAPIData.totalData = jsonpath.query(
          launchesData[launchIndex],
          "$..executions.total",
        )[0];
        launchesAPIData.passedData = jsonpath.query(
          launchesData[launchIndex],
          "$..executions.passed",
        )[0];
        launchesAPIData.failedData = jsonpath.query(
          launchesData[launchIndex],
          "$..executions.failed",
        )[0];
        launchesAPIData.skippedData = jsonpath.query(
          launchesData[launchIndex],
          "$..executions.skipped",
        )[0];
      });

      await test.step("Get data from UI", async () => {
        for (const [key, value] of Object.entries(launchesAPIData)) {
          if (value) {
            const itemName = `${key.replace("Data", "")}`;
            const itemNameUI = `${itemName}UI`;

            launchesUIData[itemNameUI] = await (
              await launchesPage.launchesComponent[itemName](launchIndex)
            ).innerText();
          }
        }
      });

      await test.step("Validate data from API with UI", async () => {
        for (const [keyUI, valueUI] of Object.entries(launchesUIData)) {
          const itemName = keyUI.replace("UI", "");
          const itemNameAPI = `${itemName}Data`;

          expect(
            valueUI,
            `"${itemName}" key for "${launchIndex + 2}" component should be correct`,
          ).toContain(String(launchesAPIData[itemNameAPI]));
        }
      });
    }
  });
});
