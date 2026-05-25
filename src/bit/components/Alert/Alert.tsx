import { Alert as AAlert } from "@mui/material";

const Alert = () => {
  return (
    <AAlert
      severity="info"
      sx={{
        direction: "rtl",
        fontFamily: "vazir",
        fontSize: "1.2rem",
        marginTop: 10,
      }}
    >
      No hay información para mostrar
    </AAlert>
  );
};

export default Alert;
