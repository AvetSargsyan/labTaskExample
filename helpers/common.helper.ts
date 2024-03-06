export async function wait(millis: number): Promise<unknown> {
	return new Promise((resolve) => setTimeout(resolve, millis));
}


export async function waitForCondition(
	message: string,
	condition: () => Promise<boolean>,
	timeBetweenIterations = 1000,
	timeToWaitInMilliseconds = 10000) {
	const dateToStop = Date.now() + timeToWaitInMilliseconds;

	while (Date.now() < dateToStop) {
		if(await condition()) {
			return;
		}

		await wait(timeBetweenIterations);
	}
	throw Error(`${timeToWaitInMilliseconds}ms timeout for ${message} condition has passed`);
}
