export interface IUser {
	id: number;
	email: string;
}

export interface AuthContextData {
	user: IUser | null;
	signed: boolean;
	signIn: (credentials: { email: string; password: string }) => Promise<void>;
	signOut: () => void;
}

export interface IAuthProvider {
	children: JSX.Element;
}
