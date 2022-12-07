import { ChangeEvent, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import { IMovementForm, IRegisterList } from "../../commons/interface";
import { ButtonDisable } from "../../components/ButtonDisable";
import { Input } from "../../components/Input";
import MovementService from "../../service/MovementService";
import RegisterService from "../../service/RegisterService";

export function MoveFormPage() {

    const [form, setForm] = useState<IMovementForm>({
        id: undefined,
        value: 0,
        register: { id: undefined, bank: '' },
        description: '',
        date: '',
        type: ''
    });

    const [valueError, setValueError] = useState(false);

    const [descriptionError, setDescriptionError] = useState(false);

    const [registers, setRegisters] = useState<IRegisterList[]>([]);

    const [pendingApiCall, setPendingApiCall] = useState(false);

    const [apiError, setApiError] = useState(false);

    const [errorForm, setErrorForm] = useState({
        defaultMessage: ''
    });

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {

        RegisterService.findAllByUser()
            .then((response) => {
                setRegisters(response.data);
                if (id) {
                    MovementService.findOneById(parseInt(id))
                        .then((response) => {
                            if (response.data) {
                                setForm({
                                    id: response.data.id,
                                    value: response.data.value,
                                    register: { id: response.data.register.id, bank: '' },
                                    description: response.data.description,
                                    date: response.data.date,
                                    type: response.data.type
                                });
                                setApiError(false);
                            } else {
                                setApiError(true);
                            }
                        })
                        .catch((erro) => {
                            setApiError(true);
                        });
                } else {
                    setForm((previousForm) => {
                        return {
                            ...previousForm,
                            category: { id: response.data[0].id, name: '' },
                        };
                    });
                }
                setApiError(false);
            })
            .catch((erro) => {
                setApiError(true);
            });
    }, []);

    const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value, name } = event.target;
        setForm((previousForm) => {
            return {
                ...previousForm,
                [name]: value,
            };
        });
    };

    const onChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        const { value, name } = event.target;
        setForm((previousForm) => {
            return {
                ...previousForm,
                [name]: { id: value },
            };
        });
    };

    function capitalizeFirstLetter(message: string) {
        return message.charAt(0).toUpperCase() + message.slice(1);
    }

    const isError = (value: string, description: string) => {

        if (value == '') {
            setValueError(true);
        }
        else if (description == '') {
            setValueError(false);
            setDescriptionError(true);
        }
        else {
            setDescriptionError(false);
        }

    }

    const onClickInsert = () => {
        setPendingApiCall(true);

        const movementForm: IMovementForm = {
            id: form.id,
            value: form.value!,
            register: form.register,
            description: form.description,
            date: form.date,
            type: form.type
        }

        MovementService.insertMovement(movementForm)
            .then((response) => {
                setPendingApiCall(false);
                console.log(response);
                navigate('/movements');
            })
            .catch((errorResponse) => {
                setApiError(true);
                setPendingApiCall(false);
                console.log(errorResponse);

                if (errorResponse.response.data) {
                    setErrorForm(errorResponse.response.data.errors[0]);
                    isError(form.value.toString(), form.description);
                }
            });
    }

    return (
        <div className="container">
            <h2 className="text-center mt-3">MOVIMENTAÇÕES</h2>

            {apiError &&
                <div className="alert alert-danger col-6 mb-3 mx-auto">
                    Erro ao inserir movimentação. <b>ERRO:</b> {capitalizeFirstLetter(errorForm.defaultMessage)}
                </div>
            }

            <div className="mx-auto col-6 mb-4">
                <label>Valor</label>
                <Input
                    type="text"
                    className="form-control"
                    placeholder="Valor da transação"
                    onChange={onChange}
                    value={form.value.toString()}
                    name="value"
                    hasError={valueError}
                />
            </div>

            <div className="mx-auto col-6">
                <label>Data</label>
                <Input
                    className="form-control mx-auto col-12 mb-4"
                    type="date"
                    placeholder="Selecione o dia da movimentação"
                    onChange={onChange}
                    value={form.date}
                    name="date" 
                    hasError={false}                
                />
            </div>

            <div className="mx-auto col-6 mb-4">
                <label>Descrição da movimentação</label>
                <Input
                    type="text"
                    className="form-control"
                    placeholder="Descrição da movimentação..."
                    onChange={onChange}
                    value={form.description}
                    name="description"
                    hasError={descriptionError}
                />
            </div>

            <div className="mx-auto col-6 mb-4">
                <label>Tipo Transação</label>
                <select
                    className="form-control"
                    name="type"
                    value={form.type}
                    onChange={onChange}>
                    <option selected value={""}></option>
                    <option value={"Recebimento"}>Recebimento</option>
                    <option value={"Pagamento"}>Pagamento</option>
                </select>
            </div>

            <div className="mx-auto col-6 mb-4">
                <label>Bancos Registrados</label>
                <select
                    className="form-control"
                    name="register"
                    value={form.register.id}
                    onChange={onChangeSelect}
                >
                    {registers.map((register: IRegisterList) => (
                        <option key={register.id} value={register.id}>
                            {register.bank}
                        </option>
                    ))}
                </select>
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