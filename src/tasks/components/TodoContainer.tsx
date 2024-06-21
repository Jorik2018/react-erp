import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import { Alert } from 'react-bootstrap';
import PageContainer from './PageContainer';
import Portlet from './Portlet';
import TodoForm from './TodoForm';
import { find, createTodo, updateTodo } from '../actions/index';
import { useEffect } from 'react';
import { Task } from '../models/Task';
import { useNavigate, useParams } from 'react-router-dom';

const TodoContainer2 = ({ todo, initialize, createTodo, updateTodo, find, error }: {
  todo: Task,
  error?: string,
  find: (id: string) => void,
  createTodo: (todo: Task, navigate: (path: string) => void) => void;
  updateTodo: (id: string, data: Task) => void,
  initialize: (form: string, data: Task) => void
}) => {

  const { id } = useParams();

  const navigate = useNavigate();

  const onSubmit = (formValues: Task) => {
    if (todo._id) {
      return updateTodo(todo._id, formValues);
    }
    createTodo(formValues, navigate);
  }

  const handleInitialize = (todo: Task) => {
    initialize('todo', todo);
  }

  useEffect(() => {
    if (id) {
      find(id);
    }
  }, [id]);

  useEffect(() => {
    handleInitialize(todo);
  }, [todo]);

  const renderAlert = () => {
    if (error) {
      return (
        <div className="margin-top-25px">
          <Alert>
            <strong>Oops!</strong> {error}
          </Alert>
        </div>
      );
    }
  }

  return (
    <PageContainer>
      <Portlet title="Todo">
        <div style={{ padding: 20 }}>
          <TodoForm
            onSubmit={onSubmit}
            disableCompleted={!todo._id}
          />
        </div>
        {renderAlert()}
      </Portlet>
    </PageContainer>
  );
}

function mapStateToProps(state: { todos: { todo: Task, error: string } }) {
  return {
    todo: state.todos.todo,
    error: state.todos.error
  };
}
const cmp = connect(mapStateToProps, {
  find,
  createTodo,
  updateTodo,
  initialize
})(TodoContainer2);
export default cmp;