import { createContext, useState, useContext, useEffect } from "react";
import firebase from "./firebase";
interface context {
	signout: () => void;
	userId: number | null;
	user: User;
	signinWithGitHub: () => Promise<firebase.User>;
}
const authContext = createContext<context | null>(null);
export const ProvideAuth: React.FC = ({ children }) => {
	const auth = useProvideAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
	return useContext(authContext);
};
function useProvideAuth() {
	const [user, setUser] = useState(null);
	const signinWithGitHub = () => {
		return firebase
			.auth()
			.signInWithPopup(new firebase.auth.GithubAuthProvider())
			.then((rep) => {
				setUser(rep.user);
				return rep.user;
			});
	};

	const signout = () => {
		return firebase
			.auth()
			.signOut()
			.then(() => setUser(false));
	};
	useEffect(() => {
		const unsuscribe = firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(false);
			}
		});
		return () => unsuscribe();
	}, []);
	return {
		user,
		userId: user && user.uid,
		signinWithGitHub,
		signout,
	};
}
