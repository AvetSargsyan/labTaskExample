import dotenv from "dotenv";

dotenv.config();

class EnvDataProcessor {
	readonly baseUrl: string;
	readonly user: string;
	readonly userName: string;
	readonly userPass: string;
	readonly memberName: string;
	readonly memberPass: string;
	readonly authToken: string;

	constructor() {
		this.baseUrl = process.env.URL!;
		this.user = process.env.USER!;
		this.userName = process.env.USER_NAME!;
		this.userPass = process.env.USER_PASS!;
		this.memberName = process.env.MEMBER_NAME!;
		this.memberPass = process.env.MEMBER_PASS!;
		this.authToken = process.env.AUTH_TOKEN!;
	}
}

export default new EnvDataProcessor();
