import firebase from "./firebase";

const firestore = firebase.firestore();
export const createUser = (data: dbUser) => {
	return firestore
		.collection("users")
		.doc(data.uid)
		.set({ ...data }, { merge: true });
};
export const createSite = (data: userCreatingSite) => {
	return firestore.collection("sites").add(data);
};
