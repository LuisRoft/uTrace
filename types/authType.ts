import { ReactNode } from "react";

export type AuthContextType = {
    isAuthenticated: boolean | undefined;
    user: User | null;
    login: (credentials: LoginCredentials) => Promise<any>;
    logout: () => Promise<void>;
    register: (userInfo: RegisterInfo) => Promise<any>;
}

export type LoginCredentials = {
    email: string;
    password: string;
}

export type RegisterInfo = {
    email: string;
    password: string;
    username: string;
}

export type User = {
    userId: string;
    username: string;
    email: string;
}

export type AuthProviderProps = {
    children: ReactNode;
}