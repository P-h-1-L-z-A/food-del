import { createContext, useState, useEffect } from "react";

export const AdminContext = createContext(null);

const AdminContextProvider = ({ children }) => {

    const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken") || "");

    const isAdmin = !!adminToken;

    const login = (token) => {
        setAdminToken(token);
        localStorage.setItem("adminToken", token);
    };

    const logout = () => {
        setAdminToken("");
        localStorage.removeItem("adminToken");
    };

    // Sync across tabs
    useEffect(() => {
        const handleStorage = (e) => {
            if (e.key === "adminToken") {
                setAdminToken(e.newValue || "");
            }
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    const contextValue = {
        adminToken,
        isAdmin,
        login,
        logout,
    };

    return (
        <AdminContext.Provider value={contextValue}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
