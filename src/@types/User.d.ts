export interface ISignIn {
	email: string;
	password: string;
}

export interface IAccount extends ISignIn {
	name: string;
	confirPassword: string;
}
