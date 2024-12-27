import PropTypes from "prop-types";
import styles from "./Label.module.scss";
const Label = ({ children, className = styles["form-label"] }) => {
  return <label className={className}>{children}</label>;
};

export default Label;

Label.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
