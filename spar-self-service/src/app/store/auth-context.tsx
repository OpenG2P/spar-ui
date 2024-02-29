'use client'
import React, { createContext, useContext, ReactNode, useState } from 'react';

interface AuthContextType {
    profile: {
        sub?: string;
        name?: string;
        given_name?: string;
        family_name?: string;
        middle_name?: string;
        picture?: string;
        email?: string;
        gender?: string;
        birthdate?: string;
        address?: any;
        phone_number?: string;
    } | null;
    getFaRaw: boolean;
    setProfile: (profile: AuthContextType['profile']) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [profile, setProfile] = useState<AuthContextType['profile']>(null);
    const authContext: AuthContextType = {
        profile,
        getFaRaw: false,
        setProfile
        
    };

    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
}
