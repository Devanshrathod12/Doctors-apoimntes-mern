import { createContext } from "react";
import { doctors } from "../../assets/assets";
export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currncySymbol = "₹" // hardcoded show all plases
    const value = {
       doctors,currncySymbol
    }

    return (
        <AppContext.Provider  value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider