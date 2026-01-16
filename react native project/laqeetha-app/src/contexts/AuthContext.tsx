import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthService, setAuthToken } from "../services/api";

interface User {
    id: number;
    name: string;
    email?: string;
    phone: string;
    type: "customer" | "seller";
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (
        email: string,
        password: string,
        type?: "customer" | "seller"
    ) => Promise<void>;
    register: (data: any, type?: "customer" | "seller") => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Load saved auth data on app start
    useEffect(() => {
        loadAuthData();
    }, []);

    const loadAuthData = async () => {
        try {
            const savedToken = await AsyncStorage.getItem("auth_token");
            const savedUser = await AsyncStorage.getItem("auth_user");

            if (savedToken && savedUser) {
                setToken(savedToken);
                setUser(JSON.parse(savedUser));
                setAuthToken(savedToken); // Set token in API service
            }
        } catch (error) {
            console.error("Error loading auth data:", error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (
        email: string,
        password: string,
        type: "customer" | "seller" = "customer"
    ) => {
        try {
            let response;
            if (type === "customer") {
                response = await AuthService.customerLogin(email, password);
            } else {
                response = await AuthService.sellerLogin(email, password);
            }

            // Save to state
            setUser(response.user);
            setToken(response.token);

            // Save to AsyncStorage
            await AsyncStorage.setItem("auth_token", response.token);
            await AsyncStorage.setItem(
                "auth_user",
                JSON.stringify(response.user)
            );

            // Set token in API service
            setAuthToken(response.token);
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const register = async (
        data: any,
        type: "customer" | "seller" = "customer"
    ) => {
        try {
            let response;
            if (type === "customer") {
                response = await AuthService.customerRegister(data);
            } else {
                response = await AuthService.sellerRegister(data);
            }

            // Save to state
            setUser(response.user);
            setToken(response.token);

            // Save to AsyncStorage
            await AsyncStorage.setItem("auth_token", response.token);
            await AsyncStorage.setItem(
                "auth_user",
                JSON.stringify(response.user)
            );

            // Set token in API service
            setAuthToken(response.token);
        } catch (error) {
            console.error("Register error:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            // Call logout API
            await AuthService.customerLogout();
        } catch (error) {
            console.error("Logout API error:", error);
        } finally {
            // Clear state
            setUser(null);
            setToken(null);

            // Clear AsyncStorage
            await AsyncStorage.removeItem("auth_token");
            await AsyncStorage.removeItem("auth_user");

            // Clear token from API service
            setAuthToken(null);
        }
    };

    const value = {
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!token && !!user,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
