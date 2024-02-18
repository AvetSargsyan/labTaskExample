import {envData} from "./envDataProcessor.data";

export const credentialsData = {
	validUser :{
		email: envData.userName,
		password: envData.userPass,
	},
	invalidUser: {
		email: "fake.user@mail.com",
		password: "qwerty123"
	}
}