import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { FooterComponent, NavbarComponent } from "./components";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { state } = useContext(AuthContext);

  const { user, loading } = state;
  return (
    <div className="dark:bg-dark-background ">
      {user && <NavbarComponent />}
      <div className=" max-w-[1200px] mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
