import PropTypes from 'prop-types';
import { ReactNode } from 'react';

function Portlet({ title, children }: { title: string, children: ReactNode }) {
  return (
    <div className="portlet light">
      <div className="portlet-title">
        <div className="caption font-red-sunglo">
          <span className="caption-subject bold uppercase">{title}</span>
        </div>
      </div>
      <div className="portlet-body">
        {children}
      </div>
    </div>
  );
}

Portlet.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Portlet;