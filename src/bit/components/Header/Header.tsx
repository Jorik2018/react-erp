

const Header = ({ login, setLogin }: { login: boolean, setLogin: (login: boolean) => void }) => {
  return (
    <>
      <div>
        <button
          onClick={() => setLogin(true)}
          className={`btn ${login ? "active" : "not-active"}`}
        >
          acceso
        </button>
      </div>
      <div>
        <button
          onClick={() => setLogin(false)}
          className={`btn ${login ? "not-active" : "active"}`}
        >
          Registro
        </button>
      </div>
    </>
  );
};

export default Header;
