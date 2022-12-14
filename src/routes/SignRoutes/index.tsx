import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../../pages/LoginPage";
import { NotFoundPage } from "../../pages/NotFoundPage";
import { SignUpPage } from "../../pages/SignUpPage";

export function SignRoutes() {

    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )

}