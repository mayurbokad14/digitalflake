import { createContext } from "react";

export const ActiveViewContext = createContext({
    activeView : "Home",
    handleActiveView: ()=> {}
});

export const UserLoggedIn = createContext({
    loginState : false,
    handleLoginState : () => {}
});