import React, { createContext, useState } from 'react';


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user] = useState(localStorage.getItem('user'));

    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;