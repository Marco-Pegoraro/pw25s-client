import { Route, Routes } from "react-router-dom";
import { NavBar } from "../../components/NavBar";
import { HomePage } from "../../pages/HomePage";
import { LoginPage } from "../../pages/LoginPage";
import { MoveFormPage } from "../../pages/MoveFormPage";
import { MoveListPage } from "../../pages/MoveListPage";
import { RegisterFormPage } from "../../pages/RegisterFormPage";
import { RegisterListPage } from "../../pages/RegisterListPage";

export function AuthenticatedRoutes() {

    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/movements" element={<MoveListPage />} />
                <Route path="/movements/new" element={<MoveFormPage />} />
                <Route path="/movements/:id" element={<MoveFormPage />} />

                <Route path="/registers" element={<RegisterListPage />} />
                <Route path="/registers/new" element={<RegisterFormPage />} />
                <Route path="/registers/:id" element={<RegisterFormPage />} />

                <Route path="*" element={<HomePage />} />
            </Routes>
        </>
    )

}