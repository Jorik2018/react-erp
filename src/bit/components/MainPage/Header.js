import { useContext } from "react";

import { Wrapper } from "./Header.styles";

import LogoutIcon from "@mui/icons-material/Logout";

import { authContext } from "../../App";
import { logoutHandler } from "./MainPageHandlers";

const MainHeader = () => {
  const { auth, setAuth } = useContext(authContext);
  return (
    <>
      <Wrapper>
        <div className="container">
          <div>
            {auth ? (
              <div
                className="logout-container"
                onClick={() => {
                  logoutHandler();
                  sessionStorage.removeItem("token");
                  sessionStorage.removeItem("user");
                  setAuth(false);
                }}
              >
                <div>
                  <LogoutIcon />
                </div>
                <div className="exit">Salida</div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </Wrapper>
    </>
  );
};
export default MainHeader;
