import React, {
	useState,
	useEffect,
	useContext,
	createContext,
	ProviderProps,
} from "react";
import firebase from "./firebase";
import { createUser } from "./db";
interface ContextInterface {
	user: UserDataBase;
	signinWithGitHub: () => Promise<false | UserDataBase>;
	signout: () => Promise<false | UserDataBase>;
}
const authContext = createContext<ContextInterface>(null);

export function AuthProvider({ children }) {
	const auth = useProvideAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
	return useContext(authContext);
};

function useProvideAuth(): ContextInterface {
	const [user, setUser] = useState(null);

	const handleUser = (
		rawUser: firebase.User | false
	): UserDataBase | false => {
		if (rawUser) {
			const user = formatUser(rawUser);

			createUser(user.uid, user);
			setUser(user);
			return user;
		} else {
			setUser(false);
			return false;
		}
	};

	const signinWithGitHub = () => {
		return firebase
			.auth()
			.signInWithPopup(new firebase.auth.GithubAuthProvider())
			.then((response) => handleUser(response.user));
	};

	const signout = () => {
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

const formatUser = (user: firebase.User): UserDataBase => {
	return {
		uid: user.uid,
		email: user.email,
		name: user.displayName,
		provider: user.providerData[0].providerId,
		photoUrl: user.photoURL,
	};
};
