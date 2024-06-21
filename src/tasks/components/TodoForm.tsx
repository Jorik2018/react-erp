import { connect } from 'react-redux';
import { reduxForm, Field, FormErrors } from 'redux-form';
import Input from './Input';
import Checkbox from './Checkbox';
import { Link } from 'react-router-dom';
import { Task } from '../models/Task';
import { FormEventHandler } from 'react';

const TodoForm = ({ disableCompleted, handleSubmit, onSubmit }: {
  disableCompleted: boolean,
  handleSubmit: (onSubmit: () => void) => FormEventHandler | undefined,
  onSubmit: () => void
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


const ContactForm2 = reduxForm({
  form: 'todo',
  validate
})(TodoForm)

const cmp = connect()(
  ContactForm2
);

export default cmp;