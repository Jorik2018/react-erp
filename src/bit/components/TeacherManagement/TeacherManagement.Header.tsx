import { useNavigate } from "react-router-dom";

import { Wrapper } from "./TeacherManagement.Header.styles";

const TeacherManagementHeader = ({ state, setState }: { state: string, setState: (state: string) => void }) => {
  const navigator = useNavigate();
  const nav = (url: string) => navigator(url);
  return (
    <>
      <Wrapper>
        <button
          onClick={() => {
            setState("info");
            nav("./teacherManagement/info");
          }}
          className={`button ${state === "info" ? "active" : "inactive"}`}
        >
          کلاس‌های من
        </button>
        <button
          onClick={() => {
            setState("schoolClasses");
            nav("./teacherManagement/schoolClasses");
          }}
          className={`button margin ${state === "schoolClasses" ? "active" : "inactive"
            }`}
        >
          مدارس
        </button>
      </Wrapper>
    </>
  );
};
export default TeacherManagementHeader;
