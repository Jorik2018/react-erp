import { useContext, useReducer } from "react";

import { Wrapper } from "../Sign-in/sign-in.styles";
import { Content } from "./Sign-up.styles";
import {
  signUpHandler,
  valid_username,
  valid_password,
  valid_email,
} from "./Sign-up.handlers";

import { signUpReducer } from "./Sign-up.reducer";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../App";

const SignUp = ({ action }) => {
  const { auth, setAuth } = useContext(authContext);

  const initialState = {
    username: "",
    password: "",
    email: "",
    role: "manager",
    validUsername: true,
    validPassword: true,
    validEmail: true,
    validSignUp: true,
  };
  const navigator = useNavigate();

  const [state, dispatch] = useReducer(signUpReducer, initialState);
  const {
    username,
    password,
    email,
    role,
    validUsername,
    validPassword,
    validEmail,
    validSignUp,
  } = state;

  const nav = () =>
    navigator(`./accounts/${sessionStorage.getItem("user")}/management/info`);

  return (
    <>
      <Wrapper>
        <Content>
          <form
            onSubmit={(e) =>
              signUpHandler(e, state, dispatch, action, nav, setAuth)
            }
          >
            <div className="flex-item label">نام کاربری</div>
            <div className="flex-item input">
              <input
                autoFocus
                value={username}
                onChange={(e) =>
                  dispatch({ type: "SET-USERNAME", payload: e.target.value })
                }
                onBlur={() => valid_username(username, dispatch)}
                className={`${validUsername ? "inp" : "inp error"}`}
                type="text"
                placeholder="Código Nacional"
              />
              <div
                className={validUsername ? "error-msg-hide" : "error-msg-show"}
              >
             Por favor ingrese su código nacional de diez dígitos </div>
            </div>
            <div className="flex-item label">Contraseña</div>
            <div className="flex-item input">
              <input
                value={password}
                onChange={(e) =>
                  dispatch({ type: "SET-PASSWORD", payload: e.target.value })
                }
                onBlur={() => valid_password(password, dispatch)}
                className={`${validPassword ? "inp" : "inp error"}`}
                type="text"
                placeholder="código de acceso"
              />
              <div
                className={validPassword ? "error-msg-hide" : "error-msg-show"}
              >
              La contraseña debe contener al menos ocho caracteres</div>
            </div>
            <div className="flex-item label">correo electrónico</div>
            <div className="flex-item input">
              <input
                value={email}
                onChange={(e) =>
                  dispatch({ type: "SET-EMAIL", payload: e.target.value })
                }
                onBlur={() => valid_email(email, dispatch)}
                className={`${validEmail ? "inp" : "inp error"}`}
                type="text"
                placeholder="correo electrónico"
              />
              <div className={validEmail ? "error-msg-hide" : "error-msg-show"}>
              Por favor ingresa tu dirección de correo electrónico correctamente </div>
            </div>
            <div className="flex-item label">Role</div>
            <div className="flex-item input">
              <select
                defaultValue="manager"
                onChange={(e) =>
                  dispatch({ type: "SET-ROLE", payload: e.target.value })
                }
                className="select"
              >
                <option value="manager">el gerente</option>
                <option value="teacher">Secretaria/Profesora</option>
                <option value="student">Estudiante/Estudiante</option>
              </select>
            </div>
            <div className="flex-item submit">
              <div
                className={
                  validSignUp
                    ? "error-msg-hide errorSignup"
                    : "error-msg-show errorSignup"
                }
              >
              El nombre de usuario existe en el sistema.
              </div>
              <button type="submit" className="button">
              Registro
              </button>
            </div>
          </form>
        </Content>
      </Wrapper>
    </>
  );
};

export default SignUp;
