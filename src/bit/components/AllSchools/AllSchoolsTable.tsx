import { School } from "../../models";
import { status } from "./constant";
const AllSchoolsTable = ({ information }: { information: School[] }) => {
  return (
    <>
      {information.length ? (
        <table>
          <tbody>
            <tr>
              <td className="header">fila</td>
              <td className="header">ID</td>
              <td className="header">Nombre de la escuela</td>
              <td className="header">Nombre del administrador</td>
              <td className="header">Estado</td>
            </tr>
            {information.map((a) => {
              return (
                <tr className="hover" key={a.id}>
                  <td>{a.id}</td>
                  <td>{a.school_id}</td>
                  <td>{a.name}</td>
                  <td>{a.manager}</td>
                  <td>{status(a.status, a.school_id)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div>dali</div>
      )}
    </>
  );
};

export default AllSchoolsTable;
