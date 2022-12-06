import { IMovementForm } from "../commons/interface";
import { api } from "../lib/axios";

const insertMovement = (movement: IMovementForm) => {
    return api.post('/movements', movement);
}

//-----------------------------------------------------

const findAllByUser = () => {
    return api.get('/movements/userMovement');
}

//-----------------------------------------------------

const remove = (id: number) => {
    return api.delete(`/movements/${id}`);
}

//-----------------------------------------------------

const findOneById = (id: number) => {
    return api.get(`/movements/${id}`);
}

const MovementService = {
    insertMovement,
    findAllByUser,
    remove,
    findOneById
}
export default MovementService;