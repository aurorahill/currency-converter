import PropTypes from "prop-types";
const Paragraph = ({ children, className }) => {
  return <p className={className}>{children}</p>;
};

export default Paragraph;

Paragraph.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
