import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export default function AuthContextProvider({ children }) {
    const [pass, setPass] = useState("");

    return (
        <AuthContext.Provider value={{ pass, setPass }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within an AuthContextProvider");
    }
    return ctx;
}
