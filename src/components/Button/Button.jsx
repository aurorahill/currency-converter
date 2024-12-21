import PropTypes from "prop-types";

const Button = ({ children, className }) => {
  return <button className={className}>{children}</button>;
};

export default Button;

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
