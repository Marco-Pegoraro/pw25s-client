import { useEffect } from "react";
import AuthService from "../../service/AuthService";

export function HomePage() {

    const user = localStorage.getItem('user');

    useEffect(() => {
        //colocar aqui um pra validar token.
        console.log(user);
        AuthService.findUser(user)
            .then((response) => {
                localStorage.setItem("userId", response.data.id);
            })
            .catch((errorResponse) => {
                console.log(errorResponse);
            });
    });

    return (
        <div className="container">
            <h1 className="text-center">Seja Bem-vindo {user}</h1>
        </div>
    )

}