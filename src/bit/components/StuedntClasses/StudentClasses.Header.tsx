import { School } from "../../models";
import { Wrapper } from "./StudentClasses.Header.styles";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const StudentClassesHeader = ({ state, setState, schools }:
  { state?: string, setState: (state: string) => void, schools: School[] }) => {
  return (
    <Wrapper>
      <div className="list-title">
        <div>Class List</div>
        <div>
          <FormControl>
            <InputLabel
              sx={{
                fontFamily: "vazir",
                fontSize: "1.1rem",
              }}
              id="select"
            >
              Select a school
            </InputLabel>
            <div className="select-container">
              <Select
                className="x"
                value={state}
                sx={{ width: 400 }}
                labelId="select"
                id="select"
                label="Select a school"
                onChange={(e: { target: { value: string } }) => {
                  setState(e.target.value);
                }}
              >
                {schools.length !== 0 &&
                  schools.length &&
                  schools.map((e: School) => (
                    <MenuItem
                      value={e.school_id}
                      key={e.school_id}
                      sx={{
                        textAlign: "right",
                        direction: "rtl",
                        fontFamily: "vazir",
                      }}
                    >
                      <div className="select-item">{e.name}</div>
                    </MenuItem>
                  ))}
              </Select>
            </div>
          </FormControl>
        </div>
      </div>
    </Wrapper>
  );
};
export default StudentClassesHeader;
