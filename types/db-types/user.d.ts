interface userCreatingSite {
	name: string;
	url: string;
	authorId: string;
	createdAt: string;
}
interface dbUser {
	email: string;
	name: string;
	photoUrl: string;
	provider: (null | firebase.UserInfo)[];
	uid: string;
}
interface dbSites {
	authorId: string;
	createdAt: string;
	name: string;
	url: string;
	id: string;
}
interface ApiSites {
	sites: dbSites[];
}
