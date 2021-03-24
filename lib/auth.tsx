import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "./firebase";
import { createUser } from "./db";
interface ContextInterface {
	user: dbUser | false;
	signinWithGitHub: () => Promise<dbUser | false>;
	signout: () => Promise<false | dbUser>;
}
const authContext = createContext<ContextInterface>({
	user: false,
	signinWithGitHub: async () => false,
	signout: async () => false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const auth = useProvideAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
	return useContext(authContext);
};

function useProvideAuth(): ContextInterface {
	const [user, setUser] = useState<dbUser | false>(false);

	const handleUser = (
		rawUser: firebase.User | false | null
	): dbUser | false => {
		if (rawUser) {
			const user = formatUser(rawUser);

			createUser(user);
			setUser(user);
			return user;
		} else {
			setUser(false);
			return false;
		}
	};

	const signinWithGitHub = async () => {
		return firebase
			.auth()
			.signInWithPopup(new firebase.auth.GithubAuthProvider())
			.then((response) => handleUser(response.user || false));
	};

	const signout = async () => {
		return firebase
			.auth()
			.signOut()
			.then(() => handleUser(false));
	};

	useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);

		return () => unsubscribe();
	}, []);

	return {
		user,
		signinWithGitHub,
		signout,
	};
}

const formatUser = (user: firebase.User): dbUser => {
	return {
		uid: user.uid,
		email: user.email || "",
		name: user.displayName || "",
		provider: user.providerData,
		photoUrl: user.photoURL || "",
	};
};
