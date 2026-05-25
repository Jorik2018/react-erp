import Icon from '../icon/icon';
import EditIcon from '../../../../../../static/svg/edit.svg';
import NewIcon from '../../../../../../static/svg/new.svg';
import { Link, To } from 'react-router-dom';

const linksStyle = {
  display: 'block',
  margin: '10px 0'
};

const iconStyle = {
  marginRight: '5px'
};

export default function Edit({ editLink, newLink }: { editLink: To, newLink: To }) {
  return (
    <div style={linksStyle}>
      <Icon glyph={EditIcon} style={iconStyle} />
      <Link to={editLink}>Edit</Link>
      <Icon glyph={NewIcon} style={iconStyle} />
      <Link to={newLink}>New</Link>
    </div>
  );
}
