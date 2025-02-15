export interface AuthUser {
	name:string,
	email:string,
	phone:string,
	password:string,
	passwordConfirm: string,
}


export interface LoginUser {
	email: string,
	password: string,
}
