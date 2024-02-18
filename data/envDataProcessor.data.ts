import dotenv from "dotenv";

dotenv.config();

export const envData = {
	basUrl : process.env.URL,
	userName : process.env.USER_NAME,
	userPass : process.env.USER_PASS,
};