import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route } from "react-router-dom";
// import { useState } from "react";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import PlanBRegisterPage from "./pages/PlanBRegisterPage/PlanBRegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
// import SwipePage from "./pages/SwipePage/SwipePage";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // let page = isLoggedIn ? <MainPage /> : <LoginPage />;
  return (
    <BrowserRouter>
      {/* <Route path="/swipe">
        <SwipePage />
      </Route> */}
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/register">
        <PlanBRegisterPage />
      </Route>
      <Route path="/profile">
        <ProfilePage />
      </Route>
    </BrowserRouter>
  );
}

export default App;
