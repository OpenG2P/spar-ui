"use client";
import React, {createContext, useContext, ReactNode, useState} from "react";

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
  setProfile: (profile: AuthContextType["profile"]) => void;
}
interface SubmissionContextType {
  isDataSubmitted: boolean;
  setDataSubmitted: (status: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const SubmissionContext = createContext<SubmissionContextType | undefined>(undefined);
interface AuthProviderProps {
  children: ReactNode;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
export function useSubmission() {
  const context = useContext(SubmissionContext);

  if (!context) {
    throw new Error("useSubmission must be used within an AuthProvider");
  }

  return context;
}

export function AuthProvider({children}: AuthProviderProps) {
  const [profile, setProfile] = useState<AuthContextType["profile"]>(null);
  const [isDataSubmitted, setDataSubmitted] = useState<boolean>(false);
  const authContext: AuthContextType = {
    profile,
    getFaRaw: false,
    setProfile,
  };
  const submissionContext: SubmissionContextType = {
    isDataSubmitted,
    setDataSubmitted,
  };

  return (
    <AuthContext.Provider value={authContext}>
      <SubmissionContext.Provider value={submissionContext}>{children}</SubmissionContext.Provider>
    </AuthContext.Provider>
  );
}
