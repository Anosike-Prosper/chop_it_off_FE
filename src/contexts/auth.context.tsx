'use client';

import * as apis from '@/api';
import { createContext, useState, useContext } from 'react';
import { User, LoginInputType, OnboardingInputType } from '@/models/auth'

export type AuthContextType = {
	user: User | null;
	login: (values: LoginInputType) => Promise<string>
	signup: (values: OnboardingInputType) => Promise<string>
}

export const AuthContext = createContext({
	user: {},
	login: (values: LoginInputType) => { },
	signup: (values: OnboardingInputType) => { }
} as AuthContextType);

function setToken(token:string){
	localStorage.setItem('token', token)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState(null)
	const login = async (values: LoginInputType) => {
			const res = await apis.login(values)
			setToken(res.token)
			return res;
	}

	const signup = async (values: OnboardingInputType) => {
		// throw new Error('adf')
		const res = await apis.signup(values)

		console.log(values);
		return "me";
	}

	return (
		<AuthContext.Provider value={{
			user,
			login,
			signup
		}}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuthContext = () => useContext(AuthContext);

