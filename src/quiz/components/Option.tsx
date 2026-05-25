function Option(props: { isOn: boolean, value: string, onClick: () => void }) {
  let buttonClass;
  if (props.isOn) {
    buttonClass = "option";
  }
  else {
    buttonClass = "option option-grey";
  }
  return (
    <button className={buttonClass} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Option