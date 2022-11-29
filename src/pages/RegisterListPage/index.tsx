import { useNavigate } from "react-router-dom";

export function RegisterListPage() {

    const navigate = useNavigate();

    const onClickNavigate = () => {
        navigate('/registers/new');
    }

    return (
        <div className="container">
            <div className="d-flex mt-4">
                <button className="btn btn-success col-3 mx-auto" onClick={onClickNavigate}>
                    ADICIONAR
                </button>
            </div>


        </div>
    )

}