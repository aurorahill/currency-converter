import PropTypes from 'prop-types';

export const Button = ({ type, className, onClick, children }) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
