import { IRegisterForm } from "../commons/interface";
import { api } from "../lib/axios";

const insertRegister = (register: IRegisterForm) => {
    return api.post('/registers', register);
}

const RegisterService = {
    insertRegister
}
export default RegisterService;