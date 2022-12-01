import { ChangeEvent, useState } from "react";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

export function MoveFormPage() {

    const [form, setForm] = useState({
        value: '',
        register: '',
        description: '',
        date: '',
        type: ''
    });

    const [startDate, setStartDate] = useState<Date | null>(new Date());

    const [pendingApiCall, setPendingApiCall] = useState(false);

    const [apiError, setApiError] = useState(false);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setForm((previousForm) => {
            return {
                ...previousForm,
                [name]: value,
            };
        });
    };

    return (
        <div className="container">
            <h2 className="text-center mt-3">MOVIMENTAÇÕES</h2>

            {apiError &&
                <div className="alert alert-danger col-6 mb-3 mx-auto">
                    Erro ao inserir movimentação.
                </div>
            }

            <div className="mx-auto col-6 mb-4">
                <label>Descrição da movimentação</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Descrição da movimentação..."
                    onChange={onChange}
                    value={form.description}
                    name="description"
                />
            </div>

            <div className="mx-auto col-6 mb-4">
                <DatePicker
                    selected={startDate} onChange={(date) => setStartDate(date)}
                    dateFormat="dd/MM/yyyy"
                    popperPlacement="right-end"
                    customInput={
                        <input
                            className="form-control mx-auto col-12 mb-4"
                            type="text"
                            placeholder="Selecione o dia da movimentação"
                            onChange={onChange}
                            value={form.date}
                            name="date"
                        />
                    }
                />
            </div>
        </div>
    )

}