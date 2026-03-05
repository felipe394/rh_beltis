import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'colaborador';

export interface AuthUser {
    email: string;
    role: UserRole;
    name: string;
}

interface AuthContextType {
    user: AuthUser | null;
    login: (email: string, password: string, rememberMe: boolean) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Simulated users - In production, this comes from the API
const MOCK_USERS: (AuthUser & { password: string })[] = [
    { email: 'admin@teste.com', password: 'teste', role: 'admin', name: 'Admin Teste' },
    { email: 'admin@beltis.com.br', password: '123456', role: 'admin', name: 'Administrador' },
    { email: 'colaborador@beltis.com.br', password: '123456', role: 'colaborador', name: 'João Silva' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load persisted session on startup
    useEffect(() => {
        const savedUser = localStorage.getItem('beltis_user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch {
                localStorage.removeItem('beltis_user');
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string, rememberMe: boolean): Promise<boolean> => {
        // Simulate API call delay
        await new Promise((r) => setTimeout(r, 800));

        const found = MOCK_USERS.find(
            (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (found) {
            const authUser: AuthUser = { email: found.email, role: found.role, name: found.name };
            setUser(authUser);
            if (rememberMe) {
                localStorage.setItem('beltis_user', JSON.stringify(authUser));
            } else {
                sessionStorage.setItem('beltis_user_session', JSON.stringify(authUser));
                localStorage.removeItem('beltis_user');
            }
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('beltis_user');
        sessionStorage.removeItem('beltis_user_session');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
};
