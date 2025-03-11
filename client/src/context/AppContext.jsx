import { createContext, useState } from "react";

// Create the context
export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null); //if true,crdits page shows purchase option
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken ] = useState(localStorage.getItem('token'))
    const [credit,setCredit ] = useState(false)

    const backendurl = import.meta.env.VITE_BACKEND_URL 

    // The value to be passed to the context
    const value = {
        user,
        setUser,
        showLogin,
        setShowLogin,
        backendurl,
        token,
        setToken,
        credit,
        setCredit
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
