import { useNavigate } from "react-router-dom";
import { setParam } from "../../Global/global-functions";

import { Wrapper } from "./Dashboad.header.styles";

const DashboardHeader = ({ show, setShow, dashboradTitle }) => {
  const navigator = useNavigate();

  const nav = (url) => navigator(url);

  const holder = () => {
    if (dashboradTitle === "manager") {
      return "gestión escolar";
    } else if (dashboradTitle === "teacher") {
      return "gestión de la clase";
    } else {
      return "clases";
    }
  };

  return (
    <>
      <Wrapper>
        <div className="flex-item">
          <button
            onClick={() => {
              nav("./profile");
              setShow(true);
            }}
            className={`header-button ${show ? "show" : "hide"}`}
          >
            پروفایل
          </button>
        </div>
        <div className="flex-item">
          <button
            onClick={() => {
              nav(`./${setParam(dashboradTitle.role)}/info`);
              setShow(false);
            }}
            className={`header-button ${show ? "hide" : "show"}`}
          >
            {holder()}
          </button>
        </div>
      </Wrapper>
    </>
  );
};

export default DashboardHeader;
