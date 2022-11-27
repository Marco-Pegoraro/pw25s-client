
export function HomePage() {

    const user = localStorage.getItem('user');

    return (
        <div className="container">
            <h1 className="text-center">Seja Bem-vindo {user}</h1>
        </div>
    )

}