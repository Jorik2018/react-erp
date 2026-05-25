const ClassInfo = ({ className, teacher, id }:{ className:string, teacher:string, id:string }) => {
  return (
    <>
      <div className="flex-header">
      <div className="flex-item">Clase: {className}</div>
        <div className="flex-item">Proveedor: {teacher}</div>
        <div className="flex-item">ID de clase: {id}</div>
      </div>
    </>
  );
};

export default ClassInfo;
