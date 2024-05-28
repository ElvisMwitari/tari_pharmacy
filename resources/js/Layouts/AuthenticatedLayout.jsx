import { useRef, useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import LockScreen from "react-lock-screen";
import { Button, TextField } from "@mui/material";
import Modal from "@/Components/Modal";
import AuthContextProvider, { useAuth } from "@/Hooks/useAuth";

export default function Authenticated({ user, header, children }) {
    const passRef = useRef();
    const [passCode, setPassCode] = useState("");
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const [showModal, setShowModal] = useState(false);

    const { pass } = useAuth();
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const getLockScreenUi = (setLock) => {
        return (
            <div className="flex w-full h-full top-0 left-0 absolute justify-center items-center">
                <div className="flex flex-col gap-4">
                    <TextField
                        variant="outlined"
                        label="Enter your password"
                        type="password"
                        ref={passRef}
                        value={passCode}
                        onChange={(e) => setPassCode(e.target.value)}
                    />
                    <Button
                        onClick={() => {
                            if (passCode !== pass) {
                                console.log("wrong", pass);
                            } else {
                                setLock(false);
                            }
                        }}
                        variant="contained"
                    >
                        unlock
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <LockScreen timeout={5000} ui={getLockScreenUi}>
            <div className="min-h-screen bg-gray-100">
                <nav className="bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="shrink-0 flex items-center">
                                    <Link href="/">
                                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                    </Link>
                                </div>

                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                    <NavLink
                                        href={route("dashboard")}
                                        active={route().current("dashboard")}
                                    >
                                        Dashboard
                                    </NavLink>
                                </div>
                            </div>

                            <div className="hidden sm:flex sm:items-center sm:ms-6">
                                <div className="ms-3 relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    {user.name}

                                                    <svg
                                                        className="ms-2 -me-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                href={route("profile.edit")}
                                            >
                                                Profile
                                            </Dropdown.Link>
                                            <button
                                                className="px-4 text-sm text-slate-700"
                                                onClick={() =>
                                                    setShowModal(true)
                                                }
                                            >
                                                Log out
                                            </button>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>

                            <div className="-me-2 flex items-center sm:hidden">
                                <button
                                    onClick={() =>
                                        setShowingNavigationDropdown(
                                            (previousState) => !previousState,
                                        )
                                    }
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            className={
                                                !showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={
                                                showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className={
                            (showingNavigationDropdown ? "block" : "hidden") +
                            " sm:hidden"
                        }
                    >
                        <div className="pt-2 pb-3 space-y-1">
                            <ResponsiveNavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                            >
                                Dashboard
                            </ResponsiveNavLink>
                        </div>

                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="px-4">
                                <div className="font-medium text-base text-gray-800">
                                    {user.name}
                                </div>
                                <div className="font-medium text-sm text-gray-500">
                                    {user.email}
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route("profile.edit")}>
                                    Profile
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                >
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </nav>

                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                {showModal && (
                    <Modal
                        show={true}
                        closeable={true}
                        onClose={handleCloseModal}
                    >
                        <div className="px-8 py-4 flex flex-col gap-4 w-full items-center justify-center">
                            <p>Are you sure you want to log out?</p>
                            <div className="flex gap-4">
                                <Button
                                    variant="outlined"
                                    onClick={handleCloseModal}
                                >
                                    Cancel
                                </Button>
                                <Link href={route("logout")} method="post">
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() =>
                                            window.location.replace("/")
                                        }
                                    >
                                        Log out
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Modal>
                )}

                <main>{children}</main>
            </div>
        </LockScreen>
    );
}
