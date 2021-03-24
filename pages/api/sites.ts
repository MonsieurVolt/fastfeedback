import { NextApiRequest, NextApiResponse } from "next";
import db from "lib/firebase-admin";
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const snapshot = await db.collection("sites").get();
	const site: any[] = [];
	snapshot.forEach((doc) => {
		site.push({ id: doc.id, ...doc.data() });
	});
	res.status(200).json({ site });
};
