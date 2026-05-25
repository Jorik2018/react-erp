import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Wrapper } from "./StudentClasses.styles";
import StudentClassesHeader from "./StudentClasses.Header";

import useGet from "../../custom-hooks/useGet";
import Alert from "../Alert/Alert";
import { Class, School } from "../../models";

const StudentClasses = () => {
  const [state, setState] = useState(undefined as unknown as string|undefined);

  const schoolReqUrl = "http://localhost:8000/study/student/schools/";
  const classesReqUrl = `http://localhost:8000/study/student/classes/${
    state ? state : ""
  }/`;
  const TOKEN = sessionStorage.getItem("token") as string;

  const navigator = useNavigate();
  const params = useParams();

  const nav = (classID:string) => {
    navigator(`/${params.id}/classes/${classID}`);
  };

  const schools = useGet(schoolReqUrl, TOKEN) as unknown as {data:School[]};
  const indicator = !!schools.data.length;

  const classes = useGet(classesReqUrl, TOKEN) as unknown as {data:Class[]};

  useEffect(() => {
    if (schools && schools.data.length !== 0 && schools.data[0]) {
      setState(schools.data[0].school_id);
    } else {
      setState(undefined);
    }
  }, [indicator]);

  return (
    <>
      <StudentClassesHeader
        state={state}
        setState={setState}
        schools={schools.data}
      />
      <Wrapper>
        {classes.data.length !== 0 && classes.data.length ? (
          <table>
            <tbody>
              <tr>
                <td className="header">نام کلاس</td>
                <td className="header">ارائه دهنده</td>
              </tr>
              {classes.data.map((a) => {
                return (
                  <tr className="hover" key={a.id} onClick={() => nav(a.id)}>
                    <td>{a.name}</td>
                    <td>{a.teacher}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <Alert />
        )}
      </Wrapper>
    </>
  );
};
export default StudentClasses;
