import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IRegisterForm } from "../../commons/interface";
import { ButtonDisable } from "../../components/ButtonDisable";
import RegisterService from "../../service/RegisterService";

export function RegisterFormPage() {

    const [form, setForm] = useState({
        agency: '',
        bank: '',
        account: '',
        accountType: ''
    });

    const [errorForm, setErrorForm] = useState({
        defaultMessage: ''
    });

    const [pendingApiCall, setPendingApiCall] = useState(false);

    const [apiError, setApiError] = useState(false);

    const navigate = useNavigate();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setForm((previousForm) => {
            return {
                ...previousForm,
                [name]: value,
            };
        });
    };

    function capitalizeFirstLetter(message: string) {
        return message.charAt(0).toUpperCase() + message.slice(1);
    }

    const onClickInsert = () => {
        setPendingApiCall(true);

        const registerForm: IRegisterForm = {
            agency: form.agency,
            bank: form.bank,
            account: form.account,
            accountType: form.accountType
        };

        RegisterService.insertRegister(registerForm)
            .then((response) => {
                setPendingApiCall(false);
                console.log(response);
                navigate('/registers');
            })
            .catch((errorResponse) => {
                setApiError(true);
                setPendingApiCall(false);
                console.log(errorResponse);
                
                if (errorResponse.response.data) {
                    setErrorForm(errorResponse.response.data.errors[0]);
                    //isError(form.username, form.password, form.email);
                }
                
            });
    }

    return (
        <div className="container">
            <h2 className="text-center mt-3">REGISTRO DE CONTAS</h2>

            {apiError &&
                <div className="alert alert-danger col-6 mb-3 mx-auto">
                    Erro ao efetuar o registro. {capitalizeFirstLetter(errorForm.defaultMessage)}
                </div>
            }

            <div className="mx-auto col-6 mb-4">
                <label>Informe a agência</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Informe a agência"
                    onChange={onChange}
                    value={form.agency}
                    name="agency"
                />
            </div>

            <div className="mx-auto col-6 mb-4 ">
                <label>Informe o banco</label>
                <input
                    type="text"
                    className="form-control pe-5"
                    placeholder="Informe o banco"
                    onChange={onChange}
                    value={form.bank}
                    name="bank"
                />
            </div>

            <div className="mx-auto col-6 mb-4">
                <label>Informe a conta</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Informe a conta"
                    onChange={onChange}
                    value={form.account}
                    name="account"
                />
            </div>

            <div className="mx-auto col-6 mb-4">
                <label>Informe o tipo da conta</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Informe o tipo da conta"
                    onChange={onChange}
                    value={form.accountType}
                    name="accountType"
                />
            </div>

            <div className="text-center">
                <ButtonDisable
                    disabled={pendingApiCall}
                    className="btn btn-primary"
                    onClick={onClickInsert}
                    text="Cadastrar"
                />
            </div>

        </div>
    )

}