function Question(props:{questionText:string}){
  return(
    <div className="question" dangerouslySetInnerHTML={{__html: props.questionText}}></div>
  );
}

export default Question