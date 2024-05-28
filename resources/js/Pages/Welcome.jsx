import { Link } from "@inertiajs/react";
import Button from "@mui/material/Button";

export default function Welcome({}) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    return (
        <main className="flex flex-col justify-center items-center h-screen">
            <p className="text-5xl mb-2 font-bold tracking-widest uppercase">
                Tari pharmacy
            </p>
            <p className="tracking-wider mb-4">
                Manage your pharmacy system with ease
            </p>
            <div className="flex gap-5">
                <Button variant="outlined"><Link href={route("register")}>Sign Up</Link></Button>
                <Button variant="contained">
                    <Link href={route("login")}>Login</Link>
                </Button>
            </div>
        </main>
    );
}
