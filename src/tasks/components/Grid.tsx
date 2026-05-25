import PropTypes from 'prop-types';
import Moment from 'moment';

import { Alert } from 'react-bootstrap';
import { types } from '../../constants';
import { Task, TodoCell } from '../models/Task';

type ObjectType = { [key: string]: string | boolean };

function renderRows({ data, objectKey, selectedRow, onRowSelect, cells }: {
  data: Task[], objectKey: string, selectedRow: Task, onRowSelect: (row: Task) => void,
  cells: TodoCell[]
}) {
  return data.map(item => {
    const object = item as unknown as ObjectType;
    return (
      <tr
        key={object[objectKey] as string}
        onClick={() => setSelectedRow(item, selectedRow, onRowSelect)}
        className={`${selectedRow === item ? 'selected-row' : ''}`}>
        {cells.map(cell => {
          return (
            <td key={cell.name}>
              {validateValue(object[cell.value], cell)}
            </td>
          );
        })}

      </tr>
    );
  });
}

function validateValue(value: string | boolean, { type }: { type: string }) {
  switch (type) {
    case types.BOOLEAN:
      return value ? 'Yes' : 'No';
    case types.TIMESTAMP:
      return value ? Moment(new Date(value as string)).format('L LTS') : '';
  }
  return value;
}

function renderHeaderCells({ cells }: { cells: TodoCell[] }) {
  return cells.map(cell => <th key={cell.name}>{cell.name}</th>);
}

function setSelectedRow(object: Task,
  selectedRow: Task, onRowSelect: (row: Task) => void) {
  if (selectedRow === object) {
    object = {} as Task;
  }
  onRowSelect(object);
}

function renderAlert({ data }: { data: Task[] }) {
  if (data.length === 0) {
    return (
      <Alert>
        <strong>Heads up!</strong> There is no record available.
      </Alert>
    );
  }
}

function Grid(props: {
  data: Task[],
  objectKey: string,
  selectedRow: Task,
  onRowSelect: (row: Task) => void,
  cells: TodoCell[]
}) {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="table-scrollable">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                {renderHeaderCells(props)}
              </tr>
            </thead>
            <tbody>
              {renderRows(props)}
            </tbody>
          </table>
        </div>
        {renderAlert(props)}
      </div>
    </div>
  );
}

Grid.propTypes = {
  data: PropTypes.array.isRequired,
  onRowSelect: PropTypes.func.isRequired,
  selectedRow: PropTypes.object.isRequired,
  objectKey: PropTypes.string.isRequired,
  cells: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  })).isRequired
};

export default Grid;