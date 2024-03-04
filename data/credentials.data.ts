import envData from "./envDataProcessor.data";


export const credentialsData = {
	user: envData.user,
	validUser:{
		email: envData.userName,
		password: envData.userPass,
	},
	invalidUser: {
		email: "fake.user@mail.com",
		password: "qwerty123"
	},
	validMember: {
		email: envData.memberName,
		password: envData.memberPass
	},
	invalidMember: {
		email: "fakeMember",
		password: "asdfg123"
	},
};