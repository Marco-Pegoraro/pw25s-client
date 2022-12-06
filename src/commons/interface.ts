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

export interface IRegisterForm {
    id?: number;
    agency: string;
    bank: string;
    account: string;
    accountType: string;
}

export interface IRegisterList {
    id?: number;
    bank: string;
}

export interface IMovementForm {
    id?: number;
    value: number;
    register: IRegisterList;
    description: string;
    date: string;
    type: string;
}