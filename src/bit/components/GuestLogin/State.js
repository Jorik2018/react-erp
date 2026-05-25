import withInput from "../../HOC/withInput";

const State = ({
  name,
  clazz,
  setName,
  guestJoin,
  classID,
  setLink,
  setMessage,
  setSuccess,
  setOpen,
}) => {
  return (
    <>
      <h1 className="headerBox">
      Inicie sesión como invitado en {" " + clazz.class}, escuela {clazz.school}
      </h1>
      <div className="flex-container">
        <div>
          {withInput(
            <input
              type="text"
              placeholder="Ingrese su nombre"
              className="input"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!clazz.running}
            />,
            clazz.running
          )}
        </div>
        <div>
          <button
            className="button"
            onClick={() =>
              guestJoin(classID, name, setLink, setMessage, setSuccess, setOpen)
            }
            disabled={!clazz.running}
          >
          <b>Obtener enlace de inicio de sesión</b>
          </button>
        </div>
      </div>
    </>
  );
};

export default State;
