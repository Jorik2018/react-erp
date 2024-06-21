import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Grid from './Grid';
import Portlet from './Portlet';
import CrudButtons from './CrudButtons';
import PageContainer from './PageContainer';
import { todoCells } from '../constants/todoCells';
import { fetchTodos, deleteTodo } from '../actions/index';
import { Task } from '../models/Task';

const TodoListContainer = ({ todos, fetchTodos, deleteTodo, error }: {
  error: string,
  todos: Task[],
  fetchTodos: () => void,
  deleteTodo: (task: Task) => void
}) => {
  const [selectedRow, setSelectedRow] = useState({} as Task);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
  }, []);

  const onRowSelect = (row: Task) => {
    setSelectedRow(row);
  };

  const onNew = () => {
    navigate('/tasks/new');
  };

  const onEdit = () => {
    navigate(`/tasks/${selectedRow._id}`);
  };

  const onDelete = () => {
    deleteTodo(selectedRow);
    setSelectedRow({} as Task);
  };

  const renderAlert = () => {
    if (error) {
      return (
        <div className="margin-top-25px">
          <Alert bsPrefix="danger">
            <strong>Oops!</strong> {error}
          </Alert>
        </div>
      );
    }
  }

  return (
    <PageContainer>
      <Portlet title="Todos">
        <div className="col-md-12">
          <Grid
            data={todos}
            cells={todoCells}
            onRowSelect={onRowSelect}
            selectedRow={selectedRow}
            objectKey="_id"
          />
          <CrudButtons
            onNew={onNew}
            onEdit={onEdit}
            onDelete={onDelete}
            editDisabled={!selectedRow._id}
            deleteDisabled={!selectedRow._id}
          />
          {renderAlert()}
        </div>
      </Portlet>
    </PageContainer>
  );

}

function mapStateToProps(state: { todos: { all: Task[], error: string } }) {
  return {
    todos: state.todos.all,
    error: state.todos.error
  };
}

const TodoList = connect(mapStateToProps, { fetchTodos, deleteTodo })(TodoListContainer);

export default TodoList;
