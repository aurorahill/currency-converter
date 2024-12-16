import PropTypes from 'prop-types';

export const Paragraph = ({ className, children }) => {
  return <p className={className}>{children}</p>;
};

Paragraph.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
