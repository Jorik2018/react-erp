import { Wrapper } from "./Field.styles";

const Field = ({ edit, content, editable, onChange }: {
  edit: boolean, content: string, editable: boolean, onChange:{type:string,change:(args:{
    type: string, payload: string
  })=>void}
}) => {
  return (
    <Wrapper className="wrapper">
      {edit && editable ? (
        <input
          onChange={(e) =>
            onChange.change({ type: onChange.type, payload: e.target.value })
          }
          spellCheck={false}
          placeholder={content}
          className="input"
          type="text"
        />
      ) : (
        <div className="content">{content}</div>
      )}
    </Wrapper>
  );
};

export default Field;
