import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export function PublicLayout() {
    return (
        <>
            <Header/>
            <main><Outlet /></main>
        </>
    )
}