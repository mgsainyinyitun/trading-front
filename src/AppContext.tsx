import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Customer {
    id: number;
    email: string;
    name: string;
    phone: string;
    loginId: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    customer: Customer | null;
    login: (newToken: string, newCustomer: Customer) => void;
    logout: () => void;
}

const AppContext = createContext<AuthContextType>({
    isAuthenticated: false,
    token: null,
    customer: null,
    login: () => { },
    logout: () => { },
});

interface ProviderProps {
    children: ReactNode;
}

function CtxProvider({ children }: ProviderProps) {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
    const [customer, setCustomer] = useState<Customer | null>(() => {
        const savedCustomer = localStorage.getItem('customer');
        return savedCustomer ? JSON.parse(savedCustomer) : null;
    });

    const login = (newToken: string, newCustomer: Customer) => {
        setToken(newToken);
        setCustomer(newCustomer);
        localStorage.setItem('token', newToken);
        localStorage.setItem('customer', JSON.stringify(newCustomer));
    };

    const logout = () => {
        setToken(null);
        setCustomer(null);
        localStorage.removeItem('token');
        localStorage.removeItem('customer');
    };

    return (
        <AppContext.Provider
            value={{
                isAuthenticated: !!token,
                token,
                customer,
                login,
                logout,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

//export const useAuth = () => useContext(AppContext);
// Create a custom hook to use the context
const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useMyContext must be used within a MyProvider');
    }
    return context;
};

export { CtxProvider, useAppContext };