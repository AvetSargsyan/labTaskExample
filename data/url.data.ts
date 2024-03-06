import envData from "./envDataProcessor.data";

export const urlData = {
	loginPage: `${envData.baseUrl}/ui/#login`,
	dashboardPage: (userName: string) : string =>
		`${envData.baseUrl}/ui/#${userName.toLowerCase()}_personal/dashboard`
};