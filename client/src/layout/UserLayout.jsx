import { Outlet } from "react-router-dom";
import { Header } from "../components/header/Header";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Login } from "../pages/Login";

export function UserLayout() {
    const { role } = useContext(GlobalContext);
    const content = ['admin', 'worker'].includes(role) ? <Outlet /> : <Login />;

    return (
        <>
            <Header />
            <main className="pb-5">{content}</main>
        </>
    )
}