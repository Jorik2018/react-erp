import { useContext, useEffect, useState } from "react";
import { Content, Heading } from "./MainPage.styles";
import Header from "../Header/Header";

import SignIn from "../Sign-in/Sign-in";
import SignUp from "../Sign-up/Sign-up";
import Footer from "../Footer/Footer";

import { authContext } from "../../App";
import MainHeader from "./Header";

const MainPage = () => {
  const { auth, setAuth } = useContext(authContext);

  const [state, setState] = useState(true);

  useEffect(() => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setAuth(false);
  }, []);

  return (
    <>
      <MainHeader />
        <Content>
          <Header login={state} setLogin={setState} />
          {state ? (
            <SignIn action="SET-LOGIN-STATE" />
          ) : (
            <SignUp action="SET-SIGNUP-STATE" />
          )}
        </Content>
      <Footer />
    </>
  );
};

export default MainPage;
