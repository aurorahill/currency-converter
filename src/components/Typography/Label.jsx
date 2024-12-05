import PropTypes from 'prop-types';

export const Label = ({ className, children }) => {
  return <label className={className}>{children}</label>;
};

Label.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
