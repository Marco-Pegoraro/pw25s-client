import { useEffect } from "react";
import AuthService from "../../service/AuthService";

export function HomePage() {

    const user = localStorage.getItem('user');

    useEffect(() => {
        AuthService.checkToken()
            .then((response) => {
                console.log(response);
            })
            .catch((errorResponse) => {
                AuthService.logout();
                AuthService.isAuthenticated();
                window.location.reload();
                console.log(errorResponse);
            });
    });

    return (
        <div className="container">
            <h1 className="text-center">Seja Bem-vindo {user}</h1>
        </div>
    )

}