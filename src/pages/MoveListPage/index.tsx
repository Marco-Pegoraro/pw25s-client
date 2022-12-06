import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IMovementForm } from "../../commons/interface";
import MovementService from "../../service/MovementService";

export function MoveListPage() {

    const navigate = useNavigate();

    const onClickNavigate = () => {
        navigate('/movements/new');
    }

    const [apiError, setApiError] = useState("");

    const [data, setData] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        MovementService.findAllByUser()
            .then((response) => {
                setData(response.data);
                setApiError("");
            })
            .catch((responseError) => {
                setApiError("Falha ao carregar lista de registros.");
            });
    }

    const onClickRemove = (id?: number) => {
        if (id) {
            MovementService.remove(id)
                .then((response) => {
                    loadData();
                    setApiError("");
                })
                .catch((responseError) => {
                    setApiError("Falha ao remover o registro.");
                });
        }
    }

    return (
        <div className="container">
            <div className="d-flex mt-4">
                <button className="btn btn-success col-3 mx-auto" onClick={onClickNavigate}>
                    ADICIONAR
                </button>
            </div>

            <table className="table table-striped mt-4">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Data</td>
                        <td>Descrição</td>
                        <td>Tipo</td>
                        <td>Valor</td>
                        <td>Conta Banco</td>
                        <td>Editar</td>
                        <td>Remover</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map((movement: IMovementForm) => (
                        <tr key={movement.id}>
                            <td>{movement.id}</td>
                            <td>{movement.date}</td>
                            <td>{movement.description}</td>
                            <td>{movement.type}</td>
                            <td>{movement.value}</td>
                            <td>{movement.register!.bank}</td>
                            <td>
                                <Link className="btn btn-primary"
                                    to={`/movements/${movement.id}`}>
                                    Editar
                                </Link>
                            </td>
                            <td>
                                <button className="btn btn-danger"
                                    onClick={() => onClickRemove(movement.id)}>
                                    Remover
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {apiError &&
                <div className="alert alert-danger">{apiError}</div>
            }

        </div>
    )

}