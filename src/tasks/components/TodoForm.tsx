import { connect } from 'react-redux';
import { reduxForm, Field, FormErrors, FormSubmitHandler } from 'redux-form';
import Input from './Input';
import Checkbox from './Checkbox';
import { Link } from 'react-router-dom';
import { Task } from '../models/Task';
import { FormEventHandler } from 'react';

type FormProps={
  disableCompleted: boolean,
  onSubmit: FormSubmitHandler
};

const TodoForm = ({ disableCompleted, handleSubmit, onSubmit }: FormProps & {
  handleSubmit: (onSubmit: FormSubmitHandler) => FormEventHandler | undefined;
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6">
          <Field
            name="description"
            type="text"
            label="Descriptión"
            required={true}
            component={Input}
          />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-6">
          <div className="margin-top-30px">
            <Field
              name="completed"
              label="Completed"
              disabled={disableCompleted}
              component={Checkbox}
            />
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-12" style={{ marginTop: 20 }}>
          <button type="submit" className="btn btn-primary">Save</button>
          <Link to="/" className="btn btn-primary">Cancel</Link>
        </div>
      </div>
    </form >
  );
}

function validate(values: Task): FormErrors {
  const errors: { text?: string } = {};
  if (!values.description) {
    errors.text = 'Enter a text description';
  }
  return errors;
}

const cmp = connect()(
  reduxForm<Task, FormProps>({
    form: 'todo',
    validate
  })(TodoForm)
);

export default cmp;