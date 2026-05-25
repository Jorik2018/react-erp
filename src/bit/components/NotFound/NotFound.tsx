import { useNavigate } from "react-router-dom";

import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";


import four_oh_four from "../../Assets/404.png";
import { Wrapper } from "./NotFound.styles";

const NotFound = () => {
  const navigator = useNavigate();
  const nav = () => navigator("/");

  return (
    <Wrapper>
      <div>
        <h1 className="header">Página solicitada no encontrada.</h1>
      </div>
      <div className="home">
        <h4>بازگشت به صفحه اصلی</h4>
        <div className="icon">
          <IconButton
            onClick={() => {
              nav();
            }}
          >
            <HomeIcon />
          </IconButton>
        </div>
      </div>
      <div className="image">
        <img src={four_oh_four} alt="404" width={500} height={500} />
      </div>
    </Wrapper>
  );
};

export default NotFound;
