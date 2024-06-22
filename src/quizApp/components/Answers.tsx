import Option from "./Option";

const Answers = (props:{options:{[key:string]:string}, onClick:(i:number)=>void, isOn:boolean}) => {

  const renderOption = (i:number) => {
    if (props.options) {
      return (
        <div className="col-md-6 option-container">
          <Option
            value={props.options["option" + i]}
            onClick={() => props.onClick(i)}
            isOn={props.isOn}
          />
        </div>
      );
    } else {
      return "";
    }
  }

  return (
    <div className="answers">
      <div className="row option-row">
        {renderOption(1)}
        {renderOption(2)}
      </div>
      <div className="row option-row">
        {renderOption(3)}
        {renderOption(4)}
      </div>
    </div>
  );

}

export default Answers