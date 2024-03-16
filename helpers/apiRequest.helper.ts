import axios from "axios";
import envData from "../data/envDataProcessor.data";

export async function getLaunchesComponentsData(user: string) {
  const url = `${envData.baseUrl}/api/v1/${user}_personal/launch?page.page=
	1&page.size=50&page.sort=startTime%2Cnumber%2CDESC`;

  const response = await axios.get(url, {
    headers: {
      Accept: "application/json, text/plain, */*",
      Authorization: envData.authToken,
    },
  });

  return response.data.content;
}
