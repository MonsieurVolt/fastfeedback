import { Fetcher } from "swr/dist/types";

const fetcher: Fetcher<dbUser> = async (url: string, ...args) => {
	const res = await fetch(url, ...args);
	return res.json();
};
export default fetcher;
