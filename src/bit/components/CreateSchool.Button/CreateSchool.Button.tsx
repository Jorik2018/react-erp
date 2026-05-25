import { Wrapper } from "./CreateSchool.Button.styles";

const CreateSchoolButton = ({ setShowCreateSchool }:{setShowCreateSchool:(showCreateSchool:boolean)=>void}) => {
  return (
    <Wrapper>
      <button className="button" onClick={() => setShowCreateSchool(true)}>
        <div>
          <span className="plus">+</span>
          <span>Crear una escuela</span>
        </div>
      </button>
    </Wrapper>
  );
};
export default CreateSchoolButton;
