import { useState } from "react";

import Alert from "../Alert/Alert";
import { joinAsAdmin, forceEnd } from "./ActiveMeetings.handlers";

import { Snackbar, Alert as A } from "@mui/material";
import { Wrapper } from "./ActiveMeetings.styles";
import useGet from "../../custom-hooks/useGet";
import { Meeting } from "../../models";

const ActiveMeetings = () => {
  const [url, setUrl] = useState("");
  const [ended, setEnded] = useState(false);
  const { data } = useGet(
    "http://localhost:8000/study/admin/meetings/",
    sessionStorage.getItem("token")!
  ) as unknown as { data?: Meeting[] };
  return (
    <Wrapper>
      {data?.length !== 0 ? (
        <table>
          <tbody>
            <tr>
              <td className="header">fila</td>
              <td className="header">ID de sesión</td>
              <td className="header">Nombre de sesión</td>
              <td className="header">Número de participantes</td>
              <td className="header"></td>
            </tr>
            {data!.map((a, b) => {
              return (
                <tr className="hover" key={b}>
                  <td>{b}</td>
                  <td>{a.meetingID}</td>
                  <td>{a.meetingName}</td>
                  <td>{a.participantCount}</td>
                  <td>
                    {!url ? (
                      <button
                        className="button enter"
                        onClick={() => {
                          joinAsAdmin(a.meetingID, setUrl);
                        }}
                      >
                        Obtener el enlace
                      </button>
                    ) : (
                      <button className="button enter">
                        <a
                          className="a"
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Obtener el enlace
                        </a>
                      </button>
                    )}
                    <button
                      className="button end"
                      onClick={() => forceEnd(a.meetingID, setEnded)}
                    >
                      خاتمه
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <Alert />
      )}
      <Snackbar
        sx={{ marginBottom: 10, marginLeft: 10 }}
        open={ended}
        onClose={() => setEnded(false)}
        autoHideDuration={3000}
      >
        <A severity="success">
          <div className="ended">La sesión fue completada por usted</div>
        </A>
      </Snackbar>
    </Wrapper>
  );
};

export default ActiveMeetings;
