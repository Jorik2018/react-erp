import PropTypes from 'prop-types';
import { FC, ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
}

const PageContainer: FC<PageContainerProps> = ({ children }) => {
  return (
    <div className="page-container fade-in-up">
      <div className="page-content-wrapper">
        {children}
      </div>
    </div>
  );
}

PageContainer.propTypes = {
  children: PropTypes.node.isRequired
}

export default PageContainer;