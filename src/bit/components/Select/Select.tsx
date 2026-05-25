import { InputLabel, MenuItem, Select as S } from "@mui/material";

const Select = ({ title, size, selectWidth, value, setValue, data }:
  {
    title: string, selectWidth: number,
    size: 'small' | 'medium', value: "small" | "medium", setValue: (value: string) => void, data: {
      id: string | number, ec: string, pc: string
    }[]
  }) => {
  return (
    <>
      <InputLabel
        sx={{
          fontFamily: "vazir",
          fontSize: "0.8rem",
        }}
        id="select"
      >
        {title} {selectWidth}
      </InputLabel>
      <S
        sx={{
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          fontFamily: "vazir",
          width: "300px",
        }}
        size={size}
        label={title}
        labelId="select"
        id="select"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {data.map((a) => {
          return (
            <MenuItem
              key={a.id}
              value={a.ec}
              sx={{
                fontFamily: "vazir",
                textAlign: "right",
                direction: "rtl",
              }}
            >
              {a.pc}
            </MenuItem>
          );
        })}
      </S>
    </>
  );
};

export default Select;
