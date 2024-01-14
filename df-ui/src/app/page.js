'use client';
import { useState } from "react";
import HomePage from "./home";
import LoginPage from "./login";
import { UserLoggedIn } from "./store/active-view-context";

export default function App() {

  const [showLoginPage, setShowLoginPage] = useState(true);

  const ctxVal = {
    loginState: showLoginPage,
    handleLoginState: setShowLoginPage
  };


  return (
    <UserLoggedIn.Provider value={ctxVal}>
    <>
      {
        showLoginPage ? <LoginPage /> : <HomePage />
      }
    </>
    </UserLoggedIn.Provider>
  );
  
}