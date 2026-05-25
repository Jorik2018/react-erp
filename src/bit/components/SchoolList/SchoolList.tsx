import { useState } from "react";

import { Avatar, Button, Dialog, DialogTitle } from "@mui/material";

import Alert from "../Alert/Alert";
import Classes from "./Classes";
import { findSchool } from "./classesHandler";
import { Wrapper } from "./SchoolList.styles";
import { Class, School } from "../../models";

const SchoolList = ({ content }: { content: string }) => {
  const [show, setShow] = useState(false);
  const [classes, setClasses] = useState([] as Class[]);
  const [searchValue, setSearchValue] = useState("");
  const [result, setResult] = useState([] as School[]);

  return (
    <Wrapper>
      <div className="flex-container">
        <div className="input-container">
          <input
            placeholder="جست‌وجوی مدرسه بر اساس شناسه"
            autoFocus={true}
            className="input"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="button-container">
          <Button
            sx={{ fontFamily: "vazir", fontSize: "1.2rem" }}
            variant="contained"
            color="inherit"
            onClick={() => findSchool(searchValue, setResult)}
          >
            جست‌وجو
          </Button>
        </div>
      </div>
      {result && result.length !== 0 ? (
        <table>
          <tbody>
            <tr>
              <td></td>
              <td className="header">Row</td>
              <td className="header">ID</td>
              <td className="header">School Name</td>
              <td className="header">Principal Name</td>
            </tr>
            {result.map((e: School) => {
              return (
                <tr
                  className="hover"
                  key={e.id}
                  onClick={() => {
                    setClasses(e.classes);
                    setShow(true);
                  }}
                >
                  <td>
                    <Avatar src={e.image} sx={{ margin: "auto" }} />
                  </td>
                  <td>{e.id}</td>
                  <td>{e.school_id}</td>
                  <td>{e.name}</td>
                  <td>{e.manager}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <Alert />
      )}
      <Dialog
        open={show}
        onClose={() => {
          setShow(false);
        }}
      >
        <DialogTitle sx={{ textAlign: "right", fontFamily: "vazir" }}>
          لیست کلاس‌ها
        </DialogTitle>
        <Classes classes={classes} action={setShow} content={content} />
      </Dialog>
    </Wrapper>
  );
};
export default SchoolList;
