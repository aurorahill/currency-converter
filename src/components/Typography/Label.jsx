import PropTypes from "prop-types";
const Label = ({ children, className = "form__form-label" }) => {
  return <label className={className}>{children}</label>;
};

export default Label;

Label.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
