import PropTypes from 'prop-types';

function CrudButtons({ newDisabled, editDisabled, deleteDisabled, onNew, onEdit, onDelete }: {
  newDisabled?: boolean,
  editDisabled?: boolean,
  deleteDisabled?: boolean,
  onNew?: () => void,
  onEdit?: () => void,
  onDelete: () => void
}) {
  return (
    <div>
      {!onNew ? '' :
        <button className="btn btn-primary"
          onClick={onNew}
          disabled={newDisabled}>
          New
        </button>
      }
      {!onEdit ? '' :
        <button className="btn btn-success"
          onClick={onEdit}
          disabled={editDisabled}>
          Edit
        </button>
      }
      {!onDelete ? '' :
        <button className="btn btn-danger"
          onClick={onDelete}
          disabled={deleteDisabled}>
          Delete
        </button>
      }
    </div>
  );
}

CrudButtons.propTypes = {
  onNew: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  newDisabled: PropTypes.bool,
  editDisabled: PropTypes.bool,
  deleteDisabled: PropTypes.bool
}

export default CrudButtons;