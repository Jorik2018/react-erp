const ClassInfo = ({ className, id }) => {
  return (
    <>
      <div className="flex-header">
      <div className="flex-item">Clase: {className}</div>
        <div className="flex-item">ID de clase: {id}</div>
      </div>
    </>
  );
};

export default ClassInfo;
