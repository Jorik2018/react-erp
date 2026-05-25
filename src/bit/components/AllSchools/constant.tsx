import { schoolAction } from "./AllSchoolsHandlers";

export const STATUS = [
  { id: 4, pc: "pendiente de aprobación", ec: "pending" },
  { id: 3, pc: "suspendido", ec: "suspended" },
  { id: 2, pc: "پذیرفته شده", ec: "accepted" },
  { id: 1, pc: "rechazado", ec: "rejected" },
];

export const FILTER = [
  { id: 1, pc: "nombre del administrador", ec: "manager" },
  { id: 2, pc: "nombre de la escuela", ec: "name" },
  { id: 3, pc: "school_id", ec: "school_id" },
];

const STATUS_REJECTED = "rejected";
const STATUS_ACCEPTED = "accepted";
const STATUS_SUSPENDED = "suspended";

export const status = (state: string, id: string) => {
  const acc = (<>
    <button
      className="button sus"
      onClick={() => {
        schoolAction(STATUS_SUSPENDED, id);
      }}
    >
      Suspensión
    </button>
    <button
      className="button rem"
      onClick={() => {
        schoolAction(STATUS_REJECTED, id);
      }}
    >
      Borrar
    </button></>
  );
  const rej = <>rechazado</>;
  const sus = (
    <>
      <button
        className="button acc"
        onClick={() => {
          schoolAction(STATUS_ACCEPTED, id);
        }}
      >
        Confirmar nuevamente
      </button>
      <button
        className="button rem"
        onClick={() => {
          schoolAction(STATUS_REJECTED, id);
        }}
      >
        حذف
      </button>
    </>
  );
  const pen = (
    <>
      <button
        className="button acc"
        onClick={() => {
          schoolAction(STATUS_ACCEPTED, id);
        }}
      >
        Aceptar
      </button>
      <button
        className="button rem"
        onClick={() => {
          schoolAction(STATUS_REJECTED, id);
        }}
      >
        Borrar
      </button>
    </>
  );
  if (state === "accepted") {
    return acc;
  } else if (state === "suspended") {
    return sus;
  } else if (state === "rejected") {
    return rej;
  } else if (state === "pending") {
    return pen;
  }
};
