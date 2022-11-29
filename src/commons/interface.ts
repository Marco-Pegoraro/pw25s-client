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
    agency: string;
    bank: string;
    user: string; //Arrumar
    account: string;
    accountType: string;
}