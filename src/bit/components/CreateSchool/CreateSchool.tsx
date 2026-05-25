import { useReducer } from "react";

import { createSchoolHandler } from "./createSchool.handlers.ts";
import { Wrapper } from "./CreateSchool.styles.ts";
import { schoolReducer } from "./school.reducer.ts";

const CreateSchool = () => {
  const initialState = {
    school_id: "",
    name: "",
    address: "",
  };

  const [school, dispatch] = useReducer(schoolReducer, initialState);

  return (
    <Wrapper>
      <form
        onSubmit={(e) => {
          createSchoolHandler(e, school);
        }}
      >
        <div className="label">ID de la escuela</div>
        <div className="flex-item">
          <input
            onChange={(e) =>
              dispatch({ type: "SET-SCHOOL-ID", payload: e.target.value })
            }
            spellCheck={false}
            autoFocus={true}
            className="input left"
            type="text"
          />
          <div className="exp">
            La identificación de la escuela debe constar de letras, números y signos de puntuación en inglés.
          </div>
        </div>
        <div className="label">Nombre de la escuela</div>
        <div className="flex-item">
          <input
            onChange={(e) =>
              dispatch({ type: "SET-SCHOOL-NAME", payload: e.target.value })
            }
            spellCheck={false}
            className="input"
            type="text"
          />
        </div>
        <div className="label">آدرس</div>
        <div className="flex-item">
          <input
            onChange={(e) =>
              dispatch({
                type: "SET-SCHOOL-ADDRESS",
                payload: e.target.value,
              })
            }
            spellCheck={false}
            className="input address"
            type="text"
          />
        </div>
        <div className="flex-item">
          <button className="button" type="submit">
            ثبت درخواست
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default CreateSchool;
