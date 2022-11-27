import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../../pages/LoginPage";
import { SignUpPage } from "../../pages/SignUpPage";

export function SignRoutes() {

    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            <Route path="*" element={<LoginPage />} />
        </Routes>
    )

}