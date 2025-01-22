import { createContext, useState } from "react";

// Create the context
export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);

    // The value to be passed to the context
    const value = {
        user,
        setUser,
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
