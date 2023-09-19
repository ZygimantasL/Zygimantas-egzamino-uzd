import { Outlet } from "react-router-dom";

export function PublicLayout() {
    return (
        <>
            <header>HEADER</header>
            <main><Outlet /></main>
            <footer>FOOTER</footer>
        </>
    )
}