export interface IUserLogin {
    username: string;
    password: string;
}

export interface IUserSignUp {
    username: string;
    password: string;
    email: string;
    phone: string;
}

export interface IUser {
    id?: number;
    username: string;
}

export interface IRegisterForm {
    agency: string;
    bank: string;
    user: IUser;
    account: string;
    accountType: string;
}

export interface IMovementForm {
    value: number;
    register: IRegisterForm;
    description: string;
    date: Date;
    type: string;
}