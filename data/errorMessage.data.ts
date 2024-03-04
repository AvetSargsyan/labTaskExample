export const errorMessageData = {
	forgotPassword: (mail : string) => {
		return `"An error occurred while connecting to server: Error in handled Request. Please, check specified parameters: '${mail}'"`;
	},
	loginPageInvalidCredentials: "An error occurred while connecting to server: You do not have enough permissions. Bad credentials"
};