import { useEffect, useState } from "react";

import Spinner from "../Spinner/Spinner";

import useGet from "../../custom-hooks/useGet";

const ClassRecords = ({ classID }: { classID: string }) => {
  const [loading, setLoading] = useState(true);
  const { data } = useGet(
    `http://localhost:8000/study/class/${classID}/recordings/`,
    sessionStorage.getItem("token")!
  ) as unknown as {
    data: {
      start_date: string,
      name: string,
      tart_date: string,
      duration: number,
      url:string
    }[]
  };
  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  return (
    <>
      {loading ? (
        <Spinner color={{ c: "white" }} text="Cargando" />
      ) : (
        <>
          {data && data.length !== 0 ? (
            <table>
              <tbody>
                <tr>
                  <td colSpan={4} className="title">
                    Sesiones grabadas
                  </td>
                </tr>
                <tr>
                  <td>nombre</td>
                  <td>Fecha</td>
                  <td>Duración (minutos)</td>
                  <td></td>
                </tr>
                {data &&
                  data.length !== 0 &&
                  data.length &&
                  data.map((a) => {
                    return (
                      <tr className="hover" key={a.start_date}>
                        <td>{a.name}</td>
                        <td>{a.start_date}</td>
                        <td>{a.duration}</td>
                        <td>
                          <a
                            href={a.url}
                            target={"_blank"}
                            rel="noreferrer"
                            className="record-link"
                          >
                            sintonización de relojes
                          </a>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          ) : (
            <div className="no-rec">No hay ningún registro para esta clase. </div>
          )}
        </>
      )}
    </>
  );
};

export default ClassRecords;
