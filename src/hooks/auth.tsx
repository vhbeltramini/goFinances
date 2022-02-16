import React, { createContext, ReactNode, useContext } from 'react';

import * as AuthSession from 'expo-auth-session';

interface AuthProviderProps {
    children: ReactNode;
}

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface AuthContextData {
    user: User;
    signInWithGoogle(): Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({children}: AuthProviderProps) {

    const user = { 
        id: '1',
        name: 'Victor',
        email: 'victor@gmail.com',
    }

    async function signInWithGoogle() {
        try {
            console.log('signing in');
            const CLIENT_ID = '';
            const REDIRECT_URI = '';
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope${SCOPE}`;

            const response = await AuthSession.startAsync({ authUrl })

            console.log(response);

        } catch (error) {
            throw new Error();
        }

    }


    return (
        <AuthContext.Provider value={{ 
            user, 
            signInWithGoogle 
        }} >

            { children }
        </AuthContext.Provider>
    );
}

function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth}


